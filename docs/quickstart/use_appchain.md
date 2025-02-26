---
sidebar_position: 5
---

# Monitor a running Appchain

## Overview

This quick-start guide helps you monitor your local Appchain. Please make sure you are [running a local Appchain](/quickstart/run_appchain) before continuing.

Starting an Appchain launches multiple services. A few notable ones are:
- Orchestrator
- Blockchain
- Performance monitoring

We will demonstrate how you can query these services to see the status of your Appchain. Note that it may take a few minutes for the Appchain to start gathering data to display.

## Orchestrator

The orchestrator utilizes MongoDB database for storing job information.

You can monitor your Appchain by connecting to the database and querying its tables. For this, you should download [MongoDB Compass](https://www.mongodb.com/try/download/compass). Install Compass and connect it to the default address, which should be `mongodb://localhost:27017`.

The database displays four tables. Currently, we're most interested in the orchestrator job entries.

### Query jobs

The orchestrator is running various jobs all the time. We can query its logs to see, for example, the latest performed jobs:
1. Go to the `orchestrator` database and its `jobs` table.
1. Under the `Documents` tab there is a query row. Go all the way right to click on `Options`.
1. Enter `Sort`: `{ "created_at": -1 }`.
1. Hit `Find`.

![Latest job](/img/pages/mongodb-latest-job.png "Latest job")

## Blockchain

Another source of data for our Appchain is the blockchain itself. You can query your Appchain's sequencer directly to retrieve information about blockchain operations.

### Current block number

The Appchain's sequencer should be listening at address `http://localhost:9945`. We can use Starknet's `starknet_blockNumber` function to retrieve the latest block number:

```bash
curl -X POST http://localhost:9945/ -H "Content-Type: application/json" --data '{
  "jsonrpc": "2.0",
  "method": "starknet_blockNumber",
  "params": [],
  "id": 1
}'
```

### Latest settled block number

In an Appchain, all transactions are eventually settled on some base layer. 

Notes on the parameters:
- The settlement layer's node should be listening at address `http://127.0.0.1:8545`.
- The verifier contract should be deployed at `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`.
- The target function is called `stateBlockNumber()`. It first has to be converted into its shortened hash value, which gives us `0x35befa5d`.

The entire call becomes:
```bash
curl -X POST http://127.0.0.1:8545 -H "Content-Type: application/json" -d '{
  "jsonrpc": "2.0",
  "method": "eth_call",
  "params": [{
    "to": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    "data": "0x35befa5d"                                                           
  }, "latest"],
  "id": 1
}'
```

## Grafana

The Appchain utilizes [Grafana](https://grafana.com/) for log and metrics aggregation. We will later add a detailed guide on how to set up Grafana for your Appchain. Meanwhile, here are some examples on what you can monitor.

TODO: add screenshots with small explanations.