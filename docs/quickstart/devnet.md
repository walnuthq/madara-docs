---
sidebar_position: 1
# description: 'Madara is an open source stack that allows you to build app chains powered by Cairo and Starknet technology'
---

# Quickstart: Run transactions on a devnet

## Overview

This quick-start guide helps you start your own, local chain with Madara. Furthermore, it instructs you to deploy a contract and run transactions on the chain to verify its functionality.

The used chain is only available locally and is meant for testing purposes.

## Installation

These installation instructions assume you are using Linux or macOS. For Windows, please utilize [WSL2](https://learn.microsoft.com/en-us/windows/wsl/).

### Prerequisites

You will need to have the following system components installed:
- Rust. Please see [here](https://www.rust-lang.org/tools/install) for instructions.
- Docker. Please see [here](https://docs.docker.com/engine/install/) for instructions. Remember to install also `docker-compose`.

### Install Madara CLI

You should start by installing the main tool for running Madara, the Madara CLI:
```bash
git clone https://github.com/madara-alliance/madara-cli.git
cd madara-cli
git submodule update --init --recursive --jobs=4 --remote
```
The above will clone the repository into a new folder, enter the folder and initialize the repository's Git submodules.

### Install specific tooling

Then continue with the specific tooling used in this tutorial (and in others):
```bash
curl https://get.starkli.sh | sh
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```
The above will install [Starkli](https://book.starkli.rs) CLI and [Scarb](https://docs.swmansion.com/scarb/) CLI.

Now restart your terminal and finish the installation with:
```bash
starkliup
```

## Run a devnet chain with Madara CLI

You are now ready to run your own local Madara chain. If you're not in the Madara CLI's folder, go there and run:

```bash
cargo run create
```
The above will prompt you for various options. You should choose the following:
1. Select Madara mode: `Devnet`
1. Input DB path: keep the default

It may take half an hour to prepare the image for the first time. Once the devnet is ready, leave it running and open a new terminal for the rest of this guide.

## Configure

### Values to be replaced

The rest of these instructions may require you to replace some of the values in the commands in the following way:
- Value `0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2` is used as a private key. You may choose whicheven private key from the list of keys given upon launching the devnet
- Value `0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493` is used as your public account contract address. Make sure this corresponds to the chosen private key.
- Value `0x043539387d5f6359716da16fbff9c1536b54c1f5928fbc4a1ea7ea71414d02ab` is used as the contract's class hash value. Use the one given upon declaring the contract.
- Value `0x07197883a42e89ae1a057e2bc3953508558d1864b7700556f897d3520e81db24` is used as the contract's address. Use the one given upon deploying the contract.

### Initiate a Scarb project

You should instantiate a new Scarb project in a new folder:
```bash
mkdir madara-quickstart
cd madara-quickstart
scarb init --no-vcs --test-runner cairo-test
```

### Configure your account and signer

Before you can interact with the network you need an account. Luckily, running the devnet gives you a few ready accounts and their respective private keys. This is only possible because the network is a fresh network and you have full control over it - in real networks you need to get an account by different means.

However, you still need to store the account in a format understood by Starkli. 

Choose an account from the list displayed upon running the devnet. Store it with:
```bash
starkli account fetch --rpc http://localhost:9944 --output ./account 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493
```

## Deploy a contract

### Save an example contract locally

We will use a very simple balance contract as an example. Replace the contents of `src/lib.cairo` with:

```rust
#[starknet::interface]
trait IBalance<T> {
    // Returns the current balance.
    fn get(self: @T) -> u128;
    // Increases the balance by the given amount.
    fn increase(ref self: T, a: u128);
}

#[starknet::contract]
mod Balance {
    use traits::Into;

    #[storage]
    struct Storage {
        value: u128, 
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.value.write(5);
    }

    #[abi(embed_v0)]
    impl Balance of super::IBalance<ContractState> {
        fn get(self: @ContractState) -> u128 {
            self.value.read()
        }
        fn increase(ref self: ContractState, a: u128)  {
            self.value.write( self.value.read() + a );
        }
    }
}
```

Next, replace the contents of `Scarb.toml` with:
```rust
[package]
name = "madara_example"
version = "0.1.0"

[dependencies]
starknet = "=2.9.2"

[[target.starknet-contract]]
```

### Compile the example contract

Compile the contract with:

```bash
scarb build
```

## Contract interaction

We are now ready to start deploying our contract and interacting with it.

### Deploy the contract

#### Declare your contract

Before deployment, the contract needs to be declared to the network. Declare it with:
```bash
starkli declare --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2 --compiler-version 2.9.1  --account account ./target/dev/madara_example_Balance.contract_class.json
```

Note the resulting class hash.

#### Deploy it

You are now ready to deploy the contract. Deploy with:
```bash
starkli deploy 0x043539387d5f6359716da16fbff9c1536b54c1f5928fbc4a1ea7ea71414d02ab --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2 --account account
```

Note the resulting contract address.

### Issue transactions

The contract keeps track of an imaginary balance. Let's first query the initial balance:
```bash
starkli call --rpc http://localhost:9944 0x07197883a42e89ae1a057e2bc3953508558d1864b7700556f897d3520e81db24 get
```

You should see value `5` as the initial value (prefixed by a lot of zeros).

Let's try to increase this value by a transaction. Run:
```bash
starkli invoke --account account --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2  0x07197883a42e89ae1a057e2bc3953508558d1864b7700556f897d3520e81db24 increase 3
```

If you now query the balance again, you should see value `8`. Congratulations, you have successfully modified the contract's state!