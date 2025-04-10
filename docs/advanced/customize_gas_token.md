---
sidebar_position: 30
---

# Customize Appchain gas token

## Overview

This guide helps you change your Appchain's gas token.

An Appchain's gas token is used to pay for transaction fees. Madara Appchains support both the traditional Eth gas token as well as the newer STRK gas token. This guide focuses on switching the used STRK token.

Changing the used gas token helps you customize the Appchain to suit your needs. It's one of the available [configuration options](appchain) when starting an Appchain.

### Circular dependency challenges

To change the gas token, you first need a token to change to. But deploying that token requires a running Appchain. This creates a challenge: if the Appchain is already running, how can its gas token be changed?

The workaround is to temporarily start the Appchain to calculate the deployment address of the new token, then stop it, wipe its state, and configure the Appchain to use that address. Since Starknet deployments are deterministic, the token can be re-deployed to the same address after the reset.

Continuing an Appchain after a reset from a previous state is not yet supported.

### Two approaches

The gas token can be changed in two ways.

#### Option 1: Change directly in the Appchain

Changing the gas token directly in the Appchain consists of the following steps:

1. Deploy a new, custom ERC20 token in the Appchain. Note its address.
1. Stop the Appchain and remove its data. Change the Appchain config to use the token address as gas token (even if the address doesn't have anything yet).
1. Deploy the token the same way again. This should result in the same address, making the gas token usable.

With this option, the settlement layer's gas token functionality remains unchanged.

Use this option if you want your Appchain to have custom functionality related to the gas token. Some possible use cases include:
1. Implementing custom minting logic.
1. Introducing deflationary mechanics or other supply adjustments.
1. Integrating with external contracts—for example, supporting new interfaces.
1. Adding compliance-related features.
1. Or simply changing the token’s name or symbol for branding purposes.

#### Option 2: Change through the settlement layer

Changing the gas token through the [settlement layer](/concepts/settlement) consists of the following steps:

1. Deploy a new, custom ERC20 token in the Appchain's settlement layer.
1. Add the token to the used bridge (StarkGate). This gives you a new token address in the Appchain side.
1. Stop the Appchain and remove its data. Change the Appchain config to use the token address as gas token (even if the address doesn't have anything yet).
1. Deploy the token the same way in the settlement layer again and add to the bridge. This should result in the same address in the Appchain, making the gas token usable.

With this option, the Appchain's gas token functionality remains unchanged.

Use this option if you want to have custom settlement layer functionality for the gas token. However, this is not a typical approach.

## Prerequisites

Before starting, please make sure you have all of the [required tools](/tools) installed.

Remember to also check the [hardware requirements](/hardware) to make sure you can run an Appchain properly.

## Change the token in the Appchain

This section helps you change the token through the Appchain directly. The settlement layer's respective token does not change.

### Step 1: Run the Appchain

You should start by installing the Madara CLI and running your Appchain with the CLI:

```bash
git clone https://github.com/madara-alliance/madara-cli.git
cd madara-cli
cargo run create app-chain
```

### Step 2: Wait for the Appchain to be configured

It will require about 55 blocks (about 10 minutes) for the Appchain to be configured properly - you should wait for that before interacting with it.

> ![Appchain is ready](/img/pages/quickstart-appchain-ready.png "Appchain is ready")

Once the Appchain is ready, open a new terminal for interaction.

### Step 3: Prepare an account

An account needs to be prepared before it can be deployed.

The required parameters for the command are:
* Account type
  * Used value: `oz`
  * Use a generic OpenZeppelin account type
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Class hash for the account
  * Used value: `0x5c478ee27f2112411f86f207605b2e2c58cdb647bac0df27f660ef2252359c6`
  * This is a class hash for an OpenZeppelin account. This hash is already declared in the Appchain.
* Account name
  * Used value: `account-for-guide`
  * This is the name we will use in this guide for our account.

The full command is:

```bash
sncast account create --type oz \
--url http://127.0.0.1:9945 \
--class-hash 0x5c478ee27f2112411f86f207605b2e2c58cdb647bac0df27f660ef2252359c6 \
--name account-for-guide --silent
```

> ![Account created](/img/pages/use-appchain-account-created.png "Account created")

Note the returned account address. You should store this address as a variable for the current session - this will be used in subsequent interactions. You can store the address with (remember to change the actual value):

```bash
export MADARA_GUIDE_ACCOUNT="0xabc"
```

### Step X: Bridge assets

You now need to bridge some Eth to the account. We need Eth to pay for transactions, since the Appchain doesn't (yet) have STRK for gas fees.

First, you need to prepare parameters for the bridging transaction. Here are the ones used in the command:
* Settlement layer bridge address.
  * Used value: `0x8a791620dd6260079bf849dc5567adc3f2fdc318`
  * This is the default bridge address.
* A settlement layer RPC URL.
  * Used value: `http://127.0.0.1:8545`
  * This is the default URL.
* A private key to the wallet with the assets.
  * Used value: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
  * This is the private key for a settlement layer wallet with Eth, provided by Anvil.
* The bridge function's signature.
  * Used value: `deposit(uint256,uint256)`
  * This is static and doesn't change.
* The amount to be bridged.
  * Used value: `345000000`
  * This denotes 345000000 weis.
* An account on the Appchain to receive the assets.
  * Used value: `$MADARA_GUIDE_ACCOUNT`
  * This is the address that should receive the assets. This references the variable you set earlier.
* Assets to send to the bridge.
  * Used value: `345000001wei`
  * This has to be larger than the amount we want to send for the receiver to cover bridging fees. Using value 345000001 is enough in our setup.

The full command is:

```bash
cast send 0x8a791620dd6260079bf849dc5567adc3f2fdc318 \
--rpc-url http://127.0.0.1:8545 \
--private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
--value 345000001wei \
 "deposit(uint256,uint256)" \
 345000000 \
 $MADARA_GUIDE_ACCOUNT
```

> ![Sending assets](/img/pages/bridging-sl-sent.png "Sending assets")

The assets should get bridged within about 10 seconds - the time it takes to form a new block.

### Step X: Deploy the account

Once the account has been created and it has assets, it still needs to be deployed to the Appchain.

The required parameters for the command are:
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Account name
  * Used value: `account-for-guide`
  * This is the same name used above. The underlying address is not relevant.
* Fee token
  * Used value: `eth`
  * Use Appchain version of Eth to pay for transaction fees.

The full command is:
```bash
sncast account deploy --url http://127.0.0.1:9945 --name account-for-guide --fee-token eth
```

> ![Account deployed](/img/pages/use-appchain-account-deployed.png "Account deployed")

### Step X: Prepare your new token

Since you are changing your gas token, you need a new token to replace the old one. If you already have your implementation ready, feel free to use that. Otherwise, you can use a simple example ERC20 token shown here. This example utilizes [OpenZeppelin's](https://www.openzeppelin.com/) ERC20 implementation.

:::warning 
The token used in this example is highly insecure since it allows anyone to mint any amount of tokens. This is meant only for educational purposes.
:::

#### Initialize a Scarb project

You should initialize a new Scarb project with default settings in a new folder:
```bash
mkdir madara_token
cd madara_token
scarb init --no-vcs --test-runner cairo-test
```

#### Save the token contract locally

Rreplace the contents of `src/lib.cairo` with:

```rust
#[starknet::contract]
mod NewStrk {
    use openzeppelin::token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use starknet::ContractAddress;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    // External
    #[abi(embed_v0)]
    impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;

    // Internal
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.erc20.initializer("NewStrk", "NSTRK");
    }

    #[generate_trait]
    #[abi(per_item)]
    impl ExternalImpl of ExternalTrait {
        #[external(v0)]
        fn mint(ref self: ContractState, recipient: ContractAddress, amount: u256) {
            self.erc20.mint(recipient, amount);
        }
    }
}
```

Next, replace the contents of `Scarb.toml` in the root of the project with:

```rust
[package]
name = "madara_token"
version = "0.1.0"
edition = "2024_07"

[dependencies]
starknet = ">=2.9.4"
openzeppelin = "1.0.0"

[[target.starknet-contract]]
```

#### Compile the example contract

Compile the contract with:

```bash
scarb build
```

### Step X: Declare the token

You now have a ready token to declare to the network.

The required parameters for the command are:
* Account name
  * Used value: `account-for-guide`
  * This is the same name used above. The underlying address is not relevant.
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Fee token
  * Used value: `eth`
  * Use Appchain version of Eth to pay for transaction fees.
* Contract name
  * Used value: `NewStrk`
  * Name of our token contract

The full command is:

```bash
sncast --account account-for-guide declare --url http://localhost:9945 --fee-token eth --contract-name NewStrk
```

TODO: add screenshot

Note the declared class hash. It may take up to a minute for the declaration to be available in the Appchain.

### Step X: Deploy the token

You are now ready to deploy the token itself.

The required parameters for the command are:
* Account name
  * Used value: `account-for-guide`
  * This is the same name used above. The underlying address is not relevant.
* Salt for contract deployment
  * Used value: `1`
  * Use a hardcoded salt value so the deployment address is deterministic.
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Fee token
  * Used value: `eth`
  * Use Appchain version of Eth to pay for transaction fees.
* Class hash
  * Used value: `0x02132f1600bbdb005de58f45719a8e65ea1ae418176484eadfac70f9e8b65c75`
  * The class hash declared earlier.

The full command is:

```bash
sncast --account account-for-guide deploy --salt 1 \
--url http://localhost:9945 \
--fee-token eth \
--class-hash 0x02132f1600bbdb005de58f45719a8e65ea1ae418176484eadfac70f9e8b65c75
```

TODO: add screenshot

Note the deployed contract's address. You should store this address as a variable for the current session - this will be used in subsequent interactions. You can store the address with (remember to change the actual value):

```bash
export MADARA_GUIDE_TOKEN_CONTRACT="0xabc"
```


## Contract interaction

In this section you will learn how to deploy a contract and interact with it.

### Prepare an example contract

First we need to prepare an example smart contract.

An example contract is introduced in the *use a running devnet* guide's section [prepare your contract](use_devnet#prepare-your-contract). Please follow that section for preparations and return here once you have compiled the contract.

### Declare your contract

At this point, the contract needs to be declared to the network.

The required parameters for the command are:
* Account name
  * Used value: `account-for-guide`
  * This is the same name as was used above.
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Fee token
  * Used value: `eth`
  * Use Appchain version of Eth to pay for transaction fees.
* Contract name
  * Used value: `Balance`
  * The name of our example contract we want to declare.

The full command is:

```bash
sncast --account account-for-guide declare --url http://localhost:9945 --fee-token eth --contract-name Balance
```

> ![Contract declared](/img/pages/use-appchain-contract-declared.png "Contract declared")

Note the declared class hash. It may take up to a minute for the declaration to be available in the Appchain.

### Deploy it

You are now ready to deploy the contract.

The required parameters for the command are:
* Account name
  * Used value: `account-for-guide`
  * This is the same name as was used above.
* Salt for contract deployment
  * Used value: `1`
  * Use a hardcoded salt value so the deployment address is deterministic.
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Fee token
  * Used value: `eth`
  * Use Appchain version of Eth to pay for transaction fees.
* Class hash
  * Used value: `0x02666eeed059c91ebe80f6ca66bdb1d5ebb598d0e96e49383bf736c0f6bc7395`
  * The class hash declared earlier.

The full command is:

```bash
sncast --account account-for-guide deploy --salt 1 \
--url http://localhost:9945 \
--fee-token eth \
--class-hash 0x02666eeed059c91ebe80f6ca66bdb1d5ebb598d0e96e49383bf736c0f6bc7395
```

> ![Contract deployed](/img/pages/use-appchain-contract-deployed.png "Contract deployed")

Note the deployed contract's address.

### Issue transactions

The contract keeps track of an imaginary balance. First, let's query the initial balance.

#### Query balance

The required parameters for the command are:
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Contract address
  * Used value: `0x0496048f48618558e0e0beef4c47d8c7f703210fbc548b864b03210b3547fed2`
  * The contract address deployed earlier. You may need to change this to reflect the deployment address.
* Function name
  * Used value: `get`
  * This is the name of the function we are calling inside the example smart contract.

The full command is:

```bash
sncast call \
--url http://localhost:9945 \
--contract-address 0x0496048f48618558e0e0beef4c47d8c7f703210fbc548b864b03210b3547fed2 \
--function get
```

You should see value `5` as the initial value (in hexadecimal format).

#### Increase balance

Let's try to increase this value by a transaction.

The required parameters for the command are:
* Account name
  * Used value: `account-for-guide`
  * This is the same name as was used above.
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Contract address
  * Used value: `0x0496048f48618558e0e0beef4c47d8c7f703210fbc548b864b03210b3547fed2`
  * The contract address deployed earlier. You may need to change this to reflect the deployment address.
* Fee token
  * Used value: `eth`
  * Use Appchain version of Eth to pay for transaction fees.
* Function name
  * Used value: `increase`
  * This is the name of the function we are calling inside the example smart contract.
* Function arguments
  * Used value: `3`
  * This is the argument we are passing to the function. We pass *3* because we want to increment the counter by three.

The full command is:

```bash
sncast --account account-for-guide invoke \
--url http://localhost:9945 \
--fee-token eth \
--contract-address 0x0496048f48618558e0e0beef4c47d8c7f703210fbc548b864b03210b3547fed2 \
--function increase --arguments "3"
```

If you query the balance again, you should see value `8`. 

Congratulations, you have successfully modified the state of your contract and Appchain!