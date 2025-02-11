---
sidebar_position: 2
---

# Use a running local chain

## Overview

This quick-start guide helps you interact with a local chain. Please make sure you are [running a local Madara chain](run_localchain) before continuing.

## Installation

These installation instructions assume you are using Linux or macOS. For Windows, please utilize [WSL2](https://learn.microsoft.com/en-us/windows/wsl/).

### Install tooling for interaction

Start by installing the specific tooling used in this tutorial:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
curl https://get.starkli.sh | sh
```
The above will install:
- [Scarb](https://docs.swmansion.com/scarb/), a build toolchain and package manager
- [Starkli](https://book.starkli.rs), a CLI interaction tool with Starknet contracts

Now restart your terminal to reload new environment variables and finish the installation with:

```bash
starkliup
```

## Configure

### Values to be replaced

The rest of these instructions may require you to replace some of the values in the commands in the following way:
- Value `0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2` is used as a private key. You may choose whicheven private key from the list of keys given upon launching the chain
- Value `0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493` is used as your public account contract address. Make sure this corresponds to the chosen private key.
- Value `0x043539387d5f6359716da16fbff9c1536b54c1f5928fbc4a1ea7ea71414d02ab` is used as the contract's class hash value. Use the one given upon declaring the contract.
- Value `0x002ece8d68885ec17d221e089670631b892c7f9e426ea6f707b9d6a20f99e450` is used as the contract's address. Use the one given upon deploying the contract.

### Initializing a Scarb project

You should instantiate a new Scarb project with default settings in a new folder:
```bash
mkdir madara_quickstart
cd madara_quickstart
scarb init --no-vcs --test-runner cairo-test
```

### Configure your account and signer

Before you can interact with the network you need an account. Luckily, running the chain gives you a few ready accounts and their respective private keys. This is only possible because the network is a fresh network and you have full control over it - in real networks you need to get an account by different means.

However, you still need to store the account in a format understood by Starkli. First, make sure you are still in the `madara_quickstart` folder.

The local blockchain is running at address `http://localhost:9944`. Choose an account from the list displayed upon running the chain. Store it with:
```bash
starkli account fetch --rpc http://localhost:9944 --output ./account 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493
```

:::warning

Do not use the provided accounts in a production environment. They are only for local testing.

:::

## Declare and deploy a contract

### Save an example contract locally

We will use a very simple balance contract as an example. Initializing a Scarb project, as we did above, generated a dummy contract `lib.cairo` in a new folder called `src`. Now replace the contents of `src/lib.cairo` with:

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

Next, replace the contents of `Scarb.toml` in the root of the project with:
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

![Class hash](/img/quickstart-local-classhash.png "Resulting class hash")

Note the declared class hash.

#### Deploy it

You are now ready to deploy the contract. Deploy with:
```bash
starkli deploy 0x043539387d5f6359716da16fbff9c1536b54c1f5928fbc4a1ea7ea71414d02ab --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2 --account account
```

![Contract address](/img/quickstart-local-contract.png "Resulting class contract address")

Note the deployed contract's address.

### Issue transactions

The contract keeps track of an imaginary balance. Let's first query the initial balance:
```bash
starkli call --rpc http://localhost:9944 0x043da9dc733a83ff57963a957d6adaa88b9ce986250185202310bee134fc4b6c get
```

You should see value `5` as the initial value (prefixed by a lot of zeros).

Let's try to increase this value by a transaction. Run:
```bash
starkli invoke --account account --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2  0x043da9dc733a83ff57963a957d6adaa88b9ce986250185202310bee134fc4b6c increase 3
```

If you now query the balance again, you should see value `8`. Congratulations, you have successfully modified the contract's state!