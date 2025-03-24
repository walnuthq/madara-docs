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
  * Used value: `0xcdef2e5fe47da355316acc78ad8872a2ff9835c52939a62fa83b4d6ee56b3a`
  * This is the address that should receive the assets. This is an address used in other guides.
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
 0xcdef2e5fe47da355316acc78ad8872a2ff9835c52939a62fa83b4d6ee56b3a \
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
  * Used value: `0xcdef2e5fe47da355316acc78ad8872a2ff9835c52939a62fa83b4d6ee56b3a`
  * This is the address that should receive the assets. Use the one you got when creating an account

The full command is:

```bash
sncast call \
--url http://localhost:9945 \
--contract-address 0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7 \
--function "balance_of" \
--calldata 0xcdef2e5fe47da355316acc78ad8872a2ff9835c52939a62fa83b4d6ee56b3a
```

![Sending assets](/img/pages/bridging-appchain-received.png "Sending assets")

You should get a response `[0x159, 0x0]`. The first value is `345` in hexadecimal format, the second zero is irrelevant for us.

## Bridge from Appchain to settlement layer

This will be documented in the near future.

## Read more

- [Starknet docs](https://docs.starknet.io/starkgate/overview/)

