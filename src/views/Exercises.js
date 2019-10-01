
import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import ProofContainer from '../userInterface/ProofContainer'

import { Page } from '../styles'


const Exercises = props => {
    return (
        <Page>
            {props.exerciseData.map( (e, idx) => <ProofContainer key={idx} {...e} type={e.type}/>)}
        </Page>
    );
}




const msp = () => {
    return state => {
        return {exerciseData: state.exerciseData}
    }
}


export default connect(msp)(Exercises)





