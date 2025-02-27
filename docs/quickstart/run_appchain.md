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

Go run the [devnet](/quickstart/run_devnet) guide. When prompted for "Madara mode", instead of choosing `Devnet` choose `Appchain`.

After you've chosen `AppChain`, the CLI will ask to choose the [prover](/components/prover). You should choose `Dummy` - this will essentially skip proving transactions completely.

Congratulations, you now have your own Appchain running!

### Prover

A real prover is responsible for calculating cryptographic validity proof for a block, providing mathematical guarantees of the block's correctness. Generating such a proof is a very heavy mathematical computation.

For a real Appchain, a real prover is needed. Currently, you can utilize [Atlantic](https://atlanticprover.com/), but more options will be available later.

## What is started

The CLI starts all of the required components automatically. Some of the main components are:
- Madara sequencer. Your node for receiving transactions and building blocks
- [Orchestrator](/components/orchestrator). This manages a lot of the communications forward from your sequencer
- A prover. This generates (mock) proofs for your blocks.
- A local Ethereum blockchain. This is the settlement layer used for your Appchain. Running an Appchain with the CLI sets up an Ethereum blockchain as the settlement layer.

## Summary

With the CLI it's easy to start your own Appchain. In near future we will post more guides on how to utilize and get familiar with your Appchain, but for now you can start by inspecting the logs of the Appchain to understand what is being run.



