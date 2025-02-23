---
sidebar_position: 12
---

# Starknet Operating System (SNOS)

## Overview

SNOS is a Rust library for managing the execution of the Cairo Virtual Machine (CairoVM). It runs a specialized Cairo program responsible for executing and verifying transactions, generating execution traces that are later used for proving.

## Responsibilities

The responsibilities of the SNOS are:
- Run and manage the CairoVM.
- Execute each block to generate a *trace* (also called a [PIE](https://github.com/starkware-libs/cairo-lang/blob/a86e92bfde9c171c0856d7b46580c66e004922f3/src/starkware/cairo/lang/vm/cairo_pie.py#L219-L225)).
- Translate between different data formats when managing CairoVM inputs and outputs.

## Execution

Execution of the transactions inside SNOS is done for the following purposes:
1. To verify that all transactions follow network rules
1. To calculate state changes
1. To generate a record of all performed operations. This record is usually called a *trace* (or *PIE*).

The SNOS utilizes the CairoVM to execute each transaction. The CairoVM includes an elaborate Cairo program with logic for verifying all of the network rules. This Cairo program is eventually responsible for making sure each transaction obeys the rules.

### Handling of erraneous transactions

Transactions can fail the SNOS validation. Reasons include:
1. Transaction runs out of gas.
1. Transaction runs code that ends in a panic.
1. Transaction tries to perform operations it's not allowed to do - for example write to another contract's storage.
1. Transaction does not follow the agreed execution order. For example it doesn't call the account contract correctly.

If a transactions fails validation, it is marked as failed with one of two different mechanisms:
- Pre-execution failures. 
  - Occur before transaction execution. 
  - Examples: the transaction fails a preliminary check, such as signature verification or an incorrect nonce.
  - The transaction is marked with status REJECTED and not included in the block.
  - The user does not pay any fees.
- Execution failures. 
  - Occur during execution of the transaction. 
  - Examples: attempting an unauthorized state modification or running out of gas.
  - The transaction is marked with status REVERTED but included in the block.
  - The user pays fees.

## Read more

- Github links
- Starknet docs: https://docs.starknet.io/architecture-and-concepts/network-architecture/os/
- Any other relevant links?