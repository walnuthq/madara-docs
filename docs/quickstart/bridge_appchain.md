---
sidebar_position: 6
---

# Appchain bridging

## Overview

This guide helps you bridge assets back and forth from your Appchain. Please make sure you are [running a local Appchain](/quickstart/run_appchain) with [settlement](/concepts/settlement) before continuing.

A local Appchain settles its transactions on a local Anvil node. A bridge has been automatically setup between these blockchains. We can utilize that bridge to either deposit assets from the settlement layer (L1) to the Appchain (L2), or to withdraw assets back from L2 to L1.

### What is bridging

Bridging is a term used to move assets between different blockchains. The blockchains may be layered (L1 and L2, for example) or they may be totally unrelated. Bridging is generally easier and safer between layered blockchains.

A *bridge* is the solution for bridging. Typically it has a website users can use. In the background, it uses various mechanisms with various trust assumptions.

