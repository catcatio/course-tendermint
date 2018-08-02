const { createHash } = require('crypto')
const { stringify } = require('deterministic-json')

module.exports = async (state) => {
  // compute state hash
  return createHash('sha256')
    .update(stringify(state))
    .digest()
}