import React from 'react'
import './App.css'

import styled from 'styled-components'

import ShowProof from './views/ShowProof'

const Site = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ddd;

  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {
  return (
    <Site>
      < ShowProof />
    </Site>
  )
}

export default App;
