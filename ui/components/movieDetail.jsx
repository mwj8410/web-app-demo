'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMovie, updateMovie } from '../actions'

const blank_record = {
  title: '',
  genre: '',
  year: 1900,
  rating: '',
  actors: ''
}

class MovieDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      details: Object.assign({}, this.props.movie),
      isNewMovie: !this.props.movie.id
    }

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      details: nextProps.movie.id ? nextProps.movie : blank_record,
      isNewMovie: !nextProps.movie.id
    })
  }

  handleChange(event) {
    const newValue = event.target.value
    const key = event.target.getAttribute('data-key')
    this.setState(Object.assign({}, this.state, {
      details: Object.assign({}, this.state.details, { [key]: newValue })
    }))
  }

  handleSave() {
    if (!this.state.details.title || this.state.details.title.length === 0) {
      console.log('cannot save with no title')
      return
    }
    if (this.state.isNewMovie === true) {
      this.props.addMovie(this.state.details)
    } else {
      this.props.updateMovie(this.state.details)
    }
    $('#movieDetailModal').modal('hide')
  }

  render() {
    return (
      <div className='modal fade'
           id='movieDetailModal'
           tabIndex='-1'
           role='dialog'
           aria-labelledby='exampleModalLabel'
           aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>Movie Detail</h5>

              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>

              <form>

                <div className='form-group'>
                  <label htmlFor='movieTitleInput'>Title</label>
                  <input
                    type='text'
                    className='form-control'
                    id='movieTitleInput'
                    placeholder='Title'
                    value={ this.state.details.title }
                    data-key='title'
                    onChange={ this.handleChange }
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='movieGenreInput'>Genre</label>
                  <input
                    type='text'
                    className='form-control'
                    id='movieGenreInput'
                    placeholder='Genre'
                    value={ this.state.details.genre }
                    data-key='genre'
                    onChange={ this.handleChange }
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='movieYearInput'>Year</label>
                  <input
                    type='number'
                    className='form-control'
                    id='movieYearInput'
                    placeholder='Year'
                    value={ this.state.details.year }
                    data-key='year'
                    onChange={ this.handleChange }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="movieRatingInput">Rating</label>
                  <select
                    className="form-control"
                    id="movieRatingInput"
                    value={ this.state.details.rating }
                    data-key='rating'
                    onChange={ this.handleChange }
                  >
                    <option>1 Star</option>
                    <option>2 Star</option>
                    <option>3 Star</option>
                    <option>4 Star</option>
                    <option>5 Star</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='movieActorsInput'>Actors</label>
                  <textarea
                    className='form-control'
                    id='movieActorsInput'
                    rows='3'
                    value={ this.state.details.actors }
                    data-key='actors'
                    onChange={ this.handleChange }
                  />
                </div>

              </form>

            </div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={ this.handleSave }
              >
                { this.state.isNewMovie ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMovie: (values) => {
      dispatch(addMovie(values))
    },
    updateMovie: (values) => {
      dispatch(updateMovie(values))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetail)
