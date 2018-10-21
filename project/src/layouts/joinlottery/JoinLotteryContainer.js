import { connect } from 'react-redux'
import JoinLottery from './JoinLottery'
import { joinLottery } from './JoinLotteryActions'

const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onJoinLotterySubmit: (currState) => {
      event.preventDefault();

      dispatch(joinLottery(currState))
    }
  }
}

const JoinLotteryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinLottery)

export default JoinLotteryContainer
