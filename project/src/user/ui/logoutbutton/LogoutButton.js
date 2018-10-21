import React from 'react'

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    <li>
      <a href="#" onClick={(event) => onLogoutUserClick(event)}>Logout</a>
    </li>
  )
}

export default LogoutButton
