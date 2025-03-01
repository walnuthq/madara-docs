---
sidebar_position: 5
draft: true
---

# Configuration

## Overview

Blah.

## Configuration values

These values reflect the values shown [here](https://github.com/madara-alliance/madara/blob/main/configs/presets/mainnet.yaml).

| **Key** | **Explanation** | **Default Value** |
|---------|-----------------|-------------------|
| chain_name | Chain name | Starknet Mainnet |
| chain_id | Chain ID | 0x534e5f4d41494e |
| feeder_gateway_url | Feeder gateway URL TODO | https://alpha-mainnet.starknet.io/feeder_gateway/ |
| gateway_url | Gateway URL TODO | https://alpha-mainnet.starknet.io/gateway/ |
| native_fee_token_address | Native fee token address | 0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d |
| parent_fee_token_address | Parent fee token address TODO | 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7 |
| latest_protocol_version | Latest supported [Starknet version](https://www.starknet.io/developers/roadmap/) | 0.13.2 |
| block_time | Block time | 30s |
| pending_block_update_time | How often to refresh pending block contents | 2s |
| execution_batch_size | How many transactions to pop from the mempool for processing | 16 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>add_mod | Max capacity for `add_mod` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>bitwise | Max capacity for `bitwise` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>ecdsa | Max capacity for `ecdsa` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>ec_op | Max capacity for `ec_op` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>keccak | Max capacity for `keccak` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>mul_mod | Max capacity for `mul_mod` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>pedersen | Max capacity for `pedersen` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>poseidon | Max capacity for `poseidon` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>range_check | Max capacity for `range_check` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>builtin_count.<br/>range_check96 | Max capacity for `range_check96` | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.gas | Gas limit per block | 5000000 |
| bouncer_config.<br/>block_max_capacity.<br/>n_steps | Maximum amount of execution steps per block | 40000000 |
| bouncer_config.<br/>block_max_capacity.<br/>message_segment_length | Message segment length | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>n_events | Max number of events per blocks | 18446744073709551615 |
| bouncer_config.<br/>block_max_capacity.<br/>state_diff_size | State diff size | 131072 |
| sequencer_address | Sequencer address. 0x0 means no sequencer is being run | 0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8 |
| eth_core_contract_address | ETH core contract address in the settlement layer | 0xc662c410C0ECf747543f5bA90660f6ABeBD9C8c4 |
| eth_gps_statement_verifier | Verifier contract address in the settlement layer | 0x47312450B3Ac8b5b8e247a6bB6d523e7605bDb60 |
| mempool_tx_limit | Maximum amount of transactions in the mempool | 10000 |
| mempool_declare_tx_limit | Maximum amount of `declare` transactions in the mempool | 20 |
| mempool_tx_max_age | After which time a transaction gets removed from the mempool. null means no removals. | null |





