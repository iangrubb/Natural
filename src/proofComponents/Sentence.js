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
    

    font-family: ${fonts.text}

    margin: ${props => props.isAGoal ?'75px':'5px'} 40px 5px ${props => props.highlighted ? "0" : "5"}px;
    padding: 4px 8px 4px ${props => props.highlighted ? "3" : "8"}px;

    transition: margin 0.4s ease;

    cursor: ${props => props.clickable ? 'pointer' : 'default'};
    
    border: 2px solid ${props => props.clickable ? ` ${colors.darkSurface}` : `${colors.lightSurface}`}
    border-radius: 4px;
    box-shadow: 3px 3px 0${props => props.clickable ? `${colors.mediumSurface}` : `${colors.lightSurface}`}

    display: flex;
    justify-content: space-between;
    align-items: center;


    color: ${colors.darkText};


    ::before {
        z-index: 2;

        content:${props => props.highlighted ? "''" : 'none'};
        position: relative;
        right: ${props => 31 + (props.depth * 39 )}px;
        height: 0;
        width: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
  
        border-left: 15px solid ${colors.pointer};
    }

    ::after {
        content:${props => props.currentGoal ? "'(goal)'" : 'none'};
        position: relative;
        left: 30px;
        width: 0;
        color: red;
        font-weight: 700;
        font-family: ${fonts.display};

    }


`



const Sentence = props => {
    return (
        <Fade right>
            <Container 
                currentGoal={props.currentGoal === props.id}
                irrelevant={props.relevance === "none"}
                clickable={props.clickable}
                highlighted={props.highlighted}
                isAGoal={props.isAGoal}
                depth={props.depth}
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

        return {
            ...state,
            isAGoal: !sentence.justificationId,
            sentence: sentence,
            globalGoal: goal,
            focus: focus,
            relevance: rel,
            highlighted: state.highlightArray.includes(ownProps.id),
            clickable:
                (!goal && !complete && !sentence.justificationId) ||
                (rel === "goal" && goal && !focus && !ownProps.lemmaFlag && sentence.content.type !== "contradiction" && state.highlightArray.length === 0) ||
                (rel === "available" && goal && !focus && !ownProps.lemmaFlag && sentence.content.type !== "atom" && sentence.content.type !== "atom" && state.highlightArray.length === 0)
        }
    }
}

const mdp = dispatch => {
    return {onClick: (goal, focus, sentence, options) => () => {

        if (!goal) {
            dispatch({type: "SET GOAL", newId: sentence.id})
        } else if (!focus) {
            dispatch({type: "SET FOCUS", newId: sentence.id})
            dispatch({type: "SET HIGHLIGHTS", ids: [sentence.id]})
        }
        
    }}
}

export default connect(msp, mdp)(Sentence)
