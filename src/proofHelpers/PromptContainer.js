import React, { useState } from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import Instructions from '../prompts/Instructions'
import Options from '../prompts/Options'
import ConstantChoice from '../prompts/ConstantChoice'

import fill from '../helpers/fill'
import findAbove from '../helpers/findAbove'
import sentenceEquality from '../helpers/sentenceEquality'

import Button from '../userInterface/Button'

import {colors, fonts} from '../styles'

const Container = styled.div`
    width: 84%;
    height: 300px;

    border-radius: 2px;

    margin: 8px 0;

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

    text-align: center;

    font-size: 0.9em;

    padding: 10px;

`

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const Prompt = styled.div`

`
const Label = styled.h2`

    padding: 10px;

    font-size: ${props => props.size}em;
    text-align: center;
    margin: 10px 0 0 0;

`


const choosePrompt = (state, goalSentence, focusSentence, dispatch, lemmaFlag, setLemmaFlag, messageQue) => {
    
    if (messageQue.length > 0) {

        dispatch({type: "SET HIGHLIGHTS", ids: messageQue[0].focusIds})

        return (
            <Options
                cta={messageQue[0].message}
                prompts={["ok"]}
                actions={[
                    ()=>{
                        dispatch({type:"SHIFT"})
                        dispatch({type:"UNSET HIGHLIGHTS"})
                    }
            ]}/>
        )

    } else if (!state.sentences.find(s=> !s.jusificationId)) {
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
                case "atom":
                    return <Instructions text="There's no normal introduction rule for proving an atomic sentence."/>

                case "conjunction":
                    const foundLeft = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.left) && findAbove(goalSentence.id, s.id, state.proofs))
                    const foundRight = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.right) && findAbove(goalSentence.id, s.id, state.proofs))
                    
                    return (
                        <Options
                            instructions={"Proving this conjunction requires proving both conjuncts."}
                            cta={"Add the conjuncts as new goals?"}
                            prompts={["confirm"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", foundLeft: foundLeft, foundRight: foundRight}, dispatch)}
                        ]}/>
                    )
                case "disjunction":
                    const disLeft = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.left) && findAbove(goalSentence.id, s.id, state.proofs))
                    const disRight = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.right) && findAbove(goalSentence.id, s.id, state.proofs))

                    return (
                        <Options
                            instructions={"Proving this disjunction requires proving one of its disjuncts."}
                            cta={"Which disjunct do you want to add as a new goal?"}
                            prompts={["left", "right"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", side: "left", found: disLeft}, dispatch)},
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", side: "right", found: disRight}, dispatch)}
                        ]}/>
                    )
                case "conditional":
                    return (
                        <Options
                            instructions={"Proving this conditional requires deriving its consequent from its antecedent."}
                            cta={"Start a new subproof?"}
                            prompts={["confirm"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch)}
                        ]}/>
                    )
                case "negation":
                    return (
                        <Options
                            instructions={"Proving this negation requires deriving a contradiction from its opposite."}
                            cta={"Start a new subproof?"}
                            prompts={["confirm"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch)}
                        ]}/>
                    )
                case "existential":
                    return (
                        <ConstantChoice instructions="Proving this existential requires proving that the property it ascribes holds for some constant."
                        cta="What constant is the property true of?" 
                        constants={state.globalConstants}
                        onClick={constant => () => fill(state, goalSentence, focusSentence, {rule: "canon", constant: constant}, dispatch)}/>
                    )
                case "universal":
                    return (
                        <Options
                            instructions="Proving this universal requires proving that an arbitrary object has the property ascribed."
                            cta="Start a new subproof?"
                            prompts={["confirm"]}
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
                            instructions="This conjunction can be used to prove either conjunct."
                            cta="Which conjunct do you want to establish now?"
                            prompts={["left", "right"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {side: "left"}, dispatch)},
                                ()=>{fill(state, goalSentence, focusSentence, {side: "right"}, dispatch)}
                        ]}/>
                    )
                case "conditional":
                    return (
                        <Options
                        instructions="This conditional allows you to derive its consequent, as long as you can prove its antecedent."
                        cta="Add the consequent to proof?"
                        prompts={["confirm"]}
                        actions={[
                            ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                    ]}/>
                    )
                case "disjunction":
                    return (
                        <Options
                            instructions="This disjunction allows you to prove the goal by showing that it would follow from each of the disjuncts."
                            cta="Start new subproofs?"
                            prompts={["confirm"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                        ]}/>
                    )
                case "negation":
                    return (
                        <Options
                        instructions="This negation allows you to derive a contradiction, as long as you can prove its opposite."
                        cta="Add a contradiction to the proof?"
                        prompts={["confirm"]}
                        actions={[
                            ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                    ]}/>
                    )
                case "universal":
                    return (
                        <ConstantChoice instructions={"This universal allows you to prove that the property it ascribes holds for a constant."}
                        cta="What constant do you you want to prove this for now?"
                        constants={state.globalConstants}
                        onClick={constant => () => fill(state, goalSentence, focusSentence, {constant: constant}, dispatch)}/>
                    )
                case "existential":
                    return (
                        <Options
                            instructions={"This existential allows you to prove the goal by proving that the goal would follow from an arbitrary constant's having the property the existential ascribes."}
                            cta="Start a new suproof?"
                            prompts={["confirm"]}
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
            <Label size={1.8}>Proof Complete!</Label> :
            <>
            {/* Main Prompt */}
            {props.choosePrompt(props.state, props.goalSentence, props.focusSentence, props.lemmaFlag, props.setLemmaFlag, props.messageQue)}

            {/* Optional Lemma Prompt */}

            {props.goalSentence && !props.lemmaFlag && !props.focusSentence && props.messageQue.length === 0 ?
                <Alternative>
                    <Prompt>Instead, you may add a new lemma to the proof:</Prompt>
                    <Button minor={true} text={"lemma"} active={true} onClick={()=>props.setLemmaFlag(true)}/>
                </Alternative>
            : null}

            {/* Optional Cancel Button */}


            {props.focusSentence ? <Button minor={true} text={"cancel"} active={true} onClick={props.cancel}/>: null}

            {/* Optional Special Rules Prompt */}

            {props.focusSentence && props.goalSentence.id === props.focusSentence.id ?
            <Alternative>
                <Prompt>Instead, you may use a special introduction rule:</Prompt>
                <ButtonRow>
                    <Button minor={true} text="DNE" active={true} onClick={props.specialRule(props.state, props.goalSentence, props.focusSentence, "dne")} />
                    <Button minor={true} text="Reit" active={true}  onClick={props.specialRule(props.state, props.goalSentence, props.focusSentence, "reit")} />
                    <Button minor={true} text ="Exp" active={true} onClick={props.specialRule(props.state, props.goalSentence, props.focusSentence, "exp")} />  
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
        choosePrompt: (state, goal, focus, lemmaFlag, setLemmaFlag, messageQue) => choosePrompt(state, goal, focus, dispatch, lemmaFlag, setLemmaFlag, messageQue),
        cancel: ()=>{
            dispatch({type: "UNSET FOCUS"})
            dispatch({type: "UNSET HIGHLIGHTS"})
        },
        specialRule: (state, goal, focus, rule) => () => fill(state, goal, focus, {rule: rule}, dispatch)
    }
}

export default connect(msp, mdp)(PromptContainer)