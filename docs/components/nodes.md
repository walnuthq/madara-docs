---
sidebar_position: 4
---

# Types of Nodes

## Overview

Running an Appchain requires multiple components to handle different aspects of the network. Nodes play a crucial role by maintaining blockchain state, synchronizing with other nodes, and providing access to users and applications.

## Node capabilities

Madara nodes have two primary capabilities:
- Full node. Maintains blockchain state and history.
- Sequencer. Participates in transaction ordering and block production.

The exact functionality of these capabilities is explained in the following sections.

### Full node

A full node stores the entire state of the blockchain and validates transactions.

Whenever the node receives new transactions and blocks, it validates them to make sure they follow the network's rules. Invalid data is not accepted.

#### Archive node

An archive node is a full node that retains all historical data needed to recreate any historical state.

Full nodes may sometimes be configured to prune old data to save disk space. Madara full nodes also act as archive nodes.

#### RPC API

Full nodes often expose a public-facing [RPC API](https://github.com/starkware-libs/starknet-specs/blob/master/starknet_vs_ethereum_node_apis.md). This can be utilized by users to access the Appchain - to submit transactions and to read the Appchain state.

A non-sequencer node forwards write transactions to a sequencer node but can still provide direct read access to the Appchain.

### Sequencer

A sequencer node is responsible for executing transactions and organizing them in a block. Transactions are typically received from full nodes. 

Each transaction is executed and included in a block by a sequencer if it passes the following conditions:
1. The transaction is valid according to the network rules.
1. The transaction is correctly ordered. Transactions that are sent from the same account are ordered by an incremental *nonce*. If a transaction is received out of order due to network latency, it will wait until transactions with a smaller nonce are processed from that account.
1. There is space left in the current block. A sequencer produces new blocks at fixed intervals, or sooner if the current block reaches maximum capacity. If there is not enough space in the current block for a new transaction, and the above conditions are met, then it will be added to the next block.

#### Mempool

A transaction is considered valid if it follows the network's rules. However, it may not fit in the current block and/or its nonce may be too high. These kinds of transactions are accepted by the sequencer, but are placed in a transaction queue.

This queue is also called the *mempool*.

#### Feeder gateway

A feeder gateway is a collection of endpoints at the node that can be turned on or off. These are typically enabled in a sequencer.

These endpoints offer access to raw Appchain data. Full nodes can call these endpoints to synchronize their network state - these endpoints are not meant for end users or developers.

Gateways will get deprecated once direct, peer-to-peer communication becomes available in the SN Stack.

The term *gateway* sometimes refers specifically to the feeder gateway endpoint used for submitting transactions to a sequencer.

#### Execution

The sequencer has to execute each transaction to generate data representing changes in the network state, referred to as *state diffs*.

Transactions are executed with a component called the *blockifier*.

## State updates and synchronization

A node receives new Appchain state information in three main ways:
1. From a sequencer, during synchronization (valid only for full nodes).
1. From users issuing transactions (valid only for sequencers - either through full nodes or directly).
1. From the settlement layer proof verification contract (valid only for sequencers).

Once you start a new node from scratch, it will start synchronizing its state from a sequencer. But synchronization also happens continuously during normal node operations when the full node receives new blocks from the sequencer and it updates its own state accordingly.

Furthermore, once the settlement layer's proof has been verified, the node updates its state accordingly.

## Decentralization efforts

Currently, Madara Appchains (and the [SN Stack](https://www.starknet.io/sn-stack/) in general) support only one sequencer. All full nodes synchronize their state initially from this sequencer.

In the near future, multiple sequencers will be supported. Peer-to-peer protocols are currently being implemented and full nodes will soon start to synchronize their state from other full nodes.

## Interacting with a node

Node clients are software that utilizes nodes. These can be divided in three categories:
1. Browser wallets
1. Command-line interfaces
1. SDKs

### Browser wallets

Several browser wallets exist for interacting with Madara Appchains and Starknet. They are built as browser extensions.

You can check the current options [here](https://www.starknet.io/wallets/).

### Command-line interfaces

Various developer tools exist to interact with Madara Appchains and Starknet. These tools are not beginner-friendly and are meant mostly for developers to quickly interact with the chain.

You can check the current options [here](https://docs.starknet.io/tools/devtools/interacting-with-starknet/).

### SDKs

These are various libraries and SDKs that allow developers to utilize nodes. They are typically embedded in other, larger systems that provide blockchain functionality for users.

## Read more

- [Starknet docs](https://docs.starknet.io/architecture-and-concepts/nodes/)