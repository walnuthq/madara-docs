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

## Change the token in the Appchain



### Step 1: Run the Appchain



## Prepare an account

Account creation in Madara, and the [SN Stack](https://www.starknet.io/sn-stack/) in general, works quite differently from traditional blockchains like Ethereum. In our Appchain, the process involves:
1. Generating an account address.
1. Sending assets to the newly created address so the account can be deployed.
1. Deploying the account from itself.

Since the account must be funded before deployment, you first need to know its address to send assets. Since we are using an Appchain, the required assets can be bridged from the [settlement layer](/concepts/settlement). 

### Generate account data

First, let's generate the account data.

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

Note the returned account address. You will now need to bridge assets to this address.

### Bridge assets to the address

Go to the [bridging guide](/advanced/bridge_appchain) and bridge Eth to the address you received in the previous section. Remember to bridge from the settlement layer to the Appchain. You will need to modify the guide's default command to use a different target address.

Once the address has Eth, we can start deploying an account to that address.

Luckily, the account address is stored in an account file in your computer. From now on we can reference the account only by its name.

### Deploy the account

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