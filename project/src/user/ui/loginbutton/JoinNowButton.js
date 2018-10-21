import React from 'react'
import { Button } from 'react-bootstrap';
const JoinNowButton = ({ onLoginUserClick }) => {
  return(
      <Button onClick={(event) => onLoginUserClick(event)} bsStyle="primary">Join Now!</Button>
  )
}

export default JoinNowButton
