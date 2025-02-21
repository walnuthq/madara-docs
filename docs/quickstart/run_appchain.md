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

## Install Madara CLI and run the appchain

Go run the [local chain](/quickstart/run_localchain) guide. When prompted for "Madara mode", instead of choosing `Devnet` choose `Appchain`.

After you've chosen `AppChain`, the CLI will ask to choose the prover. You should choose `Dummy` - this will essentially skip proving transactions completely.

Congratulations, you now have your own Appchain running!

## A deeper look at the started processes

Next we'll go through some of the components in more detail, to better understand what was started and why.

### What is started

The CLI starts all of the required components automatically. Some of the main components are:
- Madara sequencer. Your node for receiving transactions and building blocks
- [Orchestrator](/components/orchestrator). This manages a lot of the communications forward from your sequencer
- A mock prover. This generates (mock) proofs for your blocks. This is explained in more detail below.
- A local Ethereum blockchain. This is the settlement layer used for your Appchain. This is explained in more detail below.

### Prover

The prover is responsible for calculating cryptographic validity proof for a block, providing mathematical guarantees of the block's correctness. Generating such a proof is a very heavy mathematical computation.

In this guide we used a mocked prover. This means the proving part is not performed for real, but only a mock proof is utilized. This means that the component verifying the proof is also a mocked verifier.

For a real Appchain, a real prover is needed. Currently, you can utilize [Atlantic](https://atlanticprover.com/), but more options will be available later.

### Settlement layer

All of our Appchain's transactions are secured by another, underlying blockchain. This other chain is called the settlement layer.

The settlement layer is used to secure the Appchain. If, for whatever reason, the Appchain stops functioning, all of its assets can be recovered in the settlement layer.

Running an Appchain with the CLI sets up an Ethereum blockchain as the settlement layer.

## Summary

With the CLI it's easy to start your own Appchain. In near future we will post more guides on how to utilize and get familiar with your Appchain, but for now you can start by inspecting the logs of the Appchain to understand what is being run.



