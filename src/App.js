import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Route, Switch } from 'react-router'

import NavBar from './views/NavBar'
import ProofPage from './views/ProofPage'
import Exercises from './views/Exercises'
import Home from './views/Home'
import Guide from './views/Guide'
import NewProof from './views/NewProof'

const Site = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ddd;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const App = props => {
  return (
    <Site>
      < NavBar />
      <Switch>
        <Route path="/newProof" component={NewProof} />
        <Route path="/proof" component={ProofPage} />
        <Route path="/guide" component={Guide} />
        <Route path="/exercises" component={Exercises} />
        <Route path="/" component={Home} />
      </Switch>
    </Site>
  )
}


export default App
