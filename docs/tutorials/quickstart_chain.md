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

### Option 1: Build from source

First, make sure you have all the required dependencies installed:

| Dependency | Minimum version    | Installation                                                      |
| ---------- | ---------- | ----------------------------------------------------------------- |
| Rust       | rustc 1.81 | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| Clang      | Latest     | `sudo apt-get install clang`                                      |
| Openssl    | 0.10       | `sudo apt install openssl`                                        |

Next, clone the repository:
```bash
git clone https://github.com/madara-alliance/madara
cd madara
```

Then you are ready to build the project. This will take some minutes:
```bash
cargo build
```

### Option 2: Install with Docker

Download the required Docker images.

```bash
docker pull ghcr.io/madara-alliance/madara:latest
docker tag ghcr.io/madara-alliance/madara:latest madara:latest
docker rmi ghcr.io/madara-alliance/madara:latest
```

## Start the chain

### If built from source

Run a local devnet with:
```bash
cargo run -- --name Madara --devnet --base-path ../madara_db --chain-config-override=chain_id=abcabc
```

Notes about the parameters:
1. All data is stored in a new database folder denoted by `base-path` parameter. Use a suitable location.
1. It is important to NOT use a chain ID that's being utilized by some [existing Starknet network](https://github.com/starknet-io/starknet.js/blob/8fb2193462b5bb743f551cdec631d5923f09e657/src/constants.ts#L44). Otherwise you are free to use any hexadecimal ID you want.

Leave the devnet running in one terminal window and open another one for interaction.

### If using Docker

Run Madara with:
```bash
docker run -p 9944:9944  --name Madara madara:latest --devnet --rpc-external
```

To make sure that Madara is running correctly, you can check its logs with:
```bash
docker logs -f -n 100 Madara
```

#### Restart

If you need to restart Madara, you should first remove its Docker container with:
```bash
docker rm -f Madara
```

## Install tooling for Starknet interaction

To deploy and interact with Starknet smart contracts we're going to use [Starkli](https://book.starkli.rs/).

### Install Starkli

Install a Starkli manager with:
```bash
curl https://get.starkli.sh | sh
```

Restart your terminal. After that, you can install Starkli with:
```bash
starkliup
```

### Configure your account and signer

Before you can interact with the network you need an account. Luckily, running the devnet gives you a few ready accounts and their respective private keys. This is only possible because the network is a fresh network and you have full control over it - in real networks you need to get an account by different means.

Pick the last given account and copy its private key somewhere - you'll need it for each contract interaction a bit later.

### Install Scarb

### Save an example contract locally

### Compile the example contract

## Deploy a contract

### Declare your contract

### Deploy it

- Use Starkli or Scarb for deployment

## Issue transactions

- Remember to use your private key
- ...

## Next steps

TODO