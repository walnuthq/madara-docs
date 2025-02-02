---
sidebar_position: 2
---

# Architecture

## Overview

A Madara blockchain consists of the following components:
- A gateway
- A sequencer
- An orchestrator
- Nodes
- Starknet OS (SNOS)

Furthermore, the following parties should be present:
- Users issuing transactions
- A data availability layer
- A settlement layer
- A prover

## Transaction flow

When a user issues a transaction it goes through the components in the following way:
1. The transaction is received by the gateway and is forwarded to the orchestrator
1. The orchestrator assigns the transaction to the sequencer
1. The sequencer executes the transaction using Starknet OS (SNOS), which generates an execution trace and state diffs (depicting what state changes the transaction caused in the blockchain)
1. The sequencer adds the transaction to a block
1. The sequencer publishes the block's transaction data and state diffs to a Data Availability (DA) layer.
1. Once a block is ready, the sequencer forwards it and its execution trace to a prover
1. The prover generates a cryptographic proof of correctness of the block. 
1. The proof is sent to the L1 Settlement Layer verifier contract for verification.
1. The orchestrator monitors the L1 verifier contract and finalizes the block, if the proof is valid.

TODO: add a flowchart for the above

