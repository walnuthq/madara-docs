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

Whenever the node receives new transactions and blocks it validates them to make sure they follow the network's rules. Invalid data is not accepted.

#### State updates

TODO: who executes? Who gets state updates and how

TODO: add state updates based on L1 proof verification

#### Archive node

An archive node is a full node that retains all historical data. 

Full nodes may sometimes be configured to prune old data to save disk space. By default, full nodes act also as archive nodes.

### Sequencer

A sequencer node is responsible for executing transactions and organizing them in a block.

Transactions are received from full nodes. If the sequencer acts also as a full node, it may receive new transactions directly from users.

Once a new transaction is received, the sequencer executes it. After that, the transaction is added to a pending block.

#### Execution

Transactions are executed in two different ways, depending on whether we are running a full Appchain or a solo chain / devnet.

In an Appchain, transactions are executed with [SNOS](/components/starknet_os). In a devnet, a component called blockifier is used.

```mermaid
graph LR;
  A[Transaction] --> B{Appchain Mode?};
  
  B -- Yes --> C[SNOS];
  C --> E[Apply State Changes];
  E --> F[Execution Result];

  B -- No --> G[Blockifier];
  G --> E;
```

Blockifier does simple transaction execution to calculate the state changes. On the other hand, SNOS provides much more data related to [proving](/components/prover). A devnet doesn't utilize a prover and can therefore utilize the simpler approach.

### Gateway

A gateway is a collection of endpoints at the node. 

These endpoints offer access to raw Appchain data. Other full nodes can call these endpoints to synchronize their network state - these endpoints are not meant for end users or developers. 

Gateways will get deprecated once direct, peer to peer communication becomes available in the SN Stack.

Sometimes the term *feeder gateway* (or *fgw*), is used. This is the same as *gateway*.

### Public-facing API

Furthermore, nodes may or may not expose a public-facing [RPC API](https://github.com/starkware-libs/starknet-specs/blob/master/starknet_vs_ethereum_node_apis.md). This can be utilized by users to access the Appchain - to submit transactions and to read the Appchain state.

A non-sequencer node forwards transactions to a sequencer node but can provide direct read access to the Appchain.







- Updates blocks based on work from other components (mostly settlement layer proof verification)
- Interacts with the orchestrator, offloading a lot of communications to it


- What does it mean to run a node
- Often includes own account contract implementation
- One of the main components handling txs and blockchain data
- Main entity providing blockchain data for external parties (such as SNOS and users)

### Node types

- Full node, light client (only beerus which is inactive), archive node
- A few words on hardware requirements in general

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