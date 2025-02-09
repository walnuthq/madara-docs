---
sidebar_position: 16
---

# Orchestrator

## Overview

- An independent component
- Designed to offload work from the sequencer
- Orchestrates a lot of communications between entities. Sometimes this is just hinting about new data being available, sometimes sending actual proof data

## Responsibilities

- Acts as a sort of an indirect relayer between sequencer and SNOS
- Sits between sequencer and SNOS, but doesn't relay real data between them - more about hinting the SNOS to ask the sequencer about a new block
- Asks the sequencer about new, unprocessed blocks
- Issues proof generation requests
- Asks core contracts to update state, once proof is verified

## Read more

- Github links
- Starknet docs
- Any other relevant links?
