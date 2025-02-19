---
sidebar_position: 6
draft: true
---

# Settlement Layer (SL)

## Overview

A settlement layer is a blockchain where transactions are settled from an [Appchain](/concepts/appchain).

- A regular blockchain mainly used for totally unrelated purposes
- Some secure blockchain
- Contains smart contracts that contain a ZK verifier for proofs generates by the prover

## Responsibilities

- Contains a smart contract verifier to verify the ZK proofs generates by the prover
- Record info of successfully verified proofs into storage
- Contains core contracts (add link) for recording the latest state after verified proofs
- This state enables users to forcibly withdraw their funds (escape hatch mechanism)

## Typically used blockchains

- Use a main L1 that supports smart contracts (Ethereum, Solana)
- Or use a different layer if building Appchain
- Could even use multiple SLs, but this opens up various questions

## Notes

- Escape hatch mechanism
- Which assets can be recovered in the SL. Does it make sense to recover non-bridged ones.

## Read more

- Github links
- Starknet docs
- Any other relevant links?