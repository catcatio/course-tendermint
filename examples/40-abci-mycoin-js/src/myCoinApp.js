const computeHash = require('./computeHash')

const decodeTx = (txRaw) => {
  try {
    const tx = JSON.parse(txRaw.toString('utf8'))
    return tx
  }
  catch (err) {
    console.error(err)
    return null
  }
}

module.exports = (initialState) => {
  // state of application
  const state = { nonces: {}, ...initialState }

  // handle info request
  const info = (request) => {
    // return application info
    return {
      data: 'Node.js My Coin App',
      version: '0.0.1',
      lastBlockHeight: 0,
      lastBlockAppHash: Buffer.alloc(0)
    }
  }

  const txError = { code: 1, log: 'tx failed' }
  const txOk = { code: 0, log: 'tx succeeded' }

  // handle checkTx request
  const checkTx = (request) => {
    let tx = decodeTx(request.tx)
    if (!tx) {
      return txError
    }

    // check if sender and receiver is the same person
    if (tx.sender === tx.receiver) {
      return txError
    }

    // check if sender and receiver is the same person
    if (!state[tx.sender]) {
      return txError
    }

    // validate account
    if (!Number.isInteger(tx.amount) || tx.amount < 0) {
      return txError
    }

    const senderBalance = state[tx.sender].balance || 0
    // check balance availability
    if (tx.amount > senderBalance) {
      return txError
    }

    return txOk
  }

  const deliverTx = (request) => {
    let tx = decodeTx(request.tx)

    // check if sender and receiver is the same person
    if (tx.sender === tx.receiver) {
      return txError
    }

    // check if sender and receiver is the same person
    if (!state[tx.sender]) {
      return txError
    }

    // validate account
    if (!Number.isInteger(tx.amount) || tx.amount < 0) {
      return txError
    }

    const senderBalance = state[tx.sender].balance || 0
    // check balance availability
    if (tx.amount > senderBalance) {
      return txError
    }

    // create receiver if not exist
    if (!state[tx.receiver]) {
      state[tx.receiver] = { balance: 0 }
    }

    // commit state change
    state[tx.sender].balance -= tx.amount
    state[tx.receiver].balance += tx.amount
    // ensure state update
    state.nonces[tx.sender] = (state.nonces[tx.sender] || 0) + 1

    return txOk
  }

  // handld commit request
  const commit = async () => {
    // return new state hash
    return { data: await computeHash(state) }
  }

  // handle query request
  const query = (request) => {
    let tx = decodeTx(request.data)
    if (!tx) {
      return txError
    }

    return { code: 0, value: `${state[tx.user] ? state[tx.user].balance : 'N/A'}` }
  }

  return {
    info,
    checkTx,
    deliverTx,
    commit,
    query
  }
}