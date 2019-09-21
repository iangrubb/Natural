import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

const Container = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;

    margin: ${props => props.goal?'80px':'10px'} 0 10px 0;
    font-weight: 700;

    background: #aaa;

    color: ${props => props.dark ? '#222' : '#555'};

    display: flex;
    justify-content: center;
    align-items: center;
`

const Counter = props => {
    return (
        <Container goal={props.goal} dark={props.firstGoalPosition > props.order - 1}>
           {props.firstGoalPosition > props.order - 1 ? props.order : '?'}
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
