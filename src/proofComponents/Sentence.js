import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import display from '../helpers/display'
import findAbove from '../helpers/findAbove'


const Container = styled.div`
    height: 40px;
    width: fit-content;
    border-radius: 10px;

    margin: ${props => props.isGoal?'75px':'5px'} 40px 10px 10px;
    padding: 0 5px;

    background: ${props => props.active ? '#aaa' : 'none'};
    border: ${props => props.active ? '1px solid #333' : 'none'};
    box-shadow: ${props => props.active ? '1px 1px 1px #111' : 'none'};

    display: flex;
    justify-content: center;
    align-items: center;
`


const Sentence = props => {
    return (
        <Container isGoal={props.isGoal} active={props.active} onClick={props.active ? props.onClick(props.globalGoal, props.focus, props.sentence, props.options) : null}>
            {display(props.sentence.content, true)}
        </Container>
    );
}







const active = (sentence, goal, focus, proofs) => {
    if (!goal) {
        // No goal set
        return !sentence.justificationId
    } else if (!focus) {
        // No focus set
        return (sentence.id === goal.id) || (sentence.content.type !== "atom" && findAbove(goal.id, sentence.id, proofs))
    } else {
        return false
    }
}

const msp = () => {
    return (state, ownProps) => {
        const sentence = state.sentences.find(s=>s.id === ownProps.id)
        const goal = state.sentences.find(s=>s.id === state.currentGoal)
        const focus = state.sentences.find(s=>s.id === state.currentFocus)

        return {
            ...state,
            isGoal: !sentence.justificationId,
            sentence: sentence,
            globalGoal: goal,
            focus: focus,
            active: active(sentence, goal, focus, state.proofs)
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
