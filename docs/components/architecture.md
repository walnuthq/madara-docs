---
sidebar_position: 2
---

# Architecture

```mermaid
sequenceDiagram

 
    actor User
    participant Node as Full node
    participant Sequencer as Madara (Sequencer)
    participant Orchestrator
    participant SNOS as Starknet OS (SNOS)
    participant Prover
    box Blue Settlement layer
        participant Verifier as Verifier contract
        participant Core as Core Contract
    end
    participant DA as Data Availability Layer

    User ->> Node: Send transaction (tx)
    Node ->> Node: Validate tx
    Node ->> Sequencer: Forward transaction

    Sequencer ->> Sequencer: Tx status: RECEIVED
    Sequencer ->> Sequencer: Validate tx
    rect rgb(100, 0, 0)
        break Invalid tx
            Sequencer -x Sequencer: Tx status: REJECTED. Stop processing. 
        end
    end

    Sequencer ->> Sequencer: Execute tx
        alt Fails execution
Sequencer ->> Sequencer: Tx status: REVERTED
    else Succeeds
        Sequencer ->> Sequencer: Tx status: ACCEPTED ON L2
    end
    Sequencer ->> Sequencer: Generate state diff
    rect rgb(100, 0, 0)
        alt No space in block or tx nonce too high
            Sequencer ->> Sequencer: Add tx to mempool. Stop processing.
        else
            Sequencer ->> Sequencer: Add tx to pending block
        end
    end
    
    Sequencer ->> Sequencer: Wait for block to be full or enough time has passed

    Orchestrator ->> Sequencer: Ask for new, ready block (poll)
    Sequencer ->> Orchestrator: Send new, ready block

    Orchestrator ->> SNOS: Ask for proof input (PIE)
    SNOS ->> Sequencer: Query block data, transactions, state diffs, state roots
    Sequencer ->> SNOS: Return requested data
    SNOS ->> Orchestrator: Return PIE
    
    Orchestrator ->> Prover: Send PIE for proving
    Prover ->> Prover: Generate proof
    Prover ->> Verifier: Send proof for verification
    Verifier ->> Verifier: Verify proof and store it in fact registry
    Verifier ->> Orchestrator: Proof verification result
    Orchestrator ->> Core: Ask to update its state
    Core ->> Verifier: Retrieve new, verified block info
    Verifier ->> Core: Return new, verified block info

    Sequencer ->> Core: Poll for new, accepted blocks (proofs)
    Core ->> Sequencer: Latest accepted block number
    
    Sequencer ->> Sequencer: Update status of all txs in block to ACCEPTED_ON_L1
    Sequencer ->> Sequencer: Finalize block, broadcast it
```


A Madara [Appchain](/concepts/appchain) consists of the following components:
- An [orchestrator](/components/orchestrator)
- A sequencer
- Starknet OS (SNOS)
- A prover
- A [settlement layer](/concepts/settlement)

Note that some components are left out, for now, for simplicity.

## Transaction flow

When a user issues a transaction it goes through the components in the following way:
1. The transaction is received by the sequencer
1. The sequencer executes the transaction and generates a state diff (depicting what state changes the transaction causes in the blockchain)
1. The sequencer waits until enough transactions have been received to assemble a block
1. Meanwhile, the Orchestrator polls the sequencer for new, unprocessed blocks
1. Once a new, unprocessed block is available, a request is sent to SNOS to process the block number
1. SNOS queries the sequencer for block data (transactions, state diff, old state root, new state root), based on the block number
1. The sequencer returns block data for the SNOS
1. The SNOS generates and sends validity proof input for the orchestrator
1. The orchestrator forwards the validity proof inputs to the prover
1. The prover generates a validity proof and forwards this to the settlement layer verifier contract
1. The orchestrator monitors the verifier contract for block verification
1. Once the block has been verified, the orchestrator requests the settlement layer's core contracts to update the network state
1. The sequencer monitors the core contracts for a new, updated state and updates its own state accordingly

```mermaid
sequenceDiagram

    participant Sequencer as Madara (Sequencer)
    participant Orchestrator
    participant SNOS as Starknet OS (SNOS)
    participant Prover
    participant Verifier as Settlement Layer

    Note over Sequencer: Madara in Sequencer mode (Solo chain) does not need SNOS.

    Sequencer ->> Sequencer: Execute transactions & generate state diff
    Sequencer ->> Sequencer: Assemble block

    Orchestrator ->> Sequencer: Get unprocessed block

    Orchestrator ->> SNOS: Ask for proof input
    SNOS ->> Sequencer: Query block data, transactions, state diffs, state roots
    Sequencer ->> SNOS: Return requested data
    SNOS ->> Orchestrator: Return proof input
    
    Orchestrator ->> Prover: Send proof input for proving
    Prover ->> Verifier: Send proof for verification
    Verifier ->> Orchestrator: Proof verification result

    Orchestrator ->> Verifier: Update state
    Verifier ->> Sequencer: Latest accepted block number

    Sequencer ->> Sequencer: Update state and finalize block ✅
```
