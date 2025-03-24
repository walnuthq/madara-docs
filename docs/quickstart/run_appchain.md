---
sidebar_position: 7
---

# Run a local appchain

## Overview

This guide will help you run an [Appchain](/concepts/appchain) with Madara.

The deployed components are only available locally and are meant for testing purposes.

### What is an Appchain

An Appchain is a blockchain built for a single purpose. It runs all of the required components of a real blockchain but is meant to serve a single use case. This is unlike general-purpose blockchains that are meant for a variety of use cases.

Furthermore, an Appchain is typically built on top of some existing blockchain. Madara's Appchains run on top of either Starknet or Ethereum and [settle](/concepts/settlement) their transactions there for added security.

## Prerequisites

Before starting, please make sure you have all of the [required tools](/tools) installed.

Remember to also check the [hardware requirements](/hardware) to make sure you can run an Appchain properly.

## Run the appchain locally

These instructions will walk you through setting up an Appchain.

### Step 1: Install Madara CLI

You should start by installing the main tool for running Madara, the Madara CLI:
```bash
git clone https://github.com/madara-alliance/madara-cli.git
cd madara-cli
git submodule update --init --recursive --jobs=4
```

The above will clone the repository into a new folder, enter the folder and initialize the repository's Git submodules.

### Step 2: Start the runner

Next, in the `madara-cli` folder, run the following command to start the Madara runner:

```bash
cargo run create
```

### Step 3: Use Appchain mode

The CLI will first ask you what Madara mode to run. Since we want an Appchain, you should choose *Appchain*.

### Step 4: Deploy L2 contracts

The CLI will next ask whether you want to deploy initial contracts to the Appchain (L2). The contracts to be deployed are:
- Contracts related to bridging.
- [Universal Deployer Contract](https://docs.starknet.io/architecture-and-concepts/accounts/universal-deployer/).
- Wallet-specific account contracts (Argent and Braavos).

You should choose *Yes*.

### Step 5: Select the prover

The CLI will next ask to choose the [prover](/components/prover). There are multiple options:

1. `Dummy`. This will essentially skip proof generation and verification completely.
2. `Atlantic`. A supported [prover service](https://atlanticprover.com/).
3. `Stwo`. A new prover type. Not fully supported yet.

For now, select `Dummy`.

### Step 6: Choose whether to use local images

Choosing *No* will download ready Docker images from a trusted registry. Choosing *Yes* builds the images locally - this can take quite some time.

To get started quickly, you should choose *No*.

### Step 7: Select the settlement layer (coming soon)

When running your Appchain, selecting the settlement layer is an important consideration.

At the moment, the CLI will automatically set up a new Ethereum chain (with Anvil) as the settlement layer. This will become customizable later.

### Step 8: Wait for the Appchain to be configured

It will require about 55 blocks (about 10 minutes) for the Appchain to be configured properly - you should wait for that before interacting with it.

![Appchain is ready](/img/quickstart-appchain-ready.png "Appchain is ready")

### Step 9: Your Appchain is ready

Congratulations, you now have your own Appchain running!

After running through the guide above, the CLI starts all of the required components automatically. Some of the main components are:
- Madara [sequencer](/components/nodes). Your node for receiving transactions and building blocks.
- [Orchestrator](/components/orchestrator). This manages a lot of the communications forward from your sequencer.
- A prover. This generates (mock) proofs for your blocks.
- A local Ethereum blockchain for settlement.

To ensure your chain runs properly, it's a good idea to [monitor](/quickstart/monitor_appchain) the Appchain.

## Summary

With the CLI it's easy to start your own Appchain. In the near future, we will post more guides on how to utilize and get familiar with your Appchain.



