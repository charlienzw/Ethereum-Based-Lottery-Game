import LotteryContract from '../../../build/contracts/Lottery.json'
import store from '../../store'

const contract = require('truffle-contract')

export const CREATE_LOTTERY = 'CREATE_LOTTERY'
function lotteryCreated(data) {
  return {
    type: CREATE_LOTTERY,
    payload: data
  }
}

export function createLottery(currState) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const lottery = contract(LotteryContract)
      lottery.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var lotteryInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        lottery.new({"_minBetAmount": currState.minBetAmount, "_donateLevel": currState.donateLevel},{from: coinbase}).then(function(instance) {
          lotteryInstance = instance
          
          dispatch(lotteryCreated({"success": true}))
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
