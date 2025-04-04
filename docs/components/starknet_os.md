---
sidebar_position: 12
---

# Starknet Operating System (SNOS)

## Overview

SNOS is a Rust library for managing the execution of the Cairo Virtual Machine (CairoVM). It runs a specialized Cairo program responsible for executing and verifying transactions, generating output that is later used for proving.

## Responsibilities

The responsibilities of the SNOS are:
- Run and manage the CairoVM.
- Execute each block to generate a *trace*.
- Translate between different data formats when managing CairoVM inputs and outputs.

## Execution

Execution of the transactions inside SNOS is done for the following purposes:
1. To verify that all transactions follow network rules.
1. To calculate state changes.
1. To generate a trace for all performed operations.

The SNOS utilizes the CairoVM to execute each transaction. The CairoVM includes an elaborate Cairo program with logic for verifying all of the network rules. This Cairo program is eventually responsible for making sure each transaction obeys the rules.

### Handling of erroneous transactions

Transactions can fail the SNOS validation. Reasons include:
1. The transaction runs out of gas.
1. The transaction runs code that ends in a panic.
1. The transaction tries to perform operations it's not allowed to do - for example write to another contract's storage.
1. The transaction does not follow the agreed execution order. For example, it doesn't call the account contract correctly.

If a transactions fails validation, it is marked as failed with one of two different mechanisms:
- Pre-execution failures.
  - Occur before transaction execution. 
  - Examples: the transaction fails a preliminary check, such as signature verification or an incorrect nonce.
  - The transaction is marked with status REJECTED and not included in the block.
  - The user does not pay any fees.
- Execution failures.
  - Occur during the execution of the transaction. 
  - Examples: attempting an unauthorized state modification or running out of gas.
  - The transaction is marked with status REVERTED but included in the block.
  - The user pays fees.

## Read more

- [GitHub](https://github.com/keep-starknet-strange/snos)
- [About SNOS](https://docs.starknet.io/architecture-and-concepts/network-architecture/os/)