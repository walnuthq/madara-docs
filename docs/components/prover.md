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

Generating a proof is an expensive operation, in terms of computational complexity and required hardware resources.

## Security

The used provers are built with Zero Knowledge technology. Such provers have the following basic characteristics:
- A correctly implemented prover can't generate invalid proofs
- A correctly implemented verifier doesn't accept invalid proofs
- It is not possible to modify a valid proof to prove things it shouldn't prove

### How immutability helps

In the end, a lot of the security depends on correct implementations of the prover and verifier.

The verifier program is often deployed on a blockchain to be immutable. This brings a few benefits:
1. The code can't be changed
1. Everyone knows they are using the same verifier program

Verifying that the on-chain verifier does what it should do is generally achieved in one of two ways:
1. Audit the verifier. This is very costly.
1. Social consensus. Once enough users have used the verifier for long enough with no problems users start to trust it.

## Prover options



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