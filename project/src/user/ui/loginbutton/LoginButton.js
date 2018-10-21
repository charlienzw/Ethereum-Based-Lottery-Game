import React from 'react'

const LoginButton = ({ onLoginUserClick }) => {
  return(
    <li>
      <a href="#" onClick={(event) => onLoginUserClick(event)}>Login</a>
    </li>
  )
}

export default LoginButton
