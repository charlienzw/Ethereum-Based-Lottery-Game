import AuthenticationContract from '../../../build/contracts/Authentication.json'
import store from '../../store'

const contract = require('truffle-contract')

export const EXPLORE_CONTRACTS = 'EXPLORE_CONTRACTS'
function contractsExplored(data) {
  return {
    type: EXPLORE_CONTRACTS,
    payload: data
  }
}

export function exploreContracts(currState) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const lottery = contract(AuthenticationContract)
      lottery.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var lotteryInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        lottery.deployed().then(function(instance) {
          lotteryInstance = instance
          console.log(currState)
          // Attempt to login user.
          lotteryInstance.xxx(currState, {from: coinbase})
          .then(function(result) {
            // If no error, update user.

            dispatch(contractsExplored({"curr": result}))

            return alert('Lottery created!')
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
