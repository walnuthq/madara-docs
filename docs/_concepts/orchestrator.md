---
sidebar_position: 6
---

# Orchestrator

## Overview

- An independent component
- Designed to take work off the sequencer
- Orchestrates a lot of communications between entities

## Responsibilities

- Acts as a sort of an indirect relayer between sequencer and SNOS

## Interaction with other components

- Sits between sequencer and SNOS, but doesn't relay real data between them - more about hinting the SNOS to ask the sequencer about a new block
- Issues proof generation requests
- Asks core contracts to update state, once proof is verified

## Read more

- Github links
- Any other relevant links?
