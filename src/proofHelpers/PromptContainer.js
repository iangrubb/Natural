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



const choosePrompt = (state, goalSentence, focusSentence, dispatch, lemmaFlag, setLemmaFlag, messageQue) => {
    
    if (messageQue.length > 0) {

        dispatch({type: "SET HIGHLIGHTS", ids: messageQue[0].focusIds})

        return (
            <Options
                instructions={messageQue[0].message}
                prompts={["ok"]}
                actions={[
                    ()=>{
                        dispatch({type:"SHIFT"})
                        dispatch({type:"UNSET HIGHLIGHTS"})
                    }
            ]}/>
        )


        // Callback shifts array and unsets highlights



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
                case "conjunction":
                    const foundLeft = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.left) && findAbove(goalSentence.id, s.id, state.proofs))
                    const foundRight = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.right) && findAbove(goalSentence.id, s.id, state.proofs))
                    
                    return (
                        <Options
                            instructions={"Proving this conjunction will require proving both conjuncts."}
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
                            instructions={"Proving this disjunction requires proving one of its disjuncts. Which disjunct do you plan to prove?"}
                            prompts={["left", "right"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", side: "left", found: disLeft}, dispatch)},
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", side: "right", found: disRight}, dispatch)}
                        ]}/>
                    )
                case "conditional":
                    return (
                        <Options
                            instructions={"Proving this conditional requires a proof of its consequent from its antecedent."}
                            prompts={["confirm"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch)}
                        ]}/>
                    )
                case "negation":
                    return (
                        <Options
                            instructions={"Proving this negation requires proving a proof of a contradiction from its opposite."}
                            prompts={["confirm"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch)}
                        ]}/>
                    )
                case "existential":
                    return (
                        <ConstantChoice instructions={"Proving this existential requires proving that the property it ascribes holds for some constant. What constant do you choose?"} constants={state.globalConstants}
                        onClick={constant => () => fill(state, goalSentence, focusSentence, {rule: "canon", constant: constant}, dispatch)}/>
                    )
                case "universal":
                    return (
                        <Options
                            instructions={"Proving this universal requires proving that an arbitrary object as the property ascribed."}
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
                            instructions={"This conjunction can be used to establish either conjunct. Which conjunct do you want to establish now?"}
                            prompts={["left", "right"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {side: "left"}, dispatch)},
                                ()=>{fill(state, goalSentence, focusSentence, {side: "right"}, dispatch)}
                        ]}/>
                    )
                case "conditional":
                    return (
                        <Options
                        instructions={"This conditional allows you to use its consequent, as long as you can prove its antecedent."}
                        prompts={["confirm"]}
                        actions={[
                            ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                    ]}/>
                    )
                case "disjunction":
                    return (
                        <Options
                            instructions={"This disjunction allows you to establish the goal, as long as you can establish it from each disjunct."}
                            prompts={["confirm"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                        ]}/>
                    )
                case "negation":
                    return (
                        <Options
                        instructions={"This negation allows you to derive a contradiction, as long as you can prove its opposite."}
                        prompts={["confirm"]}
                        actions={[
                            ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)}
                    ]}/>
                    )
                case "universal":
                    return (
                        <ConstantChoice instructions={"This universal allows you to establish that the property it ascribes holds for a any constant. What constant do you choose?"} constants={state.globalConstants}
                        onClick={constant => () => fill(state, goalSentence, focusSentence, {constant: constant}, dispatch)}/>
                    )
                case "existential":
                    return (
                        <Options
                            instructions={"This existential allows you to establish the goal, as long as you can establish it while assuming that an arbitrary object has the property it ascribes."}
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
            null :
            <>
            {/* Main Prompt */}
            {props.choosePrompt(props.state, props.goalSentence, props.focusSentence, props.lemmaFlag, props.setLemmaFlag, props.messageQue)}

            {/* Optional Lemma Prompt */}

            {props.goalSentence && !props.lemmaFlag && !props.focusSentence && props.messageQue.length === 0 ?
                <Alternative>
                    <p>You may instead add a new lemma to the proof:</p>
                    <Button minor={true} text={"lemma"} active={true} onClick={()=>props.setLemmaFlag(true)}/>
                </Alternative>
            : null}

            {/* Optional Cancel Button */}


            {props.focusSentence ? <Button minor={true} text={"cancel"} active={true} onClick={props.cancel}/>: null}

            {/* Optional Special Rules Prompt */}

            {props.focusSentence && props.goalSentence.id === props.focusSentence.id ?
            <Alternative>
                <p>You may instead use a special rule:</p>
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