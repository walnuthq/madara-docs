---
sidebar_position: 1
---

# Quickstart: start your own chain

## Overview

This quick-start guide helps you start your own, local chain with Madara. Furthermore, it instructs you to run some actual transactions on the chain to verify its functionality.

The used chain is only available locally and is meant for testing purposes.

## Installation

These installation instructions assume you are using a Linux or macOS. For Windows, please utilize [WSL2](https://learn.microsoft.com/en-us/windows/wsl/).

There are two ways to install Madara:
1. Build from source
1. With Docker

Please choose the one that fits you best.

### Build from source

First, make sure you have all the required dependencies installed:

| Dependency | Minimum version    | Installation                                                      |
| ---------- | ---------- | ----------------------------------------------------------------- |
| Rust       | rustc 1.81 | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| Clang      | Latest     | `sudo apt-get install clang`                                      |
| Openssl    | 0.10       | `sudo apt install openssl`                                        |

Next, clone the repository:
```bash
cd <your-destination-path>
git clone https://github.com/madara-alliance/madara .
```

Then you are ready to build the project. This may take some minutes:
```bash
cargo build
```

### Install with Docker

TODO: add docker instructions from [README](https://github.com/madara-alliance/madara), test them and modify if needed.

## Start the chain

### If built from source

Run a local devnet with:
```bash
cargo run -- --name Madara --devnet --base-path ../madara_db --chain-config-override=chain_id=abcabc
```

Notes about the parameters:
1. All data is stored in a new database folder denoted by `base-path` parameter. Use a suitable location.
1. It is important to NOT use an overriding chain ID that's being utilized by some [existing Starknet network](https://github.com/starknet-io/starknet.js/blob/8fb2193462b5bb743f551cdec631d5923f09e657/src/constants.ts#L44). Otherwise you are free to use any hexadecimal ID you want.

### If using Docker

TODO

## Deploy a contract

TODO

## Issue transactions

TODO

## Next steps

TODO