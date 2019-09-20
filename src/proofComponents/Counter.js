import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

const Container = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;

    margin: ${props => props.goal?'50px':'10px'} 0 10px 0;
    font-weight: 700;

    background: #aaa;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Counter = props => {
    console.log(props.goal)
    return (
        <Container goal={props.goal}>
           {props.order}
        </Container>
    );
}

const msp = () => {
    return (state, ownProps) => {
        const sentence = state.sentences.find(s=>s.id === ownProps.id)
        return {...state, goal: !sentence.justificationId}
    }
}

export default connect(msp)(Counter)
