
import React from 'react'
import { render as Render } from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store.jsx'

// Components
import UserSelector from './components/userSelector.jsx'

// Views
import Dashboard from './views/Dashboard.jsx'

const About = () => (
  <div>
    <h1>About</h1>
    <p>This page is included as a placeholder to demonstrate route level navigation in an SPA.</p>
  </div>
)

Render(
  <Provider store={store}>

    <Router basename='/'>
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
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

          <UserSelector />

        </nav>

        <Route exact path='/' component={Dashboard} />
        <Route path='/about' component={About} />
      </div>
    </Router>

  </Provider>,
  document.querySelector('section#application')
)
