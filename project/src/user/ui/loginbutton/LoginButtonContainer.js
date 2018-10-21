import { connect } from 'react-redux'
import LoginButton from './LoginButton'
import JoinNowButton from './JoinNowButton'
import { loginUser } from './LoginButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUserClick: (event) => {
      event.preventDefault();

      dispatch(loginUser())
    }
  }
}

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton)

const JoinNowButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinNowButton)

export {LoginButtonContainer, JoinNowButtonContainer}
