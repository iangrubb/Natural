import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import Button from '../userInterface/Button'

import display from '../helpers/display'

const Container = styled.div`
    width: 90%;
    height: 20%;

    background: #ccc;

    border-radius: 4px;
    box-shadow: 2px 2px 4px #999;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TextContainer = styled.div`
    width:90%;
    height: 30px;
    margin: 4px 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    background: #ddd;
    border: 2px solid #aaa;
    border-radius: 4px;
`

const Goal = props => {
    return (
        <Container>
            {false ?
            <h1>Proof Complete!</h1> :
            <>
                <h3 style={{margin:'4px'}}>Current Goal</h3>
                <TextContainer>{props.goalSentence}</TextContainer>
                <Button text={'change'} active={props.currentGoal && !props.currentFocus} onClick={props.onClick(props.currentGoal && !props.currentFocus)}/>
            </>}
        </Container>
    );
}

const msp = () => {
    return state => {
        const goalSentence = state.currentGoal ? display(state.sentences.find(s=>s.id===state.currentGoal).content, true) : "None"

        return {...state, goalSentence: goalSentence}
    }
}

const mdp = dispatch => {
    return {onClick: active => () => {
        
        if (active) {
            dispatch({type: "UNSET GOAL"})
        }
    }}
}

export default connect(msp, mdp)(Goal)
