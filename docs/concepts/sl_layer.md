@ -3,10 +3,35 @@ sidebar_position: 6
draft: true
---

# Settlement Layer

## Overview

A settlement layer is a blockchain where transactions from an [Appchain](/concepts/appchain) are finalized. It ensures security, dispute resolution and finality by verifying provided proofs from the Appchain.

The most common settlement layer is Ethereum mainnet.

## Settling transactions and security

Appchains typically inherit security from the settlement layer blockchain. For Madara, this blockchain is either Ethereum or Starknet.

For Starknet, the underlying blockchain is Ethereum. In this setting, Starknet is called a Layer 2 (L2) blockchain, while Ethereum is Layer 1 (L1). It's also equally possible to create an Appchain on top of Starknet - then your new layer becomes a L3 and your transactions are settled on Starknet L2, which again settles transactions on Ethereum L1.

### Security

Settlement layer provides security for the Appchain. 




# Settlement layer requirements

Requirements for a good settlement layer are:
- Secure. The blockchain has to be financially secure and trusted by all involved parties.
- Programmability. The blockchain has to be able to run the settlement logic.
- Governance & development stability. The chain should be stable enough to support ongoing settlement.




- A regular blockchain mainly used for totally unrelated purposes
- Some secure blockchain
- Contains smart contracts that contain a ZK verifier for proofs generates by the prover
@ -28,6 +53,7 @@ draft: true

- Escape hatch mechanism
- Which assets can be recovered in the SL. Does it make sense to recover non-bridged ones.
- security tradeoffs

## Read more

