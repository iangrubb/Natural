import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

const Container = styled.div`
    height: 40px;
    border-radius: 10px;

    margin: ${props => props.goal?'80px':'10px'} 0 10px 0;
    padding: 0 10px;

    background: ${props => props.currentGoal ? '#555' : '#aaa'};

    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Justification = props => {
    console.log(props)
    return (
        <Container goal={props.goal} currentGoal={props.currentGoal}>
            {props.justification ? props.justification.type : "Goal"}
        </Container>
    );
}


const msp = () => {
    return (state, ownProps) => {
        const sent = state.sentences.find( s => s.id === ownProps.id)
        const just = state.justifications.find( j => j.id === sent.justificationId )


        return {...state, justification: just, goal: !sent.justificationId, currentGoal: state.currentGoal === ownProps.id }
    }
}

export default connect(msp)(Justification)
