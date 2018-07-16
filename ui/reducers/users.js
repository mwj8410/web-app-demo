'use strict'

let initialState = {}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('Reducer: SET_USER')
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default users
