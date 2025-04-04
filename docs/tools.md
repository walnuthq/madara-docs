---
sidebar_position: 1
---

# Required tools

Before following the guides in this documentation, ensure you have the necessary tooling installed.

:::info
These instructions assume you are using Linux or macOS. For Windows, please utilize [WSL2](https://learn.microsoft.com/en-us/windows/wsl/).
:::

## Compiler tools

Compiler tools are needed when building Madara from source code. This is currently the only option on how to run Madara.

Ensure you have a C compiler (like gcc or clang) and `make` installed. Installation steps depend on your OS - please refer to your package manager or system documentation.

Most development environments come with these tools preinstalled.

## Rust

Please install Rust following [these](https://www.rust-lang.org/tools/install) instructions.

## Docker

Many of Madara's components are packaged into Docker images for easier execution. Docker tooling is required for utilizing these packages.

Please install Docker following [these](https://docs.docker.com/engine/install/) instructions.

## Ethereum Foundry

Foundry is a toolchain for interacting with Ethereum smart contracts. All of the interactions related to Ethereum (Anvil) in these guides utilize Foundry.

Please install Foundry following [these](https://book.getfoundry.sh/getting-started/installation) instructions.

## Starkup

[Starkup](https://github.com/software-mansion/starkup) is an installer to help with Starknet development. The installed tools are needed for interacting with Starknet-based Appchains, like Madara.

Run the following in a terminal to install Starkup:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.starkup.dev | sh -s -- --yes
```

Now restart your terminal to take the tooling into use. Next, you have to set the correct versions that are compatible with Madara:
```bash
asdf install scarb 2.9.2
asdf set scarb 2.9.2
asdf install starknet-foundry 0.36.0
asdf set starknet-foundry 0.36.0
```

The installed tools are:
- [asdf](https://asdf-vm.com/), a runtime version manager. Used by many Starknet tools.
- [Scarb](https://docs.swmansion.com/scarb/), a smart contract build toolchain and package manager.
- [Starknet Foundry](https://foundry-rs.github.io/starknet-foundry/index.html), a Starknet smart contract development tool.