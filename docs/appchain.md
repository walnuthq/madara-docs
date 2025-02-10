---
sidebar_position: 2
---

# Running an appchain

## Overview

This guide will help you run an Appchain with Madara.

## Setup

### Install Madara CLI

You should start by installing the main tool for running Madara components, the Madara CLI:
```bash
git clone https://github.com/madara-alliance/madara-cli.git
cd madara-cli
git submodule update --init --recursive --jobs=4 --remote
```
The above will clone the repository into a new folder, enter the folder and initialize the repository's Git submodules.

### Run an appchain with Madara CLI

You are now ready to run your own Appchain. If you're not in the Madara CLI's folder, go there and run:

```bash
cargo run create
```
The above will prompt you for various options. You should choose the following:
1. Select Madara mode: `AppChain`
1. Select Prover: `Dummy`

It may take half an hour to prepare the image for the first time. Once the AppChain is ready, leave it running and open a new terminal for the rest of this guide.
