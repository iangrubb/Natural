import React from 'react'
import './App.css'

import styled from 'styled-components'

import ShowProof from './views/ShowProof'
import NavBar from './views/NavBar'

const Site = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ddd;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function App() {
  return (
    <Site>
      < NavBar />
      < ShowProof />
    </Site>
  )
}

export default App;
