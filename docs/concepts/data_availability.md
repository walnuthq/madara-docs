---
sidebar_position: 8
---

# Data availability

## Overview

Every blockchain must store its state and state updates. In traditional blockchains, this data is stored directly on-chain.

However, on-chain storage is costly and inefficient due to redundancy and high resource requirements. Still, the data has to remain available to ensure anyone can verify the blockchain’s correctness.

The system responsible for storing and ensuring access to this data is called the *data availability layer* and this challenge is generally known as the Data Availability (DA) problem.

Appchains like Madara are not an exception to this and also need to consider their DA approach.

### Why is DA needed

Public, permissionless blockchains allow anyone to join the chain and verify its contents. Verification happens by replaying all transactions, executing them and making sure the resulting state matches what the blockchain claims.

For this process to work, all historical transactions and state updates must be accessible. Without data availability, users cannot independently verify the chain’s integrity, making it vulnerable to fraud and centralization risks. This is why solving the DA problem is essential for public blockchains.

## DA options

There are three general approaches for solving the DA problem:
1. Store the data on-chain
1. Store the data elsewhere
1. Don't store the data

These are analyzed in more detail in the following sections.

### Option 1: Store data on-chain

The most straightforward approach is to store the data directly on-chain alongside transaction data. This ensures easy access to the data.

However, depending on the blockchain, on-chain storage can be very expensive. This can limit the types of built applications. But for use cases that do not require much data storage, this is an efficient and simple approach.

### Option 2: Store data elsewhere

The data can be stored in other locations. This location can be either a specialized DA layer or some generic file storage.

Specialized DA layers are, for example, [Celestia](https://celestia.org/) and [Avail](https://www.availproject.org).

Generic file storage can be a cloud storage or a decentralized solution like [IPFS](https://ipfs.tech/).

This general approach has two main problems:
1. The data can't be accessed directly on-chain
1. How can you be certain the data remains available in its storage location

The main benefit is cost-efficiency: off-chain storage is much cheaper and easier to manage than on-chain storage.

### Option 3: Don't store the data

In some cases, storing all data may not be necessary. This can happen in the following scenarios:
1. The chain does not provide data availability guarantees, meaning users cannot independently verify its full history.
1. Historical data is periodically removed and only minimal data is provided for enabling chain synchronization.

This approach can reduce storage costs but comes at the expense of verifiability and historical transparency.



-onchain
- offchain
- hybrid

### Providers

- Ethereum
- External (celestia, eigenda, avail)

Data availability

- What is the data availability problem in general
- Stores the actual data used in transactions
- The data is needed for escape hatch
- Does not need to be a blockchain
- Sequencer submits data to the chosen DA

## Responsibilities

- Store data, in some accessible format
- Provide guarantees that needed data is retained
- Provide correct data upon request

## Typically used DAs

- A real blockchain costs more
- A regular blockchain: Ethereum, Starknet
- Specialized ones: Celestia, EigenDA, Avail, ...

## Trust assumptions

- How trustless is the chosen DA
- Different options have different trust assumptions. Give some examples
- Remember that the prover does not prove anything about data availability

## Read more

- Github links
- Starknet docs
- Any other relevant links?