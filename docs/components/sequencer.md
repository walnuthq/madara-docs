---
sidebar_position: 6
---

# Sequencer

## Overview

- One of the main components handling txs and blockchain data
- Main entity providing blockchain data for external parties (such as SNOS and users)

## Responsibilities

- Receives txs from gateway
- Executes txs and updates the blockchain state
- Forms blocks
- Responds to JSON-RPC queries
- Updates blocks based on work from other components (mostly settlement layer proof verification)
- Interacts with the orchestrator, offloading a lot of communications to it

### How to decide the amount of txs in a block

- More txs in a block means cheaper per-tx costs, but longer wait times (explain why)
- The costs can be subsidied so wait times stay reasonable

## Read more

- Github links
- Starknet docs
- Any other relevant links?