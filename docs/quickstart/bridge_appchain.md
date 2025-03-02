---
sidebar_position: 16
---

# Appchain bridging

## Overview

This guide helps you bridge assets to your Appchain and back. Please make sure you are [running a local Appchain](/quickstart/run_appchain) with [settlement](/concepts/settlement) before continuing.

A local Appchain settles its transactions on a local Anvil node. A bridge has been automatically setup between the settlement layer and your Appchain. We can utilize that bridge to either deposit assets from the settlement layer to the Appchain, or to withdraw assets back from the settlement layer to the Appchain.

### What is bridging

Bridging is a term used to move assets between two different blockchains. The blockchains may be layered (L1 and L2, for example) or they may be totally unrelated. Bridging is generally easier and safer between layered blockchains.

A *bridge* is the solution for bridging. Typically it has a website users can use. In the background, it uses various mechanisms with various trust assumptions.

Bridging can happen in either direction. The exact mechanisms may differ, but the end result is very similar: your asset gets transferred to the other side of the bridge.

## Installation

We will use two tools for the bridging. Install them based on your needs:
- If you want to bridge assets from the settlement layer to Appchain, install [Foundry](https://book.getfoundry.sh/getting-started/installation).
- If you want to bridge assets from Appchain to the settlement layer, install both Foundry and [Starknet Foundry](https://foundry-rs.github.io/starknet-foundry/getting-started/installation.html).

## What to bridge

The used bridge, Starkgate, supports [multiple tokens](https://docs.starknet.io/starkgate/overview/) (TODO: does our bridge support the same?). If the used settlement layer is Ethereum, it's also possible to bridge the native asset (Eth).

In this guide we will be bridging STRK tokens.

## Bridge from settlement layer to Appchain

Bridging from the settlement layer to the Appchain is a rather straightforward process. It pnly requires calling the bridge contract on the settlement layer with a carefully crafted message and the assets should transfer within a few minutes.

### Data preparations

!!A lot of TODOs here!!

First, you need to prepare parameters for the bridging transaction. Most of them you get from Appchain logs. Here are the ones used in the command later:
* Assets to bridge and to pay gas fees with. Luckily, your Anvil comes with some accounts with ready assets (Eth).
* Settlement layer bridge address.
  * Used value: `0x8453FC6Cd1bCfE8D4dFC069C400B433054d47bDc`
  * This is given upon launching the Appchain. TODO
* A settlement layer RPC URL.
  * Used value: `http://127.0.0.1:8545`
  * This is given upon launching the Appchain
* A private key to the wallet with the assets. Anvil gives you this as well.
  * Used value: `0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6`
  * This is the private key for the last account provided by Anvil
* The bridge function's signature.
  * Used value: `deposit(address,uint256,uint256)`
  * This is static and doesn't change.
* Asset contract address.
  * Used value: `0x0000000000000000000000000000000000455448`
  * TODO (what's appchain's [eth address](https://github.com/starknet-io/starknet-addresses/blob/master/bridged_tokens/sepolia.json)?
* The amount to be bridged.
  * Used value: `345`
  * This denotes 345 weis.
* An account on the Appchain to receive the assets. TODO will be setup automagically?
  * Used value: `3293945099482077566294620753663887236810230524774221047563633702975851058323`
  * This is the decimal representation of 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493, which is...TODO
* Transaction fee for the bridge.
  * Used value: `0.000001ether`
  * This is to pay for bridge operations.

:::warning
Never use private keys linked to real assets directly in commands. These examples are only meant for educational use.
:::

### Perform bridging

We can utilize Foundry's `cast` command to send a transaction to the settlement layer. By inputting our parameters from above, we can send the command:
```bash
cast send 0x8453FC6Cd1bCfE8D4dFC069C400B433054d47bDc \ 
--rpc-url http://127.0.0.1:8545 \
--private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 \
 "deposit(address,uint256,uint256)" \
 0x0000000000000000000000000000000000455448 \
 345 \
 3293945099482077566294620753663887236810230524774221047563633702975851058323 \
 --value 0.000001ether
```

The assets should get bridged within a few minutes.

## Bridge from Appchain to settlement layer

Bridging from the Appchain to the settlement layer is a bit more elaborate process. It requires executing a transactions on both layers and waiting for a lot longer for the transaction to finalize. TODO: does this apply to our own appchain also... and how long? in mainnet around 10h

Therefore, the process for bridging from the Appchain is the following:
1. Initiate bridging from the Appchain
1. Wait until the block with the bridging transaction is settled on the settlement layer
1. Finalize the bridging by issuing a withdrawal transaction on the settlement layer

### 1. Initiate bridging from the Appchain

#### Import an account

Before you can issue transactions in the Appchain you have to prepare an account. The Appchain provides you with a few ready accounts (TODO: does it?) but you will have to store one in the correct format.

Check the Appchain logs for a ready account. Note its private key and public address and replace those in the following command and execute it:
```rust
sncast account import --type oz \
--url http://localhost:9944 --silent \
--address 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493 \
--private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2
```

Note the imported account name.

#### Appchain transaction

First, you need to prepare parameters for the bridging transaction. Most of them you get from Appchain logs. Here are the ones used in the command later:
* Assets to bridge and to pay gas fees with. Luckily, your Appchain comes with some accounts with ready assets. TODO: does it?
* A stored account
  * Used value: `account-1`
  * This is the account name you got when importing the account earlier.
* Appchain RPC URL.
  * Used value: `http://127.0.0.1:8545`
  * This is given upon launching the Appchain
* Appchain bridge address.
  * Used value: `0x0594c1582459ea03f77deaf9eb7e3917d6994a03c13405ba42867f83d85f085d` TODO
  * This is given upon launching the Appchain. TODO
* The bridge function's name.
  * Used value: `initiate_token_withdraw`
  * This is static and doesn't change.
* Asset contract address.
  * Used value: `0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766` TODO
  * This is the used token's contract address in the settlement layer
* Settlement layer address. TODO will be setup automagically?
  * Used value: `0xa0Ee7A142d267C1f36714E4a8F75612F20a79720`
  * This is the address that should receive the assets. The last available address from Anvil logs.
* The amount to be bridged.
  * Used value: `678 0`
  * This denotes 678 weis. The last zero is because of Starknet's [peculiar u256 encoding](https://docs.starknet.io/architecture-and-concepts/smart-contracts/serialization-of-cairo-types/#serialization_in_u256_values).

We can utilize Starknet Foundry's `sncast` command to send a transaction to the Appchain. By inputting our parameters from above, we can send the command:
```bash
sncast --account account-1 invoke \
--url http://127.0.0.1:8545 \
--contract-address 0x0594c1582459ea03f77deaf9eb7e3917d6994a03c13405ba42867f83d85f085d \
--function "initiate_token_withdraw" \
--calldata 0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766 \
0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 \
678 0
```

### 2. Wait

The bridging process may take some time. The exact time depends on your Appchain settings. In Starknet mainnet this bridging takes about 10 hours.

TODO: how do we know when the bridging is ready?

### 3. Finish bridging in the settlement layer

Prepare parameters for finishing the bridging transaction. Most of them you get from Anvil logs. Here are the ones used in the command later:
* Assets to bridge and to pay gas fees with. Luckily, your Appchain comes with some accounts with ready assets. TODO: does it?
* Settlement layer bridge address.
  * Used value: `0xcE5485Cfb26914C5dcE00B9BAF0580364daFC7a4` TODO
  * This is given upon launching the Appchain. The address also depends on the used token. TODO
* A settlement layer RPC URL.
  * Used value: `http://127.0.0.1:8545`
  * This is given upon launching the Appchain.
* A private key to the wallet with the assets. Anvil gives you this as well.
  * Used value: `0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6`
  * This is the private key for the last account provided by Anvil.
* The bridge function's signature.
  * Used value: `withdraw(address,uint256,address)`
  * This is static and doesn't change.
* Asset contract address.
  * Used value: `0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766`
  * Address of the used token contract in the settlement layer.
* The amount to be bridged.
  * Used value: `678`
  * This denotes 678 weis.
* An account on the settlement layer to receive the assets. TODO will be setup automagically?
  * Used value: `0xa0Ee7A142d267C1f36714E4a8F75612F20a79720`
  * This is the last address provided by Anvil.


```bash
cast send 0x8453FC6Cd1bCfE8D4dFC069C400B433054d47bDc \
--rpc-url http://127.0.0.1:8545 \
--private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 \
"withdraw(address,uint256,address)" \
 0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766 \
 678 \
 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
```

The assets should be in your wallet instantly.

## Read more

- [Starknet docs](https://docs.starknet.io/starkgate/overview/)

