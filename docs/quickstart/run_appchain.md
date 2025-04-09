---
sidebar_position: 7
---

# Run a local Appchain

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

You should start by installing the main tool for running Madara, the Madara Command Line Interface (CLI):
```bash
git clone https://github.com/madara-alliance/madara-cli.git
cd madara-cli
```

The above will clone the repository into a new folder and enter it.

### Step 2: Start the Appchain

Next, in the `madara-cli` folder, run the following command to start the Madara CLI that will setup the Appchain:

```bash
cargo run create app-chain
```

### Step 3: Wait for the Appchain to be configured

It will require about 55 blocks (about 10 minutes) for the Appchain to be configured properly - you should wait for that before interacting with it.

> ![Appchain is ready](/img/pages/quickstart-appchain-ready.png "Appchain is ready")

### Step 4: Your Appchain is ready

Congratulations, you now have your own Appchain running!

After running through the guide above, the CLI starts all of the required components automatically. Some of the main components are:
- A Madara [sequencer](/components/nodes). Your node for receiving transactions and building blocks.
- An [orchestrator](/components/orchestrator). This manages a lot of the communications forward from your sequencer.
- A mock [prover](/components/prover). This generates mock proofs for your blocks.
- A local Ethereum blockchain for settlement.

Next, you should try [interacting](use_appchain) with your Appchain. Furthermore, to  ensure your chain runs properly, it's a good idea to [monitor](/advanced/monitor_appchain) the Appchain. 



