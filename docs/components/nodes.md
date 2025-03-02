---
sidebar_position: 4
draft: true
---

# Types of Nodes

## Overview

Running an Appchain involves significant computational and operational effort. This workload is distributed across various components.

Nodes help manage this workload by facilitating network synchronization and providing client access.

## Node capabilities

Madara nodes can be categorized based on three main capabilities:
| Capability | Description |
|------------|-------------|
| **Full Node** | Maintains complete blockchain state and history |
| **Sequencer** | Participates in transaction ordering and block production |
| **Gateway** | Exposes synchronization endpoints for other Madara nodes to connect and sync from |

The exact functionality of the capabilities is explained a bit later. Any of these can be either turned on or off, which results in the following variants:

| Full Node | Sequencer | Gateway | Explanation |
|:---------:|:---------:|:-------:|------------------|
| ✅        | ✅        | ✅      | A full sequencer node. |
| ✅        | ✅        | ❌      | A sequencer node for block production. |
| ✅        | ❌        | ✅      | A typical full node. |
| ✅        | ❌        | ❌      | A typical archive node. |
| ❌        | ✅        | ✅      | A limited sequencer node. No real use. |
| ❌        | ✅        | ❌      | No real use. |
| ❌        | ❌        | ✅      | No real use. |
| ❌        | ❌        | ❌      | No real use. |

### Full node

A full node stores the entire state of the blockchain and validates transactions.

#### Archive node

An archive node is a full node that retains all historical data. 

Full nodes may sometimes be configured to prune old data to save disk space. By default, full nodes are also archive nodes.

### Sequencer



### Gateway

### Public-facing API

Furthermore, nodes may or may not expose a public-facing RPC API. This can be utilized by users to access the Appchain - to submit transactions and to read the Appchain state.

A non-sequencer node forwards transactions to a sequencer node, but can provide direct read access to the Appchain.



### Responsibilities

Different node types have different responsibilities.

A full node:
1. Shares state and updates to it to other full nodes



- Receives txs from gateway
- Executes txs and updates the blockchain state
- Forms blocks
- Responds to JSON-RPC queries
- Updates blocks based on work from other components (mostly settlement layer proof verification)
- Interacts with the orchestrator, offloading a lot of communications to it


- What is a node client
- What does it mean to run a node
- Often includes own account contract implementation
- One of the main components handling txs and blockchain data
- Main entity providing blockchain data for external parties (such as SNOS and users)

### Node types

- Full node, light client (only beerus which is inactive), archive node
- A few words on hardware requirements in general
- What node variants does Madara offer (only full node, don't think sequencer counts as a node client)
- gateway can be on or off

### Available node clients

- Browser: Argent, Braavos
- List some CLI tools

## Responsibilities



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