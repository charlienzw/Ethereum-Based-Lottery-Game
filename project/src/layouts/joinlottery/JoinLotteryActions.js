import LotteryContract from '../../../build/contracts/Lottery.json'
import store from '../../store'

const contract = require('truffle-contract')

export const JOIN_LOTTERY = 'JOIN_LOTTERY'
function lotteryJoined(data) {
  return {
    type: JOIN_LOTTERY,
    payload: data
  }
}

export function joinLottery(currState) {
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

        lottery.at(currState.address).then(function(instance) {
          lotteryInstance = instance
          console.log(currState)
          var num = store.getState().web3.utils.soliditySha3(currState.x)
          lotteryInstance.enterHash({x: num}, {from: coinbase})
          .then(function(result) {

            dispatch(lotteryJoined({"curr": currState}))

            return alert('Lottery created!')
          })
          .catch(function(result) {
            // If error...
            console.log(result)
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
