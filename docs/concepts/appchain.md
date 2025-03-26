---
sidebar_position: 4
---

# Appchain

The term Appchain is short for Application Chain. As the name suggests, an Appchain is a blockchain built for a single application or a limited number of applications.

An Appchain is built on top of some existing blockchain. Madara's Appchains run on top of either Starknet or Ethereum and settle their transactions there, for added security.

## Components

An Appchain is formed by multiple components. In Madara, the main components are:
- A gateway. Receives user transactions and forward these to a sequencer.
- A sequencer. Forms blocks of transactions and provides access to the blockchain for users.
- An [orchestrator](/components/orchestrator). Coordinates communication between entities.
- A prover. Generates cryptographic proofs of a block's validity.
- A verifier. Verifies generated proofs.
- A [settlement layer](/concepts/settlement). Records verified proofs and their data, providing security for the Appchain.

## Why use an Appchain

What are the benefits of running an Appchain and why should you care?

### Your chain with your own rules

Modern, major blockchains are secure. But they are typically expensive to use and have a lot of limitations.

When you start an Appchain, you can have very different cost tradeoffs. You can optimize the Appchain to suit your specific performance requirements.

The absolute minimum requirements for an Appchain are to run a single sequencer and nothing else. Such a chain may be useful for quick experimentation but includes zero security and is maximally centralized. But here again you are free to choose what you require.

## Settling transactions and security

Appchains typically inherit security from the underlying, secure blockchain, by settling transactions on it. For Madara, this blockchain is either Ethereum or Starknet.

For Starknet, the underlying blockchain is Ethereum. In this setting, Starknet is called a Layer 2 (L2) blockchain, while Ethereum is Layer 1 (L1). It's also equally possible to create an Appchain on top of Starknet - then your new layer becomes a L3 and your transactions are settled on Starknet L2, which again settles transactions on Ethereum L1.

### Settling when Madara is used as L2

The following diagram shows how settlement works when Madara is used as an L2 Appchain that settles on Ethereum. This is the default configuration.

```mermaid
sequenceDiagram
    participant User as Users & Apps
    participant L2 as Madara (L2)
    participant L1 as Ethereum (L1)

    User ->> L2: Executes transactions & interacts with the Appchain
    L2 ->> L1: Settles blocks for finalization & security
```

### Settling when Madara is used as L3

In the near future, Madara can also be used as an L3 (or any layer beyond 2) Appchain. The below diagram shows how settlement works when Madara is used as an L3 settling on Starknet L2.

```mermaid
sequenceDiagram
    participant User as Users & Apps
    participant L3 as Madara (L3)
    participant L2 as Starknet (L2)
    participant L1 as Ethereum (L1)

    User ->> L3: Executes transactions & interacts with the Appchain
    L3 ->> L2: Settles blocks for finalization & security
    L2 ->> L1: Finalizes Starknet blocks
```

### Transaction flow

A transaction in an Appchain follows the following flow:
1. It's received by a sequencer.
1. It's included in a block.
1. A cryptographic proof of validity is generated for the block.
1. This proof, along with a record of the new blockchain state, is sent to the underlying blockchain for verification.
1. The proof is verified. If the verification passes, the block is considered valid and nodes in the Appchain consider the corresponding block finalized.

Once the block with our transaction is verified in the underlying blockchain, the transaction is considered settled - its validity is stored in the blockchain.

You can check the full transaction flow in the [architecture page](/components/architecture).

### Escape hatch mechanism

Appchains can be insecure. They may be centralized and unstable.

What happens to your assets inside the Appchain if the Appchain simply disappears overnight? This is where we begin to understand the value of settling the transactions and how the underlying blockchain provides security.

Because the underlying blockchain has verified the transaction's validity and knows the overall state of the Appchain, it's possible to prove transactions (and therefore, your assets) in the underlying blockchain - even if the Appchain no longer exists. What happens next depends on how the asset was created in the Appchain:

1. If the asset was originally bridged from the underlying blockchain to the Appchain, you can recover the original asset in the underlying chain in the original asset contract address.
1. If the asset originated in the Appchain and never existed in the underlying blockchain, you can still regain it in a new address and prove that it was part of the Appchain state. Depending on the case, it may be, however, difficult to convince others that the asset has any value or usage.

This mechanism of recovering assets in the underlying chain is called the escape hatch mechanism. This is how the Appchain inherits security - it gains security guarantees from the underlying blockchain.

### Security

Because of the possibility to recover assets in the underlying chain, it is much safer to use a new Appchain than a new, independent blockchain. 

However, everyone is still accountable for their own assets in the Appchain: if you lose your assets by, for example, doing bad trades, you can't just escape to the underlying blockchain with an older state. Only the latest state is valid for recovery.

Therefore, you still have to maintain proper wallet security, just like in any blockchain.

## Also known as ZK rollups or Validity rollups

Appchains are also known as rollups. They batch transactions and "roll them up" to the underlying blockchain. In the case of Madara, these rollups utilize Zero Knowledge technology, and are therefore sometimes called ZK rollups.

### ZK is misleading

However, the term "Zero Knowledge" is rather misleading. In academic circles, it refers to strict privacy properties, where the receiver of a ZK proof learns nothing about the underlying data (the transactions and blocks) except that they're valid, according to the system's rules.

Madara's Appchains (just like Starknet itself) do not, however, provide such privacy properties. They only utilize the same ZK technology, without implementing the actual ZK properties. This is why the term ZK rollup is avoided, even if it has become popular in certain circles.

The preferred term for this kind of a rollup is `Validity rollup` - it proves the validity of some data while still rolling up the data.

## How to start

It requires work and know-how to start an Appchain. Madara makes the process much smoother, but you still need to understand what you are doing - and what you want to be doing.

You should start by familiarizing yourself with running an Appchain locally, with Madara. Understand how the components work together and learn to configure them to suit your needs. Later, we will post detailed guides on how to start your Appchain and on how to configure it.