---
sidebar_position: 17
---

# Starknet Operating System (SNOS)

## Overview

- A core components of the rollup
- A Cairo Zero program
- SNOS is not needed if you run Madara in sequencer mode, because txs are executed by the sequencer/blockifier
- How does this relate to CairoVM? Should CairoVM have its own page?

## Responsibilities

- Retrieves block data from the sequencer
- Runs txs to make sure they're valid
- Prepares proof inputs for the prover

## Read more

- Github links
- Starknet docs: https://docs.starknet.io/architecture-and-concepts/network-architecture/os/
- Any other relevant links?