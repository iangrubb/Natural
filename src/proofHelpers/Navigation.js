import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import Button from '../userInterface/Button'

import {colors, fonts} from '../styles'

const Container = styled.div`
    width: 84%;
    height: 10%;

    border-radius: 2px;

    background: ${colors.lightSurface};
    border: 12px solid ${colors.mediumSurface};
    box-shadow: 4px 4px 0 ${colors.darkSurface};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Navigation = props => {
    return (
        <Container>
            <h4 style={{margin:'4px'}}>Navigate</h4>
            <Buttons>
                <Button text={"back"} active={props.back && !props.lemmaFlag && props.currentGoal && props.messageQue.length === 0} onClick={props.advance(props.state, props.stateRecord, props.stage - 1, true)}/>
                <Button text={"forward"} active={props.forward && !props.lemmaFlag && props.currentGoal && props.messageQue.length === 0} onClick={props.advance(props.state, props.stateRecord, props.stage + 1, false)}/>
            </Buttons>
        </Container>
    );
}


const msp = () => {
    return (state, ownProps) => {
        const timing = !state.currentFocus
        return {state: state, ...state, forward: state.maxStage > state.stage && timing, back: state.stage > 0 && timing}
    }
}

const mdp = dispatch => {
    return {
        advance: (state, records, stageTo, back) => () => {

            if (records.length === state.maxStage && back) {
                dispatch({
                    type: "RECORD STATE",
                    proofs: state.proofs,
                    sentences: state.sentences,
                    justifications: state.justifications,
                    currentGoal: state.currentGoal,
                    proofCounter: state.proofCounter,
                    sentenceCounter: state.sentenceCounter,
                    justificationCounter: state.justificationCounter,
                    globalConstants: state.globalConstants,
                })
            }

            const record = records[stageTo]
            dispatch({type: "ADVANCE PROOFS", value: record.proofs})
            dispatch({type: "ADVANCE SENTENCES", value: record.sentences})
            dispatch({type: "ADVANCE JUSTIFICATIONS", value: record.justifications})
            dispatch({type: "ADVANCE CURRENT GOAL", value: record.currentGoal})
            dispatch({type: "ADVANCE JUSTIFICATION COUNTER", value: record.justificationCounter})
            dispatch({type: "ADVANCE PROOF COUNTER", value: record.proofCounter})
            dispatch({type: "ADVANCE SENTENCE COUNTER", value: record.sentenceCounter})
            dispatch({type: "ADVANCE GLOBAL CONSTANTS", value: record.globalConstants})
            dispatch({type: "SET STAGE", stage: stageTo})
        }
    }
}

export default connect(msp, mdp)(Navigation)
