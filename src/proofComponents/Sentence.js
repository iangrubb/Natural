import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import display from '../helpers/display'


const Container = styled.div`
    height: 40px;
    width: fit-content;
    border-radius: 10px;

    margin: ${props => props.goal?'80px':'10px'} 40px 10px 10px;
    padding: 0 10px;

    background: #aaa;

    display: flex;
    justify-content: center;
    align-items: center;
`


const Sentence = props => {
    return (
        <Container goal={props.goal}>
            {display(props.content, true)}
        </Container>
    );
}
const msp = () => {
    return (state, ownProps) => {
        const sentence = state.sentences.find(s=>s.id === ownProps.id)
        return {...state, content: sentence.content, goal: !sentence.justificationId}
    }
}

export default connect(msp)(Sentence)
