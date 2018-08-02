const createABCIServer = require('abci')

// turn on debug logging
require('debug').enable('abci*')

// initial abciApp
const initialState = { god: { balance: 10000000 } }
const abciApp = require('./myCoinApp')(initialState)

let port = 26658
// Start the server
createABCIServer(abciApp).listen(port, () => {
  console.log(`listening on port ${port}`)
})
