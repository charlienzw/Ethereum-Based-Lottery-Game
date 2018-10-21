const initialState = {
  success: null
}

const dataReducer = (state = initialState, action) => {
  if (action.type === 'CREATE_LOTTERY')
  {
    return Object.assign({}, state, {
      success: action.payload.success
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default dataReducer
