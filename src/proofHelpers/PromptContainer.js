import React, { useState } from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import Instructions from '../prompts/Instructions'
import Options from '../prompts/Options'
import IntroChoice from '../prompts/IntroChoice'
import ConstantChoice from '../prompts/ConstantChoice'

import fill from '../helpers/fill'
import findAbove from '../helpers/findAbove'
import sentenceEquality from '../helpers/sentenceEquality'

import Button from '../userInterface/Button'

import {colors, fonts} from '../styles'

const Container = styled.div`
    width: 84%;
    height: 28%;

    border-radius: 2px;

    background: ${colors.lightSurface};
    border: 12px solid ${colors.mediumSurface};

    box-shadow: 4px 4px 0 ${colors.darkSurface};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Alternative = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`



const choosePrompt = (state, goalSentence, focusSentence, dispatch, lemmaFlag, setLemmaFlag) => {
    
    if (!state.sentences.find(s=> !s.jusificationId)) {
        return null
    } else if (!goalSentence) {
        return <Instructions text="Select a goal sentence you want to work towards proving"/>
    } else if (lemmaFlag) {
        return <Instructions text="Input a lemma that you can prove and that would help you reach the goal."/>
    } else if (!focusSentence) {
        return <Instructions text="Select a sentence to attempt to use its logic to achieve the current goal."/>
    } else {
        if (goalSentence.id === focusSentence.id) {

            // Intro Rules
            switch (focusSentence.content.type) {
                case "conjunction":
                    const foundLeft = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.left) && findAbove(goalSentence.id, s.id, state.proofs))
                    const foundRight = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.right) && findAbove(goalSentence.id, s.id, state.proofs))
                    return (
                        <Options
                            instructions={"Proving a conjunction requires proving both conjuncts."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", foundLeft: foundLeft, foundRight: foundRight}, dispatch)}
                        ]}/>
                    )
                case "disjunction":
                    const disLeft = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.left) && findAbove(goalSentence.id, s.id, state.proofs))
                    const disRight = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.right) && findAbove(goalSentence.id, s.id, state.proofs))

                    return (
                        <Options
                            instructions={"Which disjunct do you plan to prove?"}
                            prompts={["left", "right"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", side: "left", found: disLeft}, dispatch)},
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", side: "right", found: disRight}, dispatch)}
                        ]}/>
                    )
                case "conditional":
                    return (
                        <Options
                            instructions={"Proving a conditional requires proving its consequent after assuming its antecedent."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch)}
                        ]}/>
                    )
                case "negation":
                    return (
                        <Options
                            instructions={"Proving a negation requires proving a contradiction after assuming its opposite."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch)}
                        ]}/>
                    )
                case "existential":
                    return (
                        <ConstantChoice instructions={"Choose a constant"} constants={state.globalConstants}
                        onClick={constant => () => fill(state, goalSentence, focusSentence, {rule: "canon", constant: constant}, dispatch)}/>
                    )
                case "universal":
                    return (
                        <Options
                            instructions={"Prove everything has a property by proving that an arbitrary object has the property."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch)}
                        ]}/>
                    )
                        
            }
                        
        } else {
           
            // Elim Rules

            switch (focusSentence.content.type) {
                case "conjunction":
                    return (
                        <Options
                            instructions={"Which conjunct do you want to use?"}
                            prompts={["left", "right"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {side: "left"}, dispatch)},
                                ()=>{fill(state, goalSentence, focusSentence, {side: "right"}, dispatch)}
                        ]}/>
                    )
                case "conditional":
                    return (
                        <Options
                        instructions={"As long as you can prove its antecedent, this conditional allows you to use its consequent."}
                        prompts={["ok"]}
                        actions={[
                            ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                    ]}/>
                    )
                case "disjunction":
                    return (
                        <Options
                            instructions={"You can derive the goal by deriving it from each disjunct."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                        ]}/>
                    )
                case "negation":
                    return (
                        <Options
                        instructions={"As long as you can prove its opposite, this negation allows you to derive a contradiction."}
                        prompts={["ok"]}
                        actions={[
                            ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                    ]}/>
                    )
                case "universal":
                    return (
                        <ConstantChoice instructions={"Choose a constant"} constants={state.globalConstants}
                        onClick={constant => () => fill(state, goalSentence, focusSentence, {constant: constant}, dispatch)}/>
                    )
                case "existential":
                    return (
                        <Options
                            instructions={"Using an existential sentence to achieve a goal requires showing how an arbitrary object's having the property in question shows the goal."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                        ]}/>
                    )


            }

        }
    }

}





const PromptContainer = props => {

    return (
        <Container>
            {props.complete ? 
            null :
            <>
            {/* Main Prompt */}
            {props.choosePrompt(props.state, props.goalSentence, props.focusSentence, props.lemmaFlag, props.setLemmaFlag)}

            {/* Optional Lemma Prompt */}
            {props.goalSentence && !props.lemmaFlag && !props.focusSentence ?
                <Alternative>
                    <p>You may instead add a new lemma to the proof:</p>
                    <Button text={"lemma"} active={true} onClick={()=>props.setLemmaFlag(true)}/>
                </Alternative>
            : null}

            {/* Optional Cancel Button */}


            {props.focusSentence ? <Button text={"cancel"} active={true} onClick={props.cancel}/>: null}

            {/* Optional Special Rules Prompt */}

            {props.focusSentence && props.goalSentence.id === props.focusSentence.id ?
            <Alternative>
                <p>You may instead use a special rule:</p>
                <ButtonRow>
                    <Button text="DNE" active={true} onClick={props.specialRule(props.state, props.goalSentence, props.focusSentence, "dne")} />
                    <Button text="Reit" active={true}  onClick={props.specialRule(props.state, props.goalSentence, props.focusSentence, "reit")} />
                    <Button text ="Exp" active={true} onClick={props.specialRule(props.state, props.goalSentence, props.focusSentence, "exp")} />  
                </ButtonRow>
            </Alternative>
            : null }







            </>
            }
        </Container>
    );
}
 
const msp = () => {
    return (state, ownProps) => {
        
        return {...state, goalSentence: state.sentences.find(s=>s.id===state.currentGoal) , focusSentence: state.sentences.find(s=>s.id===state.currentFocus), state: state}
    }
}

const mdp = dispatch => {
    return {
        choosePrompt: (state, goal, focus, lemmaFlag, setLemmaFlag) => choosePrompt(state, goal, focus, dispatch, lemmaFlag, setLemmaFlag),
        cancel: ()=>dispatch({type: "UNSET FOCUS"}),
        specialRule: (state, goal, focus, rule) => () => fill(state, goal, focus, {rule: rule}, dispatch)
    }
}

export default connect(msp, mdp)(PromptContainer)