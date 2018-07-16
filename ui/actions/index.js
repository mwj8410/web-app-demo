'use strict'

import axios from 'axios'

import store from '../store.jsx'

const API_URL = 'http://localhost:8080'

export const addMovie = (values) => {
  axios.post(`${API_URL}/user/1/movie`, values)
    .then((resp) => {
      if(resp.status === 200) {
        getMovieList()
      } else {
        console.log('Received Error from API')
        console.log(resp)
      }
    })
    .catch((err) => {
      console.log('Encountered an error processing the request')
      console.log(err)
    })

  return {
    type: 'ADD_MOVIE'
  }
}

export const getMovieList = () => {
  axios.get(`${API_URL}/user/1/movies/list`)
    .then((resp) => {
      if(resp.status === 200) {
        store.dispatch({
          type: 'RESPONSE_UPDATE_MOVIE_LIST',
          payload: resp.data
        })
      } else {
        console.log('Received Error from API')
        console.log(resp)
      }
    })
    .catch((err) => {
      console.log('Encountered an error processing the request')
      console.log(err)
    })

  return {
    type: 'GET_MOVIE_LIST',
    payload: []
  }
}

export const updateMovie = (values) => {
  axios.put(`${API_URL}/user/1/movie/${values.id}`, values)
  .then((resp) => {
    if(resp.status === 200) {
      getMovieList()
    } else {
      console.log('Received Error from API')
      console.log(resp)
    }
  })
  .catch((err) => {
    console.log('Encountered an error processing the request')
    console.log(err)
  })

  return {
    type: 'UPDATE_MOVIE'
  }
}

export const setUser = (value) => ({
  type: 'SET_USER',
  payload: value
})
