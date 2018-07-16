'use strict'

import React, { Component } from 'react'
// import { render as Render } from 'react-dom'

import MovieList from '../components/movieList.jsx'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <MovieList />
      </div>
    )
  }
}

export default Dashboard
