---
sidebar_position: 3
---

# Run a local appchain

## Overview

This guide will help you run an [Appchain](/concepts/appchain) with Madara.

The deployed components are only available locally and are meant for testing purposes.

### What is an Appchain

An Appchain is a blockchain built for a single purpose. It runs all of the required components of a real blockchain, but is meant to serve a single use case. This is unlike general-purpose blockchain that are meant for a variety of use cases.

Furthermore, an Appchain is typically built on top of some existing blockchain. Madara's Appchains run on top of either Starknet or Ethereum and [settle](/concepts/settlement) their transactions there, for added security.

## Run the appchain locally

TODO: This section will walk you through setting up appchain step-by-step. Check hardware requirements. Maybe one more sentence.

### Step 1: Install Madara CLI and run your Appchain

Follow steps 1-X in the [devnet](/quickstart/run_devnet) guide. After you run the CLI, you will be prompted for the "Madara mode". Instead of choosing `Devnet` choose `Appchain`.

### Step 2: Select the Prover

The CLI will next ask to choose the [prover](/components/prover). There are multiple options:

1. Dummy - skips proving
2. Atlantic - info
3. Something - info

For now, select Dummy. We will soon update this docs with more info.

### Step 3: Select the Settlement (coming soon)

When running your appchain, selecting settlement is an important consideration.

At the moment, the CLI will do X when it comes to settlement. We will soon update it to do Y.

### Step 4: Monitor your appchain

Congratulations, you now have your own Appchain running!

After running through the guide above, the CLI starts all of the required components automatically. Some of the main components are:
- Madara sequencer. Your node for receiving transactions and building blocks
- [Orchestrator](/components/orchestrator). This manages a lot of the communications forward from your sequencer
- A prover. This generates (mock) proofs for your blocks.
- A local Ethereum blockchain. This is the settlement layer used for your Appchain. Running an Appchain with the CLI sets up an Ethereum blockchain as the settlement layer.

To ensure your chain runs properly, it's a good idea to setup some monitoring. For that check THIS guide (link).

## Summary

With the CLI it's easy to start your own Appchain. In near future we will post more guides on how to utilize and get familiar with your Appchain, but for now you can start by inspecting the logs of the Appchain to understand what is being run.



