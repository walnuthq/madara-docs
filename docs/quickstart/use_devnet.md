---
sidebar_position: 2
---

# Use a running devnet

## Overview

This quick-start guide helps you interact with a devnet. Please make sure you are [running a Madara devnet](run_devnet) in a separate terminal before continuing.

## Installation

These installation instructions assume you are using Linux or macOS. For Windows, please utilize [WSL2](https://learn.microsoft.com/en-us/windows/wsl/).

### Install tooling for interaction

Start by installing the specific tooling used in this tutorial:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.starkup.dev | sh -s -- --yes
```

The above will install the required tooling with [Starkup](https://github.com/software-mansion/starkup), a toolchain to help with Starknet development. The installed tools are:
- [asdf](https://asdf-vm.com/), a runtime version manager. Used by many Starknet tools.
- [Scarb](https://docs.swmansion.com/scarb/), a build toolchain and package manager.
- [Starknet Foundry](https://foundry-rs.github.io/starknet-foundry/index.html), a Starknet smart contract development tool.

Now restart your terminal to take the tooling into use. Next, you have to set the correct versions that are compatible with Madara:
```bash
asdf install scarb 2.9.2
asdf set scarb 2.9.2
```

## Prepare your contract

### Initialize a Scarb project

You should initialize a new Scarb project with default settings in a new folder:
```bash
mkdir madara_quickstart
cd madara_quickstart
scarb init --no-vcs --test-runner cairo-test
```

This will give you the following tree structure in folder `madara_quickstart`:
```
.
├── Scarb.toml
└── src
    └── lib.cairo
```

### Save an example contract locally

We will use a very simple balance contract as an example. Initializing a Scarb project, as we did above, generated a dummy contract `lib.cairo` in a new folder called `src`. Now replace the contents of `src/lib.cairo` with:

```rust
#[starknet::interface]
trait IBalance<T> {
    // Returns the current balance.
    fn get(self: @T) -> felt252;
    // Increases the balance by the given amount.
    fn increase(ref self: T, a: felt252);
}

#[starknet::contract]
mod Balance {
    use starknet::storage::{ StoragePointerReadAccess, StoragePointerWriteAccess };

    #[storage]
    struct Storage {
        value: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.value.write(5);
    }

    #[abi(embed_v0)]
    impl Balance of super::IBalance<ContractState> {
        fn get(self: @ContractState) -> felt252 {
            self.value.read()
        }
        fn increase(ref self: ContractState, a: felt252)  {
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
edition = "2024_07"

[dependencies]
starknet = ">=2.9.2"

[[target.starknet-contract]]
```

### Compile the example contract

Compile the contract with:

```bash
scarb build
```

## Configure your account and signer

Before you can interact with the network you need an account. Luckily, running the devnet gives you a few ready accounts and their respective private keys. This is only possible because the network is a fresh network and you have full control over it - in real networks you need to get an account by different means.

However, to use these accounts with Starknet tooling, they must be stored in the correct format.

First, make sure you are still in the `madara_quickstart` folder. Since the local devnet should be running at address `http://localhost:9944`, you can now store an account with:

:::info
If needed, remember to replace the following values in the command below:
- `address`: the public address of the chosen account given upon launching the devnet
- `private-key`: the private key associated with the chosen account
:::

```bash
sncast account import --type oz --url http://localhost:9944 --silent --address 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2
```
![Account creation](/img/quickstart-devnet-import.png "Account creation")
Note the imported account name.

:::warning
Do not use the provided accounts in a production environment. They are only for local testing.
:::

## Contract interaction

We are now ready to start deploying our contract and interacting with it.

### Declare your contract

Before deployment, the contract needs to be declared to the network. Declare it with:

:::info
If needed, remember to replace the following values in the command below:
- `account`: the name of your imported account
:::

```bash
sncast --account account-1 declare --url http://localhost:9944 --contract-name Balance
```

![Class hash](/img/quickstart-devnet-classhash.png "Resulting class hash")

Note the declared class hash. It may take up to a minute for the declaration to be available in the blockchain.

### Deploy it

You are now ready to deploy the contract. Deploy with:
:::info
If needed, remember to replace the following values in the command below:
- `account`: the name of your imported account
- `class-hash`: the declared class hash
:::
```bash
sncast --account account-1 deploy --url http://localhost:9944 --salt 1 --class-hash 0x041de961fe39bbe6810532bb827b8aae10130262254f8c6ad70e38a565336d90
```

![Contract address](/img/quickstart-devnet-contract.png "Resulting class contract address")

Note the deployed contract's address.

### Issue transactions

The contract keeps track of an imaginary balance. Let's first query the initial balance:

:::info
If needed, remember to replace the following values in the command below:
- `contract-address`: the deployed contract address
:::

```bash
sncast call --url http://localhost:9944 --function get --contract-address 0x021e4332c06c31c764f023f404d6fc2af6f683dbb3e0f258600d7137401fee3a
```

You should see value `5` as the initial value (in hexadecimal format).

Let's try to increase this value by a transaction. Run:

:::info
If needed, remember to replace the following values in the command below:
- `account`: the name of your imported account
- `contract-address`: the deployed contract address
:::

```bash
sncast --account account-1 invoke --url http://localhost:9944 --contract-address 0x021e4332c06c31c764f023f404d6fc2af6f683dbb3e0f258600d7137401fee3a --function increase --arguments "3"
```

If you now query the balance again, you should see value `8`. Congratulations, you have successfully modified the contract's state!

## Rerunning this quickstart

If you want to try running this quickstart again you have to change the use `salt` value in contract deployment to anything else - otherwise it will try to deploy to the same address and fail. Furthermore, you can reuse the existing account.