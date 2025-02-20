---
sidebar_position: 10
draft: true
---

# Prover

## Overview

A prover is a program that generates cryptographic proofs of computation. What exactly is proved depends on the context.

In Madara, the prover calculates cryptographic validity proof for a block, providing mathematical guarantees of the block's correctness.

## Responsibilities

## Prover and verifier

## Security

The used provers are built with Zero Knowledge technology. Such provers have the following basic characteristics:
- A correctly implemented prover can't generate invalid proofs
- A correctly implemented verifier doesn't accept invalid proofs
- It is not possible to modify a valid proof to prove things it shouldn't prove

### How immutability helps

In the end, a lot of the security depends on correct implementations of the prover and verifier.

## Prover options



- Calculates cryptographic validity proof for a block, providing mathematical guarantees of the block's correctness
- Proving is an expensive and lengthy operation
- The actual size of the block to be proven affects the proving costs, but not as much as one might imagine

### Prover options

- Currently the only option is Atlantic which runs a Stone prover
- What options will be available in near future? Local proving at least?
- Note that only Atlantic sends the proofs automatically to SL

## Responsibilities

- Generate validity proofs for blocks
- Post proofs to SL (if using Atlantic) for verification

## Read more

- Github links
- Starknet docs
- General articles about prover/verifier interaction
- Any other relevant links?