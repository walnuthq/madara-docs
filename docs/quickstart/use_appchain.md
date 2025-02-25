---
sidebar_position: 5
---

# Monitor a running Appchain

## Overview

This quick-start guide helps you query your local Appchain. Please make sure you are [running a local Appchain](/quickstart/run_appchain) before continuing.

Starting an Appchain launches multiple services. A few notable ones are:
- MongoDB
- Blockchain
- Core contract

We will demonstrate how you can query these services to see the status of your Appchain.

## MongoDb

MongoDB is a database used by many of the Appchain's supporting components, such as the orchestrator.

You can monitor your Appchain by connecting to the database and querying its tables. For this, you should download [MongoDB Compass](https://www.mongodb.com/try/download/compass). Install Compass and connect it to the default address, which should be `mongodb://localhost:27017`.

The database displays four tables. Currently, we're most interested in the orchestrator job entries.

### Query orchestrator

TODO

```
{
  $nor: [
    { job_type: 'SnosRun' },
    { job_type: 'StateTransition' },
    { job_type: 'ProofCreation', status: 'Completed' },
{ job_type: 'ProofCreation', status: 'PendingVerification' },
{ job_type: 'DataSubmission', status: 'Completed' }
  ]
}
```

## Blockchain

Another source of data for our Appchain is the blockchain itself. You can query your Appchain's sequencer directly to retrieve information about blockchain operations.

### Current block number

To get the blockchain's latest block number, use:
```bash
curl -X POST http://localhost:9945/ -H "Content-Type: application/json" --data '{
  "jsonrpc": "2.0",
  "method": "starknet_blockNumber",
  "params": [],
  "id": 1
}'
```

### Latest settled block number

In an Appchain, all transactions are eventually settled on some base layer. You can query the latest settled block number with:
```bash
cast call 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 "stateBlockNumber()" --rpc-url http://127.0.0.1:8545

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


TODO: we wanna interact with core contract + see the orch running + mongodb for block status