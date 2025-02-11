---
sidebar_position: 16
---

# Prover

## Overview

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