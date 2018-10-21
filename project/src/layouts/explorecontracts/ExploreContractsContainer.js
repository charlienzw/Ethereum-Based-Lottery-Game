import { connect } from 'react-redux'
import ExploreContracts from './ExploreContracts'
import { exploreContracts } from './ExploreContractsActions'

const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onExploreContractsSubmit: (currState) => {
      event.preventDefault();

      dispatch(exploreContracts(currState))
    }
  }
}

const ExploreContractsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreContracts)

export default ExploreContractsContainer
