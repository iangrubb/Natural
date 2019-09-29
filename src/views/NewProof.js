import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Page } from '../styles'

import SentenceForm from '../userInterface/SentenceForm'

const NewProof = () => {
    return (
        <Page>
            
            <SentenceForm type="predicate" cancel={() => console.log("nevermind")} confirm={result => () => console.log(result)}/>
           
            
        </Page>
    )
}


const msp = () => {
    return state => {
       
        return {...state}
    }
}

export default connect(msp)(NewProof)


