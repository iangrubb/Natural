import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Route, Switch } from 'react-router'

import NavBar from './views/NavBar'
import ProofPage from './views/ProofPage'
import Exercises from './views/Exercises'
import Home from './views/Home'
import NewProof from './views/NewProof'
import SignIn from './views/SignIn'

import { fetchExercises } from './actions'

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


  const [signInFlag, setSignInFlag] = useState(false)

  useEffect(() => {
    props.fetchExercises()
  }, [])

  const toggleSignIn = () => {
    setSignInFlag(!signInFlag)
    props.clearErrorMessage()
  }


  return (
    <Site>
      < NavBar toggleSignIn={toggleSignIn}/>
      <Switch>
        <Route path="/newProof" component={NewProof} />
        <Route path="/proof" component={props.loadedProof ? ProofPage : Home} />
        {/* <Route path="/guide" component={Guide} /> */}
        <Route path="/exercises" component={Exercises} />
        <Route path="/" render={() => <Home toggleSignIn={toggleSignIn}/>} />
      </Switch>
      {signInFlag ? <SignIn toggleSignIn={toggleSignIn}/> : null}

    </Site>
  )
}


const msp = () => {
  return state => {
      return {
          loadedProof: state.proofType
      }
  }
}

const mdp = dispatch => {
  return {fetchExercises: fetchExercises(dispatch), clearErrorMessage: () => dispatch({type: "UNSET ERROR MESSAGE"})}
}

export default connect(msp, mdp)(App)
