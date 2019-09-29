import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import Button from '../userInterface/Button'

import display from '../helpers/display'

import {colors, fonts} from '../styles'

const Container = styled.div`
    width: 90%;
    height: 16%;

    background: ${colors.mediumSurface};

    box-shadow: 4px 4px 0 ${colors.darkSurface};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TextContainer = styled.div`
    width:90%;
    height: 40px;
    margin: 4px 0;

    display: flex;
    justify-content: center;
    align-items: center;
    
    background: ${colors.whiteSurface};
`

const Goal = props => {
    return (
        <Container>
            {props.complete ?
            <h1 style={{textAlign:'center'}}>Proof Complete!</h1> :
            <>
                <h4 style={{margin:'4px'}}>Current Goal</h4>
                <TextContainer><div style={{display: 'flex', alignItems:'flex-end'}}>{props.goalSentence}</div></TextContainer>
                <Button text={'change'} active={props.currentGoal && !props.currentFocus && !props.lemmaFlag} onClick={props.onClick(props.currentGoal && !props.currentFocus)}/>
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
