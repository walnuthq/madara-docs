---
sidebar_position: 1
# description: 'Madara is an open source stack that allows you to build app chains powered by Cairo and Starknet technology'
---

# Architecture

A Madara blockchain consists of the following components:
- An orchestrator
- A sequencer
- Starknet OS (SNOS)
- A prover
- A settlement layer

Note that some components are left out, for now, for simplicity.

## Transaction flow

When a user issues a transaction it goes through the components in the following way:
1. The transaction is received by the orchestrator
1. The orchestrator assigns the transaction to the sequencer
1. The sequencer executes the transaction and generates a state diff (depicting what state changes the transaction causes in the blockchain)
1. The sequencer waits until enough transactions have been received to formalize a block
1. The sequencer assigns "Accepted in L2" status to all of the block's transactions
1. Meanwhile, the Orchestrator requests proof inputs from the Starknet OS (SNOS)
1. When receiving such request, the SNOS starts polling the sequencer for a ready block and its related data
1. Once the block data has been handed to SNOS, it generates input for the validity proof for the orchestrator
1. The orchestrator forwards the proof inputs to the prover
1. The prover generates a validity proof and forwards this to the settlement layer verifier contract
1. The orchestrator monitors the verifier contract and finalizes the block if the proof is valid.

```mermaid
sequenceDiagram

    participant Orchestrator
    participant Sequencer as Madara (Sequencer)
    participant SNOS as Starknet OS (SNOS)
    participant Prover
    participant L1_Verifier as L1 Settlement Layer Verifier

    Note over Sequencer: Madara in Sequencer mode (Solo chain) does not need SNOS.

    Orchestrator ->> Sequencer: Receive transactions
    Sequencer ->> Sequencer: Execute transactions & generate state diff
    Sequencer ->> Sequencer: Assemble block
    Sequencer ->> Sequencer: Add block to L2 (Accepted in L2)

    Orchestrator ->> SNOS: Request proof for block N
    SNOS ->> Sequencer: Query block data, transactions, state diffs, state roots
    Note over SNOS, Sequencer: (If storage proof is needed, query Pathfinder)
    SNOS ->> Orchestrator: Generate proof input
    Orchestrator ->> Prover: Forward proof input for proving
    Prover ->> L1_Verifier: Send proof for verification
    L1_Verifier ->> Orchestrator: Proof verification result
    Orchestrator ->> Orchestrator: Finalize block if valid

```
