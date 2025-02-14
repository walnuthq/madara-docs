---
sidebar_position: 4
draft: true
---

# Data Availability Layer (DA)

## Overview

- What is the data availability problem in general
- Stores the actual data used in transactions
- The data is needed for escape hatch
- Does not need to be a blockchain
- Sequencer submits data to the chosen DA

## Responsibilities

- Store data, in some accessible format
- Provide guarantees that needed data is retained
- Provide correct data upon request

## Typically used DAs

- A real blockchain costs more
- A regular blockchain: Ethereum, Starknet
- Specialized ones: Celestia, EigenDA, Avail, ...

## Trust assumptions

- How trustless is the chosen DA
- Different options have different trust assumptions. Give some examples
- Remember that the prover does not prove anything about data availability

## Read more

- Github links
- Starknet docs
- Any other relevant links?