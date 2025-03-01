---
sidebar_position: 6
---

# Appchain bridging

## Overview

This guide helps you bridge assets to your Appchain and back. Please make sure you are [running a local Appchain](/quickstart/run_appchain) with [settlement](/concepts/settlement) before continuing.

A local Appchain settles its transactions on a local Anvil node. A bridge has been automatically setup between the settlement layer and your Appchain. We can utilize that bridge to either deposit assets from the settlement layer (L1) to the Appchain (L2), or to withdraw assets back from L2 to L1.

### What is bridging

Bridging is a term used to move assets between different blockchains. The blockchains may be layered (L1 and L2, for example) or they may be totally unrelated. Bridging is generally easier and safer between layered blockchains.

A *bridge* is the solution for bridging. Typically it has a website users can use. In the background, it uses various mechanisms with various trust assumptions.

## Installation

We will use two tools for the bridging. Install them based on your needs:
- If you want to bridge assets from L1 to L2, install [Foundry](https://book.getfoundry.sh/getting-started/installation).
- If you want to bridge assets from L2 to L1, install both Foundry and [Starknet Foundry](https://foundry-rs.github.io/starknet-foundry/getting-started/installation.html).

## L1 to L2

Bridging from the settlement layer to the Appchain is a rather straightforward process. It pnly requires calling the bridge contract on L1 with a carefully crafted message and the assets should transfer within a few minutes.

### Data preparations

!!A lot of TODOs here!!

First, you need to prepare parameters for the bridging transaction. Most of them you get from Appchain logs. Here are the ones used in the command later:
* Assets to bridge and to pay gas fees with. Luckily, your Anvil comes with some accounts with ready assets (Eth).
* L1 bridge address.
  * Used value: `0x8453FC6Cd1bCfE8D4dFC069C400B433054d47bDc`
  * This is given upon launching the Appchain. TODO
* An L1 RPC URL.
  * Used value: `http://127.0.0.1:8545`
  * This is given upon launching the Appchain
* A private key to the wallet with the assets. Anvil gives you this as well.
  * Used value: `0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6`
  * This is the private key for the last account provided by Anvil
* The bridge function's signature.
  * Used value: `deposit(address,uint256,uint256)`
  * This is statis and doesn't change.
* Asset contract address.
  * Used value: `0x0000000000000000000000000000000000455448`
  * TODO (what's appchain's [eth address](https://github.com/starknet-io/starknet-addresses/blob/master/bridged_tokens/sepolia.json)?
* The amount to be bridged.
  * Used value: `345`
  * This denotes 345 weis.
* An account on L2 to receive the assets. TODO will be setup automagically?
  * Used value: `3293945099482077566294620753663887236810230524774221047563633702975851058323`
  * This is the decimal representation of 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493, which is...TODO
* Transaction fee for the bridge.
  * Used value: `0.000001ether`
  * This is to pay for bridge operations.

### Perform bridging

We can utilize Foundry's `cast` command to send a transaction to the L1 blockchain. By inputting our parameters from above, we can send the command:
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

## L2 to L1

Bridging from the Appchain to the settlement layer is a bit more elaborate process. It requires executing a transactions on both layers and waiting for a lot longer for the transaction to finalize. TODO: does this apply to our own appchain also... and how long? in mainnet around 10h

### Data preparations

!!A lot of TODOs here!!

First, you need to prepare parameters for the bridging transaction. Most of them you get from Appchain logs. Here are the ones used in the command later:
* Assets to bridge and to pay gas fees with. Luckily, your Appchain comes with some accounts with ready assets. TODO: does it?
* L1 bridge address.
  * Used value: `0x8453FC6Cd1bCfE8D4dFC069C400B433054d47bDc` TODO
  * This is given upon launching the Appchain. TODO
* An L1 RPC URL.
  * Used value: `http://127.0.0.1:8545`
  * This is given upon launching the Appchain
* A private key to the wallet with the assets. Anvil gives you this as well.
  * Used value: `0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6`
  * This is the private key for the last account provided by Anvil
* The bridge function's signature.
  * Used value: `deposit(address,uint256,uint256)`
  * This is statis and doesn't change.
* Asset contract address.
  * Used value: `0x0000000000000000000000000000000000455448`
  * TODO (what's appchain's [eth address](https://github.com/starknet-io/starknet-addresses/blob/master/bridged_tokens/sepolia.json)?
* The amount to be bridged.
  * Used value: `345`
  * This denotes 345 weis.
* An account on L2 to receive the assets. TODO will be setup automagically?
  * Used value: `3293945099482077566294620753663887236810230524774221047563633702975851058323`
  * This is the decimal representation of 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493, which is...TODO
* Transaction fee for the bridge.
  * Used value: `0.000001ether`
  * This is to pay for bridge operations.

### Initiate bridging: Appchain

As mentioned, the briding happens in two phases. First we have to send assets to the bridge and in a separate transaction withdraw assets from the bridge at the other layer.

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

We can utilize Starknet Foundry's `sncast` command to send a transaction to the L2 blockchain. By inputting our parameters from above, we can send the command:
```bash
sncast --account account-2 invoke \
--url https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/Ei6nQQBvkurspHJqlZ6_AOPEaXyOZQ5_ \
--contract-address 0x04c5772d1914fe6ce891b64eb35bf3522aeae1315647314aac58b01137607f3f \
--function "initiate_token_withdraw" \
--calldata 0x0000000000000000000000000000000000455448 \
0x05BA586F822cE9debaE27FA04a3e71721FDc90Ff \
85300000000000 0
```


```bash
cast send 0x8453FC6Cd1bCfE8D4dFC069C400B433054d47bDc \
--rpc-url https://eth-sepolia.g.alchemy.com/v2/dhXdEar96Lbh7_bS_onTTKDWwq037x2j \
--private-key TODO \
"withdraw(address,uint256,address)" \
 0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766 \
 35700000000000 \
 0x05BA586F822cE9debaE27FA04a3e71721FDc90Ff
```

The assets should get bridged within a few minutes.

## Read more

- [Starknet docs](https://docs.starknet.io/starkgate/overview/)

