# abci-mycoin-js

A simple abci app in javascript.

## Prerequisite

- Tenderment core: https://tendermint.com/docs/introduction/install.html

## Run locally

```shell
npm i

# on terminal 1
npm run tendermint

# on terminal 2
npm run start
```

### Test the application

On terminal 3

**Initial account**

Initially, all coins belong to `god`. We have to create a user (i.e. `trump`) by transfering coins from `god` to `trump`
- `curl -s "localhost:26657/broadcast_tx_commit?tx=%22%7B%5C%22sender%5C%22:%5C%22god%5C%22,%5C%22receiver%5C%22:%5C%22trump%5C%22,%5C%22amount%5C%22:1000%7D%22"`

the data is url encoded string of `"{\"sender\":\"god\",\"receiver\":\"trump\",\"amount\":1000}"`

successful result:

```JSON
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "check_tx": {
      "log": "tx succeeded",
      "fee": {}
    },
    "deliver_tx": {
      "log": "tx succeeded",
      "fee": {}
    },
    "hash": "ABB97CF893BE4C71D3089DAA07502D609C37B310",
    "height": "2672"
  }
}
```

**Query balance**

Check `trump` balance

- `curl -s "localhost:26657/abci_query?data=%22%7B%5C%22user%5C%22:%20%5C%22trump%5C%22%7D%22"`

the data is url encoded string of `"{\"user\": \"trump\"}"`

```JSON
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "response": {
      "value": "1000"
    }
  }
}
```

## Run on containers
This example run 4 nodes of abci app and 4 nodes for Tendermint

```shell
# generate genesis for test net
tendermint testnet

# start containers
docker-compose up
```

### Test the farm
Try commiting a transaction on Node0 (port `26657`)

- `curl -s "localhost:26657/broadcast_tx_commit?tx=%22%7B%5C%22sender%5C%22:%5C%22god%5C%22,%5C%22receiver%5C%22:%5C%22trump%5C%22,%5C%22amount%5C%22:1000%7D%22"`

And then query balance from node3 (port `26664`)

- `curl -s "localhost:26664/abci_query?data=%22%7B%5C%22user%5C%22:%20%5C%22trump%5C%22%7D%22"`

### Check fault tolerance

The system still works if one node down

```shell
docker-compose stop tm-node3

# check running node
docker-compose ps
```
