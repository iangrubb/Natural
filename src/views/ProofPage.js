import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ShowProof from './ShowProof'

import { Page } from '../styles'

const ProofPage = props => {
    return (
        <Page>
            {props.initialProofId ? < ShowProof /> : null}
        </Page>
    );
}

const msp = () => {
    return state => {
       
        return {...state}
    }
}

export default connect(msp)(ProofPage)