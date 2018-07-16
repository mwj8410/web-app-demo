'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser } from '../actions'

class UserSelector extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.setUser({ nameDisplay: 'John A. Doe', id: 1 })
  }

  componentDidMount() {

  }

  render() {
    return (
      <span className="navbar-text">
        { this.props.Users.nameDisplay || 'Unknown User'}
      </span>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    Users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (values) => {
      dispatch(setUser(values))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSelector)
