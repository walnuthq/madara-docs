---
sidebar_position: 16
---

# Bootstrapper

## Overview

Madara Bootstrapper helps you initialize the essential contracts on your [Appchain](/concepts/appchain) and its [settlement layer](/concepts/settlement).

Without the bootstrapper, your Appchain starts as an empty network with no class hashes or bridges, making it unusable for transactions.

The bootstrapper deploys key contracts and configurations, allowing you to quickly start using your new Appchain. It only needs to be executed once per Appchain deployment.

## Responsibilities

The bootstrapper performs the following tasks:

- Deploys bridging and messaging contracts on both the Appchain and the settlement layer.
- Deploys the [Universal Deployer Contract](https://docs.starknet.io/architecture-and-concepts/accounts/universal-deployer) on the Appchain.
- Deploys the ERC20 gas token on the Appchain and on the settlement layer (if needed).
- Deploys account contracts on the Appchain:
  - [OpenZeppelin account contract](https://docs.openzeppelin.com/contracts-cairo/1.0.0/accounts).
  - [Argent account contract](https://github.com/argentlabs/argent-contracts-starknet).
  - [Braavos account contract](https://github.com/myBraavos/braavos-account-cairo).
- Configures all deployed contracts.

The bootstrapper can be configured to deploy only selected components or to integrate with existing deployments.

## Read more

- [Bootstrapper GitHub](https://github.com/madara-alliance/madara-bootstrapper)