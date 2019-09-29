import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'
import Fade from 'react-reveal'

import display from '../helpers/display'
import findAbove from '../helpers/findAbove'

import { colors, fonts } from '../styles'



const pickBackground = relevance => {
    if (relevance === "available") {
        return colors.availableBackground
    } else if (relevance === "goal") {
        return colors.currentGoalBackground
    } else {
        return 'none'
    }
}


const Container = styled.div`

    height: 28px;
    width: fit-content;
    border-radius: 4px;

    font-family: ${fonts.text}

    margin: ${props => props.isAGoal ?'75px':'5px'} 40px 5px 5px;
    padding: 4px 8px;

    transition: margin 0.4s ease;

    background: ${props => pickBackground(props.relevance)};
    border: ${props => props.active ? `4px solid ${colors.focusOutline}` : 'none'};

    box-shadow: ${props => props.clickable ? `2px 2px 0 ${colors.darkSurface}` : "none"}


    display: flex;
    justify-content: center;
    align-items: center;
`


const Sentence = props => {
    return (
        <Fade right>
            <Container 
                relevance={props.relevance}
                clickable={props.clickable}
                isAGoal={props.isAGoal}
                onClick={props.clickable ? props.onClick(props.globalGoal, props.focus, props.sentence, props.options) : null}
            >
                {display(props.sentence.content, true)}
            </Container>
        </Fade>
    );
}







const relevance = (sentence, goal, proofs) => {
    if (!goal) {
        return "none"
    } else if (sentence.id === goal.id) {
        return "goal"
    } else if (findAbove(goal.id, sentence.id, proofs)) {
        return "available"
    } else {
        return "none"
    }
}

const msp = () => {
    return (state, ownProps) => {
        const sentence = state.sentences.find(s=>s.id === ownProps.id)
        const goal = state.sentences.find(s=>s.id === state.currentGoal)
        const focus = state.sentences.find(s=>s.id === state.currentFocus)

        const complete = !state.sentences.find( s => !s.justificationId )

        const rel = relevance(sentence, goal, state.proofs)

        console.log(rel)

        console.log(state, ownProps)
        return {
            ...state,
            isAGoal: !sentence.justificationId,
            sentence: sentence,
            globalGoal: goal,
            focus: focus,
            relevance: rel,
            clickable:
                (!goal && !complete && !sentence.justificationId) ||
                (rel === "goal" && goal && !focus && !ownProps.lemmaFlag && sentence.content.type !== "contradiction") ||
                (rel === "available" && goal && !focus && !ownProps.lemmaFlag && sentence.content.type !== "atom" && sentence.content.type !== "atom")
        }
    }
}

const mdp = dispatch => {
    return {onClick: (goal, focus, sentence, options) => () => {

        if (!goal) {
            dispatch({type: "SET GOAL", newId: sentence.id})
        } else if (!focus) {
            dispatch({type: "SET FOCUS", newId: sentence.id})
        }
        
    }}
}

export default connect(msp, mdp)(Sentence)
