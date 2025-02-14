---
sidebar_position: 4
draft: true
---

# Types of Nodes

## Overview

- What is a node client
- What does it mean to run a node
- Often includes own account contract implementation
- One of the main components handling txs and blockchain data
- Main entity providing blockchain data for external parties (such as SNOS and users)

### Node types

- Full node, light client, archive node
- A few words on hardware requirements in general
- What node variants does Madara offer (only full node, don't think sequencer counts as a node client)

### Available node clients

- Browser: Argent, Braavos
- List some CLI tools

## Responsibilities

- Receives txs from gateway
- Executes txs and updates the blockchain state
- Forms blocks
- Responds to JSON-RPC queries
- Updates blocks based on work from other components (mostly settlement layer proof verification)
- Interacts with the orchestrator, offloading a lot of communications to it

### Blockifier

- Executes transactions in CairoVM (or in SNOS?)
- Aware of the blockchain state: execute tx with that
- Creates state diffs and blocks

### How to decide the amount of txs in a block

- More txs in a block means cheaper per-tx costs, but longer wait times (explain why)
- The costs can be subsidied so wait times stay reasonable

## Read more

- Github links
- Starknet docs
- Any other relevant links?