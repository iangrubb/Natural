import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Page } from '../styles'

import SentenceForm from '../userInterface/SentenceForm'

const Container = styled.div`
    margin: 3vw;
    padding: 3vw;
    background: #999;
`

const Home = props => {
    return (
        <Page>
            <h1>Testing</h1>
            <Container>
                <SentenceForm type="propositional"/>
            </Container>
            
        </Page>
    );
}

const msp = () => {
    return state => {
       
        return {}
    }
}

export default connect(msp)(Home)
