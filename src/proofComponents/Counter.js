import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

const Container = styled.div`
    width: 40px;
    height: 40px;

    margin: ${props => props.goal?'75px':'5px'} 0 10px 0;
    font-weight: 700;
    font-size: 1.4em;


    color: ${props => props.dark ? '#222' : '#555'};

    display: flex;
    justify-content: center;
    align-items: center;
`

const Counter = props => {
    return (
        <Container goal={props.goal} dark={props.display}>
           {props.display ? props.order : '?'}
        </Container>
    );
}

const msp = () => {
    return (state, ownProps) => {
        const sentence = state.sentences.find(s=>s.id === ownProps.id)


        return {...state, goal: !sentence.justificationId, display: ownProps.firstGoalPosition < 0 || ownProps.firstGoalPosition > ownProps.order - 1}
    }
}

export default connect(msp)(Counter)
