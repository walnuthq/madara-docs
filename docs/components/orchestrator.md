---
sidebar_position: 8
draft: true
---

# Orchestrator

## Overview

The orchestrator in a Madara Appchain is responsible for coordinating communication between the sequencer, prover and settlement layer. It can be considered as an extension to the sequencer: it offloads a lot of the communication complexities, making the sequencer lighter.

## Responsibilities

The orchestrator has four main responsibilities:

1. SNOS communication. Asks SNOS to process ready blocks and retrieve results.
1. Proof coordination. Sends the required data to the prover and monitors for ready proofs.
1. DA communication. Submits data for Data Availability Layer (currently Ethereum or Starknet).
1. SL communication. Submits data for Settlement Layer: proofs and state updates.

All of the responsibilities are handled through a individual queues: jobs enter the appropriate queue and are processed in the order they arrived.

### Communication

- Acts as a sort of an indirect relayer between sequencer and SNOS
- Sits between sequencer and SNOS, but doesn't relay real data between them - more about hinting the SNOS to ask the sequencer about a new block
- Asks the sequencer about new, unprocessed blocks
- Issues proof generation requests
- Asks core contracts to update state, once proof is verified

## Components

## Read more

- https://github.com/madara-alliance/madara-orchestrator
- Github links
- Starknet docs
- Any other relevant links?
