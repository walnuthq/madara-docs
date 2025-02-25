---
sidebar_position: 1
---

# Run a devnet

## Overview

This quick-start guide helps you start your own, local devnet with Madara. 

The chain is lightweight and does not settle its transactions on any underlying chain. Therefore, it does not inherit security from the other chain. If you'd prefer to start an [Appchain](/concepts/appchain) with [settlement](/concepts/settlement), please see [this guide](/quickstart/run_appchain) instead.

## Installation

These installation instructions assume you are using Linux or macOS. For Windows, please utilize [WSL2](https://learn.microsoft.com/en-us/windows/wsl/).

### Prerequisites

You will need to have the following system components installed:
- Rust. Please see [here](https://www.rust-lang.org/tools/install) for instructions.
- Docker. Please see [here](https://docs.docker.com/engine/install/) for instructions.
- A C compiler (such as GCC or Clang) and `make`.

### Install Madara CLI

You should start by installing the main tool for running Madara, the Madara CLI:
```bash
git clone https://github.com/madara-alliance/madara-cli.git
cd madara-cli
git submodule update --init --recursive --jobs=4
```
The above will clone the repository into a new folder, enter the folder and initialize the repository's Git submodules.

## Run a devnet with Madara CLI

You are now ready to run your own Madara devnet. If you're not in the Madara CLI's folder, go there and run:

```bash
cargo run create
```
The above will prompt you for various options. You should choose the following:
1. Select Madara mode: `Devnet`.
1. Input DB path: keep default.

It may take half an hour to prepare the image for the first time, depending on your system performance. Wait for that to finish.

![Devnet running](/img/quickstart-devnet-start.png "Devnet is running")

Congratulations, you now have a fully functioning devnet running! Next, you may want to [interact](use_devnet) with the chain.