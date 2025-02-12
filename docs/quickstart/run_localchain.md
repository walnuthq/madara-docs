---
sidebar_position: 1
---

# Run a local chain

## Overview

This quick-start guide helps you start your own, local chain with Madara.

The used chain is only available locally and is meant for testing purposes.

## Installation

These installation instructions assume you are using Linux or macOS. For Windows, please utilize [WSL2](https://learn.microsoft.com/en-us/windows/wsl/).

### Prerequisites

You will need to have the following system components installed:
- Rust. Please see [here](https://www.rust-lang.org/tools/install) for instructions.
- Docker. Please see [here](https://docs.docker.com/engine/install/) for instructions.

### Install Madara CLI

You should start by installing the main tool for running Madara, the Madara CLI:
```bash
git clone https://github.com/madara-alliance/madara-cli.git
cd madara-cli
git submodule update --init --recursive --jobs=4 --remote
```
The above will clone the repository into a new folder, enter the folder and initialize the repository's Git submodules.

## Run a local chain with Madara CLI

You are now ready to run your own local Madara chain. If you're not in the Madara CLI's folder, go there and run:

```bash
cargo run create
```
The above will prompt you for various options. You should choose the following:
1. Select Madara mode: `Devnet`. This is a local chain
1. Input DB path: keep default

It may take half an hour to prepare the image for the first time. Wait for that to finish.

![Local chain running](/img/quickstart-local-start.png "Local chain is running")

Congratulations, you now have a fully functioning local chain running! Next, you may want to [interact](use_localchain) with the chain.