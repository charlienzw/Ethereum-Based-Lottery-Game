import { connect } from 'react-redux'
import CreateLottery from './CreateLottery'
import { createLottery } from './CreateLotteryActions'

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  console.log(ownProps)
  return { data: state.data }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateLotterySubmit: (currState) => {
      event.preventDefault();

      dispatch(createLottery(currState))
    }
  }
}

const CreateLotteryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLottery)

export default CreateLotteryContainer
