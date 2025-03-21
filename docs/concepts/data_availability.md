---
sidebar_position: 8
---

# Data availability

## Overview

Appchains like Madara rely on an external settlement layer for security, but they must also ensure that all historical data remains accessible. Without access to this data, users cannot verify the chain’s state or recover assets in case of disputes.

Traditional blockchains store all transaction data directly on-chain, ensuring availability. However, this approach is costly and inefficient due to redundancy and high storage requirements. Since Appchains [settle](/concepts/settlement) to another chain, they have the flexibility to choose alternative ways of storing their data.

The system responsible for storing and ensuring access to this data is called the *data availability layer* (DA layer) and this challenge is generally known as the Data Availability (DA) problem. 

### Why is DA needed

Public, permissionless blockchains allow anyone to join the chain and verify its contents. Verification happens by replaying all transactions, executing them and making sure the resulting state matches what the blockchain claims.

For this process to work, all historical transactions and state updates must be accessible. Without data availability, users cannot independently verify the chain’s integrity. This is why solving the DA problem is essential for public blockchains.

## Responsibilities of a DA layer

The responsibilities are:
- Store the data.
- Provide public access to it.
- Be censorship-resistant: no single actor can withhold data.
- Provide guarantees that the data remains accessible.

## DA options

There are three general approaches for solving the DA problem:
1. Store the data on-chain.
1. Store the data elsewhere.
1. Don't store the data.

These are analyzed in more detail in the following sections.

### Option 1: Store data on-chain

The most straightforward approach is to store the data directly on the settlement layer (e.g., Ethereum) alongside transaction data. This ensures easy access to the data.

However, depending on the blockchain, on-chain storage can be very expensive. This can limit the types of built applications. But for use cases that do not require much data storage, this is an efficient and simple approach.

Most traditional blockchains store their data on-chain. A notable example is Ethereum.

#### Trust assumptions

This option introduces no extra trust assumptions: the users do not need to trust any external parties.

### Option 2: Store data elsewhere

The data can be stored in other locations. This location can be either a specialized DA layer or some generic file storage.

Specialized DA layers are, for example, [Celestia](https://celestia.org/) and [Avail](https://www.availproject.org).

Generic file storage can be a cloud storage or a decentralized solution like [IPFS](https://ipfs.tech/).

This general approach has two main problems:
1. The data can't be accessed directly on-chain.
1. How can you be certain the data remains available in its storage location.

The main benefit is cost-efficiency: off-chain storage is much cheaper and easier to manage than on-chain storage.

A notable example of the off-chain storage approach is with an approach called *Validium*. Data is stored off-chain and only proofs of its validity are posted on the settlement layer.

#### Trust assumptions

This option requires users to trust the DA layer. There are a few general ways of achieving this trust:
1. Social consensus. If many users successfully retrieve data over time, the DA layer is likely reliable. However, this is just an informal method.
1. Sampling. Use some mechanism to sample data from the DA layer periodically to make sure it retains the data.
1. Redundancy. Add redundancy to the stored data - if some data is lost, it can still be reconstructed.
1. Economic incentives. Use a model like staking where the DA layer loses assets if it fails to provide the right data.

### Option 3: Don't store the data

In some cases, storing all data may not be necessary. This can happen in the following scenarios:
1. The chain does not provide data availability guarantees, meaning users cannot independently verify its full history.
1. Historical data is periodically removed. Only minimal data is provided for enabling chain synchronization.

This approach can reduce storage costs but comes at the expense of verifiability and historical transparency.

#### Trust assumptions

This option requires users to trust the chain operators (nodes) that they operate the chain according to its rules. Since historical data is not stored, users cannot verify past transactions or state transitions.

Additionally, users may have no means of detecting ongoing fraud within the chain.

## Summary

Choosing the right DA solution is a trade-off between costs, security and verifiability.

Storing data on-chain is the most secure and verifiable option, but it is by far the most expensive one. Storing at least some of your data off-chain may be a viable option for your Appchain.

Currently, Madara uses the settlement layer as its DA layer, but support for other DA solutions will be added in the near future.

## Read more

- [Starknet docs](https://docs.starknet.io/architecture-and-concepts/network-architecture/data-availability/)
- [Starknet blogs](https://starkware.co/blog/rollup-validium-volition-where-is-your-data-stored/)