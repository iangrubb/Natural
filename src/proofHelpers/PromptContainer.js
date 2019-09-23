import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import Instructions from '../prompts/Instructions'
import Options from '../prompts/Options'

import fill from '../helpers/fill'
import findAbove from '../helpers/findAbove'
import sentenceEquality from '../helpers/sentenceEquality'

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
const Content = styled.div`
    width: 90%;
    height: 70%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`



const choosePrompt = (state, goalSentence, focusSentence, dispatch) => {

    if (!state.sentences.find(s=> !s.jusificationId)) {
        return null
    } else if (!goalSentence) {
        return <Instructions text="choose a goal sentence"/>
    } else if (!focusSentence) {
        return <Instructions text="choose a focus sentence"/>
    } else {
        if (goalSentence.id === focusSentence.id) {
            
            // Intro Rules

            switch (focusSentence.content.type) {
                case "conjunction":
                    return (
                        <Options
                            instructions={"Do you plan to prove both conjuncts?"}
                            prompts={["confirm", "cancel"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)},
                                ()=>{dispatch({type: "UNSET FOCUS"})}
                        ]}/>
                    )
                case "disjunction":
                    return (
                        <Options
                            instructions={"Which disjunct do you plan to prove?"}
                            prompts={["left", "right"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {side: "left"}, dispatch)},
                                ()=>{fill(state, goalSentence, focusSentence, {side: "right"}, dispatch)}
                        ]}/>
                    )
                case "conditional":
                    return (
                        <Options
                            instructions={"Proving a conditional requires proving its consequent after assuming its antecedent."}
                            prompts={["confirm", "cancel"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {}, dispatch)},
                                ()=>{dispatch({type: "UNSET FOCUS"})}
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
                    const antecedent = state.sentences.find( s => sentenceEquality(s.content, focusSentence.content.left) && findAbove(goalSentence.id, s.id, state.proofs))

                    if (antecedent) {
                        return (
                            <Options
                            instructions={"You already have the antecedent, so you can use the consequent."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {antecedent: antecedent}, dispatch)}
                        ]}/>
                        )
                    } else {
                        return (
                            <Options
                            instructions={"In order to use the consequent, you must prove the antecedent."}
                            prompts={["ok"]}
                            actions={[
                                ()=>{fill(state, goalSentence, focusSentence, {antecedent: antecedent}, dispatch)}
                        ]}/>
                        )
                    }
                case "disjunction":
                    return (
                        <Options
                            instructions={"You can derive the goal by deriving it from each disjunct."}
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
            <h3 style={{margin:'4px'}}>Instructions</h3>
            <Content>
                {props.choosePrompt(props.state, props.goalSentence, props.focusSentence)}
            </Content>
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
        choosePrompt: (state, goal, focus) => choosePrompt(state, goal, focus, dispatch)
    }
}

export default connect(msp, mdp)(PromptContainer)
