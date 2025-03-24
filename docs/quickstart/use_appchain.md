---
sidebar_position: 7
---

# Use a running Appchain

## Overview

This quick-start guide helps you interact with an Appchain. Please make sure you are [running a Madara Appchain](run_appchain) in a separate terminal before continuing.

## Preparations

To get ready for interacting with your Appchain, you should install the [required tools](/tools) and prepare an example smart contract.

An example contract is introduced in the *use devnet* guide's section [prepare your contract](use_devnet#prepare-your-contract). Please follow that section for preparations and return here once you have the contract compiled.

## Prepare your account

A new Appchain does not have accounts nor assets to pay gas fees with. We will need to bridge some assets and create an account to be able to interact with the Appchain.

### Bridge assets

Later in this guide we will show how to deploy an account at address `0xcdef2e5fe47da355316acc78ad8872a2ff9835c52939a62fa83b4d6ee56b3a`. Before that, please go to the [bridging guide](bridge_appchain) and bridge Eth to that address (from the settlement layer to the Appchain). Remember that you will need to modify the default command to use a different target address.

Once the address has Eth, we can start deploying an account to that address.

### Create account data

Starknet Foundry does not have direct functionality to create an account at a deterministic address. Therefore, we have to get a bit creative with how we create an account.

Our script below will do the following:
1. Create a random account entry in the Starknet Foundry account file.
1. Create a temporary file with the current account file's content. 
1. Replace the random account data with our precalculated data.
1. Replace the account file with the temporary file.

The required parameters for the command are:
* Account type
  * Used value: `oz`
  * Use a generic OpenZeppelin account type
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Class hash for the account
  * Used value: `0x5c478ee27f2112411f86f207605b2e2c58cdb647bac0df27f660ef2252359c6`
  * This is the class hash for an OpenZeppelin account. This hash is already declared in the Appchain.
* Account name
  * Used value: `account-for-guide`
  * This is the name we will use in this guide for our account
* File path
  * Used value: `$HOME/.starknet_accounts/starknet_open_zeppelin_accounts.json`
  * Location of the account file
* Appchain name
  * Used value: `MADARA_DEVNET`
  * This is the name of our Appchain. Accounts for this chain are created under this name in the account file.
* Account name
  * Used value: `account-for-guide`
  * This is the same name as was used above.
* Account address
  * Used value: `0xcdef2e5fe47da355316acc78ad8872a2ff9835c52939a62fa83b4d6ee56b3a`
  * This is the same address that was the target of bridging from the settlement layer, earlier in this guide.
* The used private key
  * Used value: `0x5d14e6730aed39ac7f908ea699944f74409787a567d197a540c0d3c0567832c`
  * This is the private key corresponding to the used account address.
* The used public key
  * Used value: `0x4746c72bdf15c114e7b82abdacda25aaabcbb80b7480313dcb14ee5ecbde0ea`
  * This is the public key corresponding to the used private key.




The full command is:

```bash
sncast account create --type oz \
--url http://127.0.0.1:9945 \
--class-hash 0x5c478ee27f2112411f86f207605b2e2c58cdb647bac0df27f660ef2252359c6 \
--name account-for-guide --silent

FILE="$HOME/.starknet_accounts/starknet_open_zeppelin_accounts.json"

jq '.MADARA_DEVNET["account-for-guide"] += {
  "address": "0xcdef2e5fe47da355316acc78ad8872a2ff9835c52939a62fa83b4d6ee56b3a",
  "private_key": "0x5d14e6730aed39ac7f908ea699944f74409787a567d197a540c0d3c0567832c",
  "public_key": "0x4746c72bdf15c114e7b82abdacda25aaabcbb80b7480313dcb14ee5ecbde0ea",
}' "$FILE" > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"
```

### Deploy the account

Once the account has been created it still needs to be deployed to the Appchain.

The required parameters for the command are:
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Account name
  * Used value: `account-for-guide`
  * This is the same name as was used above.
* Fee token
  * Used value: `eth`
  * Use Appchain version of Eth to pay for transaction fees.

:::info
Remember that your account needs to have Appchain Eth to pay for any transaction fees. If it doesn't, please check earlier in this guide on how to bridge some Eth to your account.
:::

The full command is:
```bash
sncast account deploy --url http://127.0.0.1:9945 --name account-for-guide --fee-token eth
```

TODO: add screenshot of a successful command run.

## Contract interaction

We are now ready to start deploying our contract and interacting with it.

### Declare your contract

Before deployment, the contract needs to be declared to the network.

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

TODO: add screenshot

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

TODO: add screenshot

Note the deployed contract's address.

### Issue transactions

The contract keeps track of an imaginary balance. Let's first query the initial balance.

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

If you now query the balance again, you should see value `8`. Congratulations, you have successfully modified the contract's state!