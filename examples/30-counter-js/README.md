# counter-js

An abci counter-app in javascript
Clone from https://github.com/tendermint/js-abci/blob/master/example/counter.js
to make it runable

## Run

```shell
npm i
tendermint node

# on another terminal
npm run start
```

## Test the application

```shell
# on another terminal
curl -s "localhost:26657/broadcast_tx_commit?tx=0x01"
curl -s "localhost:26657/broadcast_tx_commit?tx=0x02"
curl -s "localhost:26657/broadcast_tx_commit?tx=0x02"
curl -s "localhost:26657/broadcast_tx_commit?tx=0x03"
```

