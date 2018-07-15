
import React from 'react'
import { render as Render } from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Views
import Dashboard from './views/Dashboard.jsx'

import rootReducer from './reducers'
const store = createStore(rootReducer)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

Render(
  <Provider store={store}>

    <Router basename='/'>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <span className='navbar-brand mb-0 h1'>Web App Demo</span>

          <div className='collapse navbar-collapse' id='navbarNav'>

            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link to='/' className='nav-link'>Dashboard</Link>
              </li>
              <li className='nav-item'>
                <Link to='/about' className='nav-link'>About</Link>
              </li>
            </ul>

          </div>

        </nav>

        <Route exact path='/' component={Dashboard} />
        <Route path='/about' component={About} />
      </div>
    </Router>

  </Provider>,
  document.querySelector('section#application')
)
