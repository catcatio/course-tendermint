# abci-mycoin-js

A simple abci app.

## Prerequisite

- Tenderment core: https://tendermint.com/docs/introduction/install.html

## Run

```shell
npm i

# on terminal 1
npm run tendermint

# on terminal 2
npm run start
```

## Test the application

On terminal 3

**Initial account**
Initially, all coins belong to `god`. We have to create a user (`trump`) by transfering coins from `god` to `trump`
- `curl -s localhost:26657/broadcast_tx_commit?tx=%22%7B%5C%22sender%5C%22:%5C%22god%5C%22,%5C%22receiver%5C%22:%5C%22trump%5C%22,%5C%22amount%5C%22:1000%7D%22`

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

```JSON
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "response": {
      "value": "3000"
    }
  }
}
```