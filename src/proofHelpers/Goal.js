import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import Button from '../userInterface/Button'

import display from '../helpers/display'

import {colors, fonts} from '../styles'

const Container = styled.div`
    width: 84%;
    height: 90px;

    margin: 8px 0;

    border-radius: 2px;

    background: ${colors.lightSurface};
    border: 12px solid ${colors.mediumSurface};

    box-shadow: 4px 4px 0 ${colors.darkSurface};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TextContainer = styled.div`
    width:90%;
    height: 40px;

    font-size: 1.3em;
    font-family: ${fonts.text}

    display: flex;
    justify-content: center;
    align-items: center;
    
    background: ${colors.lightSurface};
`

const Label = styled.h2`

    font-size: ${props => props.size}em;
    text-align: center;
    margin: 10px 0 0 0;

`

const Goal = props => {
    return (
        <Container>
            {props.complete ?
            null :
            <>
                <Label size={1}>Current Goal</Label>
                <TextContainer>{props.goalSentence}</TextContainer>
                <Button minor={true} text={'change'} active={props.currentGoal && !props.currentFocus && !props.lemmaFlag && props.messageQue.length === 0} onClick={props.onClick(props.currentGoal && !props.currentFocus)}/>
            </>}
        </Container>
    );
}

const msp = () => {
    return state => {
        const goalSentence = state.currentGoal ? display(state.sentences.find(s=>s.id===state.currentGoal).content, true) : "(none)"

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
