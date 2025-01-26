---
sidebar_position: 1
---

# Quickstart: start your own chain

## Overview

This quick-start guide helps you start your own, local chain with Madara. Furthermore, it instructs you to deploy a contract and run transactions on the chain to verify its functionality.

The used chain is only available locally and is meant for testing purposes.

## Installation

These installation instructions assume you are using a Linux or macOS. For Windows, please utilize [WSL2](https://learn.microsoft.com/en-us/windows/wsl/).

There are two ways to install Madara:
1. Build from source
1. With Docker

Please choose the one that fits you best.

### Option 1: Build from source

First, make sure you have all the required dependencies installed:

| Dependency | Minimum version    | Installation                                                      |
| ---------- | ---------- | ----------------------------------------------------------------- |
| Rust       | rustc 1.81 | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| Clang      | Latest     | `sudo apt-get install clang`                                      |
| Openssl    | 0.10       | `sudo apt install openssl`                                        |

Next, clone the repository:
```bash
git clone https://github.com/madara-alliance/madara
cd madara
```

Then you are ready to build the project. This will take some minutes:
```bash
cargo build
```

### Option 2: Install with Docker

Download the required Docker images.

```bash
docker pull ghcr.io/madara-alliance/madara:latest
docker tag ghcr.io/madara-alliance/madara:latest madara:latest
docker rmi ghcr.io/madara-alliance/madara:latest
```

## Start the chain

### If built from source

Run a local devnet with:
```bash
cargo run -- --name Madara --devnet --base-path ../madara_db --chain-config-override=chain_id=abcabc
```

Notes about the parameters:
1. All data is stored in a new database folder denoted by `base-path` parameter. Use a suitable location.
1. It is important to NOT use a chain ID that's being utilized by some [existing Starknet network](https://github.com/starknet-io/starknet.js/blob/8fb2193462b5bb743f551cdec631d5923f09e657/src/constants.ts#L44). Otherwise you are free to use any hexadecimal ID you want.

Leave the devnet running in one terminal window and open another one for interaction.

### If using Docker

Run Madara with:
```bash
docker run -p 9944:9944  --name Madara madara:latest --devnet --rpc-external
```

To make sure that Madara is running correctly, you can check its logs, in another terminal, with:
```bash
docker logs -f -n 100 Madara
```

#### Restart

If you need to restart Madara, you should first remove its Docker container with:
```bash
docker rm -f Madara
```

## Install tooling for Starknet interaction

To deploy and interact with Starknet smart contracts we're going to use [Starkli](https://book.starkli.rs/).

### Install Starkli

Install the Starkli manager with:
```bash
curl https://get.starkli.sh | sh
```

Restart your terminal. After that, you can install Starkli with:
```bash
starkliup
```

### Configure your account and signer

Before you can interact with the network you need an account. Luckily, running the devnet gives you a few ready accounts and their respective private keys. This is only possible because the network is a fresh network and you have full control over it - in real networks you need to get an account by different means.

However, you still need to store the account in a format understood by Starkli. 

Choose an account from the list displayed upon running the devnet. Store it with (replace the address with one you chose from the list):
```bash
starkli account fetch --rpc http://localhost:9944 --output ./account 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493
```

### Install and configure Scarb

We will utilize [Scarb](https://docs.swmansion.com/scarb/docs) to compile our contract code. You can install Scarb with:
```
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```

Next you should instantiate a new Scarb project. You can do this with:
```
scarb init --no-vcs --test-runner cairo-test
```
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
    fn constructor(ref self: ContractState, value_: u128) {
        self.value.write(value_);
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
TODO: document to fix the version to one we have installed

### Compile the example contract

Compile the contract with:

```bash
scarb build
```

## Deploy the contract

### Declare your contract

Before deployment, the contract needs to be declared to the network. Declare it with (remember to use the private key you chose from the devnet list):
```bash
starkli declare --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2 --compiler-version 2.9.1  --account account ./target/dev/madara_example_SimpleStorage.contract_class.json
```

Note the resulting class hash.

### Deploy it

You are now ready to deploy the contract. Remember to replace the class hash and private key - you can then deploy with:
```bash
starkli deploy 0x002ce0e27907ab2c71ca9baf8e414589ae631c3b0e48abcfce4b193ae2cffebd --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2 --account account
```

Note the resulting contract address.

## Issue transactions

TODO

## Next steps

TODO