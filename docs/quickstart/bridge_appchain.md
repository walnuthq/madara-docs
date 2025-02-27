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

## Preparations

We will use two tools for the bridging. Install them based on your needs:
- If you want to bridge assets from L1 to L2, install [Foundry](https://book.getfoundry.sh/getting-started/installation).
- If you want to bridge assets from L2 to L1, install both Foundry and [Starknet Foundry](https://foundry-rs.github.io/starknet-foundry/getting-started/installation.html).

## L1 to L2

### What you need

In order to bridge assets from the settlement layer to your Appchain you need to have the following prepared:
- Assets to bridge and to pay gas fees with. Luckily, your Anvil comes with some accounts with ready assets (Eth).
- A private key to the wallet with the assets. Anvil gives you this as well.
- An account on L2 to receive the assets. TODO
- L1 bridge address.
- An RPC URL.

This guide assumes you use the following values. They are suited for a typical Appchain deployment with the CLI:

| Entry | Value | Notes |
| ---------- | ---------- | -------- |
| Private key       | TODO | |
| Asset contract address      | TODO | TODO (what's appchain's [eth address](https://github.com/starknet-io/starknet-addresses/blob/master/bridged_tokens/sepolia.json)? |
| L2 receiver account      | TODO     | This is the decimal version of TODO |
| L1 bridge address    | TODO | |
| RPC URL | TODO | |


### Perform bridging

We will bridge `456 weis` of Eth to L2.

