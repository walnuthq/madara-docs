---
sidebar_position: 4
---

# Appchain

## Overview

- A L3 (or L4, ...) scaling solution: moves computation off-chain
- Explain the role of L2 and L1 here
- Transactions are batched and then 'summarized'
- Explain prover/verifier cooperation
- Blocks are accepted based on verified proofs

## Why an appchain

- Provides custom features / customization for a chain
- Own rules, own tradeoffs
- Examples: decentralization tradeoffs, different performance, different consensus, different progamming capabilities, ...

## Components of an appchain

- What components are typically required (or with Madara)
- Which components are optional and which not
- Shortly: what do the components do. Link to component pages

## Also known as a ZK-rollup

- Also known as a Zero Knowledge rollup (but explain a bit why that term is misleading)

## Appchain rollup security

- Mathematics guarantees integrity. No invalid state transitions possible
- Malicious actors can only censor
- Escape hatch: users can always (in theory) bypass all components and reclaim assets on the SL

## Requires work

- It needs work to start and configure an appchain
- Madara helps with all of that
- Requires ongoing maintenance (updates, component failures, monitoring, ...)

## Read more

- Starknet docs
- https://ethereum.org/en/developers/docs/scaling/zk-rollups/
- Any other relevant links?