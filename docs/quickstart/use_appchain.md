---
sidebar_position: 7
---

# Use a running Appchain

## Overview

This quick-start guide helps you interact with an Appchain. Please make sure you are [running a Madara Appchain](run_appchain) in a separate terminal before continuing.

First, we will prepare an account and then interact with an example contract.

## Prepare an account

Account creation in Madara, and the [SN Stack](https://www.starknet.io/sn-stack/) in general, works quite differently from traditional blockchains like Ethereum. In our Appchain, the process involves:
1. Generating an account address.
1. Sending assets to the newly created address so the account can be deployed.
1. Deploying the account from itself.

Since the account must be funded before deployment, you first need to know its address to send assets. The required assets can be bridged from the settlement layer, since we are using an Appchain.

### Create account data

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

![Account created](/img/pages/use-appchain-account-created.png "Account created")

Note the returned account address. You will now need to bridge assets to this address.

### Bridge assets to the address

Go to the [bridging guide](bridge_appchain) and bridge Eth to the address you received in the previous section. Remember to bridge from the settlement layer to the Appchain. You will need to modify the guide's default command to use a different target address.

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

![Account deployed](/img/pages/use-appchain-account-deployed.png "Account deployed")

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

![Contract declared](/img/pages/use-appchain-contract-declared.png "Contract declared")

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
  * Used value: `0x041de961fe39bbe6810532bb827b8aae10130262254f8c6ad70e38a565336d90`
  * The class hash declared earlier.

The full command is:

```bash
sncast --account account-for-guide deploy --salt 1 \
--url http://localhost:9945 \
--fee-token eth \
--class-hash 0x041de961fe39bbe6810532bb827b8aae10130262254f8c6ad70e38a565336d90
```

![Contract deployed](/img/pages/use-appchain-contract-deployed.png "Contract deployed")

Note the deployed contract's address.

### Issue transactions

The contract keeps track of an imaginary balance. First, let's query the initial balance.

#### Query balance

The required parameters for the command are:
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Contract address
  * Used value: `0x021e4332c06c31c764f023f404d6fc2af6f683dbb3e0f258600d7137401fee3a`
  * The contract address deployed earlier.
* Function name
  * Used value: `get`
  * This is the name of the function we are calling inside the example smart contract.

The full command is:

```bash
sncast call \
--url http://localhost:9945 \
--contract-address 0x021e4332c06c31c764f023f404d6fc2af6f683dbb3e0f258600d7137401fee3a \
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
  * Used value: `0x021e4332c06c31c764f023f404d6fc2af6f683dbb3e0f258600d7137401fee3a`
  * The contract address deployed earlier.
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
--contract-address 0x021e4332c06c31c764f023f404d6fc2af6f683dbb3e0f258600d7137401fee3a \
--function increase --arguments "3"
```

If you query the balance again, you should see value `8`. 

Congratulations, you have successfully modified the state of your contract and Appchain!