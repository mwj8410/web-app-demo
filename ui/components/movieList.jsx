'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMovieList } from '../actions'
import MovieDetail from './movieDetail.jsx'

class MovieList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieList: [],
      selectedMovie: {}
    }

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.setSelectedMovie = this.setSelectedMovie.bind(this)
  }

  componentWillMount() {
    this.props.getMovieList()
  }

  componentWillReceiveProps(nextProps){
    this.setState(Object.assign({}, this.state, {
      movieList: nextProps.Movies.list
    }))
  }

  setSelectedMovie(event) {
    let movieId = Number(event.target.getAttribute('data-movie-id'))
    if (!movieId) {
      this.setState(Object.assign({}, this.state, { selectedMovie: {}}))
      return
    }
    const selectedMovie = this.state.movieList.filter((movie) => {
      return movie.id === movieId
    })[0]
    this.setState(Object.assign({}, this.state, { selectedMovie }))
  }

  render() {
    return (
      <div>
        <br />

        <div className='container'>
          <button
            type='button'
            className='btn btn-primary'
            data-toggle='modal'
            data-target='#movieDetailModal'
            onClick={this.setSelectedMovie}
          >
            Add Movie
          </button>

          <MovieDetail movie={ this.state.selectedMovie } />
        </div>

        <br />

        <div className='container'>
          <ul className='list-group'>
            {
              this.state.movieList && this.state.movieList.map((movie) => {
                return <li
                  className='list-group-item'
                  onClick={this.setSelectedMovie}
                  data-movie-id={movie.id}
                  data-toggle='modal'
                  data-target='#movieDetailModal'
                >
                  { movie.title }
                </li>
              })
            }
          </ul>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    Movies: state.movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieList: (values) => {
      dispatch(getMovieList(values))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList)
