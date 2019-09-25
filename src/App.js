import React from 'react'
import { connect } from 'react-redux'



import styled from 'styled-components'

import NavBar from './views/NavBar'
import ShowProof from './views/ShowProof'
import Exercises from './views/Exercises'

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
      {props.initialProofId ? < ShowProof /> : < Exercises />}
    </Site>
  )
}

const msp = () => {
  return state => {
      return {initialProofId: state.initialProofId}
  }
}

export default connect(msp)(App)
