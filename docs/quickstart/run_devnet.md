---
sidebar_position: 3
---

# Run a devnet

## Overview

This quick-start guide helps you start your own, local devnet with Madara. 

The chain is lightweight and does not settle its transactions on any underlying chain. Therefore, it does not inherit security from another chain. If you'd prefer to start an [Appchain](/concepts/appchain) with [settlement](/concepts/settlement), please see [this guide](/quickstart/run_appchain) instead.

## Installation

Before continuing, please see the [required tools](/tools) page about installing common tooling.

## Install Madara CLI

You should next install the main tool for running Madara, the Madara CLI:
```bash
git clone https://github.com/madara-alliance/madara-cli.git
cd madara-cli
```
The above will clone the repository into a new folder and enter it.

## Run a devnet with Madara CLI

You are now ready to run your own Madara devnet. Execute the following command:

```bash
cargo run create
```
The above will prompt you for various options. You should choose the following:
1. Select Madara mode: `Devnet`.
1. Input DB folder name: keep default.

It may take half an hour to prepare the image for the first time, depending on your system performance. Wait for that to finish.

> ![Devnet running](/img/pages/quickstart-devnet-start.png "Devnet is running")

Congratulations, you now have a fully functioning devnet running! Next, you may want to [interact](use_devnet) with the chain.