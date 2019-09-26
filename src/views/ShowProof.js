import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ProofR from '../proofComponents/Proof'
import Sentence from '../proofComponents/Sentence'
import Justification from '../proofComponents/Justification'
import Counter from '../proofComponents/Counter'

import Goal from '../proofHelpers/Goal'
import Message from '../proofHelpers/Message'
import Navigation from '../proofHelpers/Navigation'
import PromptContainer from '../proofHelpers/PromptContainer'



const Page = styled.div`
    width: 100%;
    height: calc(100% - 50px);

    display: flex;
    justify-content: center;
    align-items: center;
`

const Proof = styled.div`
    height: 90%;

    overflow: scroll;

    background: #ccc;

    border-radius: 4px;
    box-shadow: 2px 2px 4px #999;

    display: flex;
    justify-content: center;
`

const Interactions = styled.div`
    height: 90%;
    width: 30%;
    max-width: 300px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const Column = styled.div`
    min-width: ${props=>props.width}px;

    overflow: scroll;

    background: #ccc;

    padding: 10px 0 0 0;

    display: flex;
    flex-direction: column;
    align-items: ${props => props.align};
`

const ShowProof = props => {
    console.log(props)
    return (
        <Page>
            <Interactions>
                <Goal complete={!props.firstGoal}/>
                <PromptContainer complete={!props.firstGoal}/>
                <Message complete={!props.firstGoal}/>
                <Navigation />
            </Interactions>
            <Proof>
                <Column width={60} align={"center"}>
                    {props.lines.map( (id, idx) => <Counter key={id} id={id} order={idx + 1} firstGoalPosition={props.firstGoalPosition}/>)}
                </Column>
                <Column width={240} align={"flex-start"}>
                    <ProofR key={props.initialProofId} id={props.initialProofId} />
                </Column>
                <Column width={140} align={"center"}>
                    {props.lines.map( id => <Justification key={id} id={id} settled={props.settled}/>)}
                </Column>
            </Proof>
        </Page>
    );
}


const msp = () => {
    return state => {
        const initialProof = state.proofs.find(p => p.id === state.initialProofId)

        const extract = children => {
            return children.flatMap( id => (id%2===0) ? [id] : extract(state.proofs.find(p=> p.id === id).children))
        }

        const lines = extract(initialProof.children)

        const firstGoal = lines.find( l => !state.sentences.find( s => s.id === l).justificationId )
        const firstGoalPosition = lines.findIndex(l=>l===firstGoal)


        return {...state, lines: lines.flat(Infinity), initialProof: initialProof, firstGoal: firstGoal, firstGoalPosition: firstGoalPosition, settled: lines.slice(0, firstGoalPosition)}
    }
}

export default connect(msp)(ShowProof)

