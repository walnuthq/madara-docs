---
sidebar_position: 16
---

# Appchain bridging

## Overview

This guide helps you bridge assets to your Appchain and back. Please make sure you are [running a local Appchain](/quickstart/run_appchain) with [settlement](/concepts/settlement) before continuing.

A local Appchain settles its transactions on a local Ethereum node. A bridge has been automatically setup between the settlement layer and your Appchain. We can utilize that bridge to either deposit assets from the settlement layer to the Appchain, or to withdraw assets back from the Appchain to the settlement layer.

### What is bridging

Bridging in general is a term used to move assets between two different blockchains. The blockchains may be layered (L1 and L2, for example) or they may be totally unrelated. Bridging is generally easier and safer between layered blockchains.

A *bridge* is the solution for bridging. Often it has a website users can use. In the background, it uses various mechanisms with various trust assumptions.

Bridging can happen in either direction. The exact mechanisms may differ, but the end result is very similar: your asset gets transferred to the other side of the bridge.

## Installation

The needed tooling depends on which direction you want to bridge:
* If you want to bridge from the settlement layer to the Appchain, install [Foundry](https://book.getfoundry.sh/getting-started/installation).
* If you want to bridge from the Appchain to the settlement layer, you need to install two tools:
  1. [Foundry](https://book.getfoundry.sh/getting-started/installation).
  1. Starknet Foundry, by following the installation instructions [here](/quickstart/use_devnet#installation).

## What to bridge

The used bridging solution, Starkgate, supports multiple tokens. It's also possible to bridge the native asset (Eth).

In this guide we will be bridging Eth. Since the settlement layer is an Ethereum chain, the bridged asset is the native asset in the settlement layer and a token representation of Eth on the Appchain.

## Bridge from settlement layer to Appchain

Bridging from the settlement layer to the Appchain is a simple process that involves sending a structured message to the bridge contract on the settlement layer.

### Data preparations

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
  * Used value: `345`
  * This denotes 345 weis.
* An account on the Appchain to receive the assets.
  * Used value: `0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493`
  * This is the address that should receive the assets. This address will be used when bridging assets back, later in this guide. FIXME: incorrect address
* Assets to send to the bridge.
  * Used value: `346wei`
  * This has to be larger than the amount we want to send for the receiver, to pay for the bridging fees. Using value 346 is enough in our setup.

:::warning
Never use private keys associated with real assets in commands. These examples are for educational purposes only.
:::

### Perform bridging

We can utilize Foundry's `cast` command to send a transaction to the settlement layer. By inputting our parameters from above, we can send the command:
```bash
cast send 0x8a791620dd6260079bf849dc5567adc3f2fdc318 \
--rpc-url http://127.0.0.1:8545 \
--private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
 "deposit(uint256,uint256)" \
 345 \
 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493 \
 --value 346wei
```

![Sending assets](/img/pages/bridging-sl-sent.png "Sending assets")

The assets should get bridged within about 10 seconds - the time it takes to form a new block.

### Check your Appchain balance

You can verify that the assets were bridged properly by querying the account balance in the Appchain. 

The required parameters for the command are:
* Appchain RPC URL
  * Used value: `http://localhost:9945`
  * This is the default URL.
* Eth token contract address
  * Used value: `0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7`
  * This is the Eth token contract address in your Appchain. Remember that Eth is represented as an ERC-20 token in the Appchain.
* The function's signature
  * Used value: `balance_of`
  * This function is used to query balance of an address in an Appchain ERC-20 token contract
* Address to check for balance update
  * Used value: `0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493`
  * This is the address that should receive the assets. Use the one you got when creating an account

The full command is:

```bash
sncast call \
--url http://localhost:9945 \
--contract-address 0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7 \
--function "balance_of" \
--calldata 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493
```

![Sending assets](/img/pages/bridging-appchain-received.png "Sending assets")

You should get a response `[0x159, 0x0]`. The first value is `345` in hexadecimal format, the second zero is irrelevant for us.






## Bridge from Appchain to settlement layer

Bridging from the Appchain to the settlement layer requires a bit more effort, since the assets need to be withdrawn manually from the bridge, at the settlement layer side.

Furthermore, you cannot bridge assets if you don't have assets. Therefore, you first need to bridge assets from the settlement layer to the Appchain.

The whole process for bridging from the Appchain is the following:
1. Bridge assets from the settlement layer to the Appchain.
1. Prepare an account in the Appchain.
1. Initiate bridging from the Appchain.
1. Wait until the block with the bridging transaction is settled on the settlement layer.
1. Finalize the bridging by issuing a withdrawal transaction on the settlement layer.

### Step 1: Bridge from the settlement layer

Please complete the tutorial at the start of this page to get assets in your Appchain. The target address is the same as will be used later in this tutorial.

### Step 2: Prepare an account

The Appchain does not include ready accounts - they need to be created and deployed manually.

#### Create account data

Starknet Foundry does not have direct functionality to create an account at a deterministic address. Until this feature is added, we have to get a bit creative with how we create an account.

The script below will do the following:
1. Create a random account entry in the Starknet Foundry account file.
1. Create a temp file with the current account file's content. Replace the random account data with our precalculated data.
1. Move the temp file to replace the account file.

The required parameters for the command are:
* Account type
  * Used value: `oz`
  * Use a generic OpenZeppelin account type
* Salt for account creation
  * Used value: `1`
  * Use a hardcoded salt value so the account address is known
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
  * This is the name our our Appchain. Accounts for this chain are created under this name.
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
sncast account create --type oz --salt 1  \
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

#### Deploy an account

Once the account has been created, it still needs to be deployed to the Appchain.

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
```
sncast account deploy --url http://127.0.0.1:9945 --name account-for-guide --fee-token eth
```

TODO: add screenshot of a successful command run.

### Step 3: Initiate bridging from the Appchain

First, you need to prepare parameters for the bridging transaction. Here are the ones used in the command:
* A configured account
  * Used value: `account-for-guide`
  * This is the account name you used when creating the account earlier.
* Appchain RPC URL.
  * Used value: `http://127.0.0.1:9945`
  * This is the default URL.
* Appchain bridge address.
  * Used value: `0x190f2407f7040ef9a60d4df4d2eace6089419aa9ec42cda229a82a29b2d5b3e`
  * This is the default Eth bridge address for a Madara Appchain.
* The bridge function's name.
  * Used value: `initiate_token_withdraw`
  * This is static and doesn't change.
* Asset contract address.
  * Used value: `0x0000000000000000000000000000000000455448`
  * Address of the asset contract in the settlement layer. This is a special address invented by the Starkgate bridge protocol - using this address denotes that the asset in question is Eth.
* Receives address.
  * Used value: `0x0000000000000000000000000000000000000001`
  * This is the address that should receive the assets in the settlement layer. An arbitrary value is used.
* The amount to be bridged.
  * Used value: `123 0`
  * This denotes 123 weis. The last zero is because of Starknet's [peculiar u256 encoding](https://docs.starknet.io/architecture-and-concepts/smart-contracts/serialization-of-cairo-types/#serialization_in_u256_values).

The full command is:
```bash
sncast --account account-for-guide invoke \
--url http://127.0.0.1:9945 \
--fee-token eth \
--contract-address 0x190f2407f7040ef9a60d4df4d2eace6089419aa9ec42cda229a82a29b2d5b3e \
--function "initiate_token_withdraw" \
--calldata 0x0000000000000000000000000000000000455448 \
0x0000000000000000000000000000000000000001 \
123 0
```

### Step 4: Finish bridging in the settlement layer

Prepare parameters for finishing the bridging transaction. Most of them you get from Anvil logs. Here are the ones used in the command later:
* Assets to bridge and to pay gas fees with. Luckily, your Appchain comes with some accounts with ready assets. TODO: does it?
* Settlement layer bridge address.
  * Used value: `0x8a791620dd6260079bf849dc5567adc3f2fdc318`
  * This is the default Eth bridge address for a Madara Appchain's settlement layer.
* A settlement layer RPC URL.
  * Used value: `http://127.0.0.1:8545`
  * This is given upon launching the Appchain.
* A private key for the sending wallet.
  * Used value: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
  * This is the key for an account that initiates the withdrawal transaction. This is the same as was used when bridging from the settlement layer, earlier in this guide.
* The bridge function's signature.
  * Used value: `withdraw(address,uint256,address)`
  * This is static and doesn't change.
* Asset contract address.
  * Used value: `0x0000000000000000000000000000000000455448`
  * Address of the asset contract in the settlement layer. This is a special address invented by the Starkgate bridge protocol - using this address denotes that the asset in question is Eth.
* The amount to be bridged.
  * Used value: `123`
  * This denotes 123 weis.
* An account on the settlement layer to receive the assets.
  * Used value: `0x0000000000000000000000000000000000000001`
  * This is the address that was used for bridging from the settlement layer to the Appchain.

```bash
cast send 0x8a791620dd6260079bf849dc5567adc3f2fdc318 \
--rpc-url http://127.0.0.1:8545 \
--private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
"withdraw(address,uint256,address)" \
 0x0000000000000000000000000000000000455448  \
 123 \
 0x0000000000000000000000000000000000000001
```

The assets should be in your wallet instantly.

### Check the settlement layer balance

You can verify that the assets were bridged properly by checking the Eth balance in the settlement layer.

The required parameters for the command are:
* A settlement layer RPC URL.
  * Used value: `http://127.0.0.1:8545`
  * This is the default URL.
* Wallet address
  * Used value: `0x0000000000000000000000000000000000000001`
  * The wallet that should receive the assets


The full command is:
```bash
cast balance --rpc-url http://127.0.0.1:8545 0x0000000000000000000000000000000000000001
```

You should get a response ``. This is the value we bridged.

## Read more

- [Starknet docs](https://docs.starknet.io/starkgate/overview/)

