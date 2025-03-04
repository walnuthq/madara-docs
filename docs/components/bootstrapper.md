---
sidebar_position: 16
draft: true
---

# Bootstrapper

## Overview

Madara Bootstrapper helps you initialize needed contracts on your [Appchain](/concepts/appchain) and its [settlement layer](/concepts/settlement).

Without the bootstrapper, your Appchain starts as an empty network with no accounts or assets, making it unusable for transactions.

The bootstrapper adds all of the required functionality so you can quickly start using your new Appchain. The bootstrapper needs to be executed only once for any new Appchain.

## Responsibilities

The bootstrapper performs the following responsibilities:
- Deploy contracts required for bridging assets and messaging on the Appchain and on the settlement layer
- Deploy [Universal Deployer Contract](https://docs.starknet.io/architecture-and-concepts/accounts/universal-deployer) (UDC) on the Appchain
- Deploy the ERC20 gas token on the Appchain and on the settlement layer (if needed)
- Deploy [OpenZeppelin account contract](https://docs.openzeppelin.com/contracts-cairo/1.0.0/accounts) on the Appchain
- Configure all of the deployed contracts

## Read more

- [Bootstrapper GitHub](https://github.com/madara-alliance/madara-bootstrapper)