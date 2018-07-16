'use strict'

let initialState = {}

const movies = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return {}

    case 'GET_MOVIE_LIST':
      console.log('Reducer: GET_MOVIE_LIST')
      console.log(action)
      return Object.assign({}, state, { list: action.payload })
    case 'RESPONSE_UPDATE_MOVIE_LIST':
      console.log('Reducer: RESPONSE_UPDATE_MOVIE_LIST')
      return Object.assign({}, state, { list: action.payload })

    default:
      return state
  }
}

export default movies
