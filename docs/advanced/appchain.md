---
sidebar_position: 2
---

# Appchain configuration

This page explains the configuration options for your Madara appchain.

## Overview

An Appchain consists of multiple configurable components. While the default configuration is suitable for quick testing, adjustments are needed to optimize performance and customize the Appchain for its intended purpose.

## Changing configuration values

Madara Appchain, when started with the CLI, can be started with a configuration file.

### Generating a configuration file

A configuration file can be generated with the CLI by executing:
```bash
cargo run init --default
```

The file will be called `my_custom_config.toml` and can be found in folder `deps/data`. 

You are free to modify any of the values before starting the Appchain with the configuration file. This page will help you adjust the values.

### Running Madara with the configuration file

Once you have modified the values you need, you can start Madara with the configuration file:
```bash
cargo run create --config-file deps/data/my_custom_config.toml
```

For more information on how to start your Appchain, please refer to [this guide](/quickstart/run_appchain).

## Performance

Different Appchains have different performance requirements and this can be configured depending on the needs of your Appchain.

### Key aspects to consider

1. Block Size and throughput
    - Larger blocks can accommodate more transactions, improving throughput, but they also require more resources to process and validate. Smaller blocks may lead to better efficiency but can reduce throughput.
2. Block time and latency
    - The block time defines how frequently new blocks are generated. Shorter block times lead to faster transaction finality but may cause issues like chain reorganisations, reducing reliability. Chain reorganisations are especially tricky in Appchains that settle on another chain.
3. Gas fees and transaction costs
    - Gas fees regulate network usage. Setting appropriate gas fees ensures transactions are processed in a timely manner while preventing spam attacks. Low fees increase throughput but may lead to spam, while high fees encourage users to reduce their transactions, thus reducing congestion.
    - The base gas fee is constant in Madara Appchains, unlike in Ethereum where it fluctuates based on demand.

### Configurable values

The following configuration values affect performance directly:
- `block_time`. This is the maximum amount of seconds between blocks. A block may be produced faster if it becomes full, according to other settings. Using a small value reduces transaction finality time but leads to higher resource usage.
- `pending_block_update_time`. Defines how frequently new transactions are processed into the pending block, in seconds. Using a small value helps include more transactions per block but leads to higher resource usage.
- `gas_price`. This is the base gas price/fee that each transactions has to pay. Using a small value enables spam in the Appchain. Using a value too high restricts the Appchain usage. A zero value is also allowed.
- `blob_gas_price`. The cost of storing state diff data using blobs. The fee is distributed among transactions included in the same blob, reducing the per-transaction storage cost on the settlement layer.