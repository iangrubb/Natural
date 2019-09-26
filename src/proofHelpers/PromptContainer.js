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

const Container = styled.div`
    width: 90%;
    height: 30%;

    background: #ccc;

    border-radius: 4px;
    box-shadow: 2px 2px 4px #999;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Content = styled.div`
    width: 90%;
    height: 70%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`



const choosePrompt = (state, goalSentence, focusSentence, dispatch, choiceRecord, setChoiceRecord) => {
    
    if (!state.sentences.find(s=> !s.jusificationId)) {
        return null
    } else if (!goalSentence) {
        return <Instructions text="Select a goal sentence you want to work towards proving"/>
    } else if (!focusSentence) {
        return <Instructions text= "Select a sentence to use its logic to achieve the current goal"/>
    } else {
        if (goalSentence.id === focusSentence.id) {
            // Intro Rules
            if (choiceRecord) {
                switch (choiceRecord) {
                    case "dne":
                        return (
                            <Options
                                instructions={"You can prove this sentence by proving its double negation."}
                                prompts={["ok"]}
                                actions={[
                                    ()=>{fill(state, goalSentence, focusSentence, {rule: "dne"}, dispatch, setChoiceRecord)},
                            ]}/>
                        )
                    case "reit":
                        const copy = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content) && findAbove(goalSentence.id, s.id, state.proofs))
                        
                        if (copy) {
                            return (
                                <Options
                                    instructions={"You can achieve this goal since you proved it above."}
                                    prompts={["ok"]}
                                    actions={[
                                        ()=>{fill(state, goalSentence, focusSentence, {rule: "reit", copyId: copy.id}, dispatch, setChoiceRecord)}
                                    ]}
                                />
                            )
                        } else {
                            return (
                                <Options
                                    instructions={"This rule only has an effect if you proved the goal above."}
                                    prompts={["ok"]}
                                    actions={[
                                        ()=>{fill(state, goalSentence, focusSentence, {rule: "reit", copyId: null}, dispatch, setChoiceRecord)}
                                    ]}
                                />
                            )
                        }
                    case "exp":
                        return (
                            <Options
                                instructions={"You can prove this sentence by proving a contradiction."}
                                prompts={["ok"]}
                                actions={[
                                    ()=>{fill(state, goalSentence, focusSentence, {rule: "exp"}, dispatch, setChoiceRecord)},
                            ]}/>
                        )
                    case "canon":
                        switch (focusSentence.content.type) {
                            case "conjunction":
                                const foundLeft = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.left) && findAbove(goalSentence.id, s.id, state.proofs))
                                const foundRight = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.right) && findAbove(goalSentence.id, s.id, state.proofs))
                                return (
                                    <Options
                                        instructions={"Proving a conjunction requires proving both conjuncts."}
                                        prompts={["ok"]}
                                        actions={[
                                            ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", foundLeft: foundLeft, foundRight: foundRight}, dispatch, setChoiceRecord)}
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
                                            ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", side: "left", found: disLeft}, dispatch, setChoiceRecord)},
                                            ()=>{fill(state, goalSentence, focusSentence, {rule: "canon", side: "right", found: disRight}, dispatch, setChoiceRecord)}
                                    ]}/>
                                )
                            case "conditional":
                                return (
                                    <Options
                                        instructions={"Proving a conditional requires proving its consequent after assuming its antecedent."}
                                        prompts={["ok"]}
                                        actions={[
                                            ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch, setChoiceRecord)}
                                    ]}/>
                                )
                            case "negation":
                                return (
                                    <Options
                                        instructions={"Proving a negation requires proving a contradiction after assuming its opposite."}
                                        prompts={["ok"]}
                                        actions={[
                                            ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch, setChoiceRecord)}
                                    ]}/>
                                )
                            case "contradiction":
                                return (
                                    <Options
                                        instructions={"Derive this by proving some sentence and its negation. (make this a proper rule!!)"}
                                        prompts={["ok"]}
                                        actions={[
                                            ()=>{dispatch({type: "UNSET FOCUS"})}
                                    ]}/>
                                ) 
                            case "existential":
                                return (
                                    <ConstantChoice instructions={"Chose a constant"} constants={state.globalConstants}
                                    onClick={constant => () => fill(state, goalSentence, focusSentence, {rule: "canon", constant: constant}, dispatch, setChoiceRecord)}/>
                                )
                            case "universal":
                                return (
                                    <Options
                                        instructions={"Prove everything has a property by proving that an arbitrary object has the property."}
                                        prompts={["ok"]}
                                        actions={[
                                            ()=>{fill(state, goalSentence, focusSentence, {rule: "canon"}, dispatch, setChoiceRecord)}
                                    ]}/>
                                )
                        }
                }
            } else {
                return < IntroChoice setChoiceRecord={setChoiceRecord} contradiction={goalSentence.content.type==="contradiction"} atom={goalSentence.content.type === "atom"} />
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
                                ()=>{fill(state, goalSentence, focusSentence, {side: "left"}, dispatch, setChoiceRecord)},
                                ()=>{fill(state, goalSentence, focusSentence, {side: "right"}, dispatch, setChoiceRecord)}
                        ]}/>
                    )
                case "conditional":
                    const antecedent = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.left) && findAbove(goalSentence.id, s.id, state.proofs))

                    if (antecedent) {
                        return (
                            <Options
                            instructions={"You already have the antecedent, so you can use the consequent."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {antecedent: antecedent}, dispatch, setChoiceRecord)}
                        ]}/>
                        )
                    } else {
                        return (
                            <Options
                            instructions={"In order to use the consequent, you must prove the antecedent."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {antecedent: antecedent}, dispatch, setChoiceRecord)}
                        ]}/>
                        )
                    }
                case "disjunction":
                    return (
                        <Options
                            instructions={"You can derive the goal by deriving it from each disjunct."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {}, dispatch, setChoiceRecord)}
                        ]}/>
                    )
                case "negation":
                    const unnegated = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.right) && findAbove(goalSentence.id, s.id, state.proofs))

                    if (unnegated) {
                        return (
                            <Options
                            instructions={"You've already proved contadictory sentences, so you can derive a contradiction."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {unnegated: unnegated}, dispatch, setChoiceRecord)}
                        ]}/>
                        )
                    } else {
                        return (
                            <Options
                            instructions={"In order to derive a contradiction, you must prove the non-negated sentence."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {unnegated: unnegated}, dispatch, setChoiceRecord)}
                        ]}/>
                        )
                    }
                case "contradiction":
                    return (
                        <Options
                        instructions={"Anything follows from a contradiction, including your goal."}
                        prompts={["ok"]}
                        actions={[
                            ()=>{fill(state, goalSentence, focusSentence, {}, dispatch, setChoiceRecord)}
                    ]}/>
                    )
                case "universal":
                    return (
                        <ConstantChoice instructions={"Chose a constant"} constants={state.globalConstants}
                        onClick={constant => () => fill(state, goalSentence, focusSentence, {constant: constant}, dispatch, setChoiceRecord)}/>
                    )
                case "existential":
                    return (
                        <Options
                            instructions={"Using an existential sentence to achieve a goal requires showing how an arbitrary object's having the property in question shows the goal."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {}, dispatch, setChoiceRecord)}
                        ]}/>
                    )


            }

        }
    }

}





const PromptContainer = props => {

    const [choiceRecord, setChoiceRecord] = useState(null)

    return (
        <Container>
            {props.complete ? 
            null :
            <>
            <h3 style={{margin:'4px'}}>Instructions</h3>
            <Content>
                {props.choosePrompt(props.state, props.goalSentence, props.focusSentence, choiceRecord, setChoiceRecord)}
            </Content>
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
        choosePrompt: (state, goal, focus, choiceRecord, setChoiceRecord) => choosePrompt(state, goal, focus, dispatch, choiceRecord, setChoiceRecord)
    }
}

export default connect(msp, mdp)(PromptContainer)
