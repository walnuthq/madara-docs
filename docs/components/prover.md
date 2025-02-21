---
sidebar_position: 10
---

# Prover

## Overview

A prover is a program that generates cryptographic proofs of computation. What exactly is proved depends on the context.

In Madara, the prover calculates validity proofs for a block, providing mathematical guarantees of the block's correctness.

## Responsibilities

The responsibilities of a Madara prover are the following:
1. Generate valid proofs for the given input
1. Post the proofs to the Settlement Layer for verification

Generating a proof is an expensive operation, in terms of computational complexity and required hardware resources. Depending on the input size and proof complexity, generating a proof may take anything between a second and a day.

## Prover and verifier

The prover's job is to generate proofs. These proofs are, at some point, fed to a separate verifier program that validates them.

Typically, when one writes a prover program, they also generate a verifier program for it. One verifier can often verify proofs only from one prover program - the programs are tightly coupled.

## Proving process

Before the prover starts generating a proof for a block, the block's transactions are executed with a [Cairo](https://starkware.co/cairo/) program, through the [orchestrator](/components/orchestrator). This execution stores a record of all operations performed by the code - this record is usually called a *trace*.

Once the trace is generated, the prover should complete these steps for each block:
1. It receives the trace and other metadata as input.
1. It calculates a cryptographic proof for the block.
1. It submits the proof to the settlement layer for verification.

A valid proof for a trace proves at least that:
1. The trace followed all of the network's rules. For example, a smart contract is only allowed to modify its own storage.
1. The network state after the block's execution is correctly derived from both the previous state and the trace execution.
1. Every transaction in the block was executed exactly once and in the correct order.

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
1. Audit the verifier's code to ensure correctness. This is very costly.
1. Social consensus. Once enough users have used the verifier for long enough with no problems users start to trust it.

## Prover options

In theory, one can use any ZK prover that accepts inputs in the desired format. However, most provers do not have the needed tooling available.

Madara highly encourages using a prover that is compatible with existing tooling. Currently the main, compatible prover is called [Stone](https://github.com/starkware-libs/stone-prover). Other prover options are being built but are not yet ready, such as [Stwo](https://github.com/starkware-libs/stwo).

Starknet has also a shared proving service called [SHARP](https://starkware.co/blog/joining-forces-sharp/) but it is currently not integrated into Madara.

To utilize the Stone prover, it's easiest to use a service called [Atlantic](https://atlanticprover.com/). The service also posts the ready proofs to the [settlement layer](/concepts/settlement) automatically. Madara suggests Atlantic when starting an [Appchain](/concepts/appchain).

## Read more

- https://ethereum.org/en/zero-knowledge-proofs/
- [Starknet docs](https://docs.starknet.io/architecture-and-concepts/provers-overview/)