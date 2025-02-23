---
sidebar_position: 12
---

# Starknet Operating System (SNOS)

## Overview

SNOS is a Rust library for managing the execution of the Cairo Virtual Machine (CairoVM). It runs a specialized Cairo program responsible for executing and verifying transactions, generating execution traces that are later used for proving.




- A core components of the rollup
- A Cairo Zero program
- SNOS is not needed if you run Madara in sequencer mode, because txs are executed by the sequencer/blockifier
- How does this relate to CairoVM? Should CairoVM have its own page?

## Responsibilities

The responsibilities of the SNOS are:
- Run and manage the CairoVM.
- Execute each block to generate a *trace* (also called a [PIE](https://github.com/starkware-libs/cairo-lang/blob/a86e92bfde9c171c0856d7b46580c66e004922f3/src/starkware/cairo/lang/vm/cairo_pie.py#L219-L225)).
- Translate between different data formats when managing CairoVM inputs and outputs.

## Execution

Execution of the transactions inside SNOS is done for the following purposes:
1. To verify that all transactions follow network rules
1. To generate a record of the transactions

The SNOS utilizes the CairoVM to execute each transaction. The CairoVM includes an elaborate Cairo program that includes logic for verifying all of the network rules.

This Cairo program is eventually responsible for making sure each transaction obeys the rules.

- Make sure __validate__ is called and other similar ordering checks

If there are errors in the transactions, the program is unable to produce the execution trace and the transactions are marked as failed.

## Read more

- Github links
- Starknet docs: https://docs.starknet.io/architecture-and-concepts/network-architecture/os/
- Any other relevant links?