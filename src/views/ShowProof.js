import React, { useState } from 'react'
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

import SentenceForm from '../userInterface/SentenceForm'

import fill from '../helpers/fill'

import { colors } from '../styles'

const Page = styled.div`

    height: 100%;

    display:flex;
    justify-content: center;
    align-items: center;

`


const Proof = styled.div`

    overflow: scroll;

    height: ${props => props.lemmaFlag ? '68' : '100' }%;

    transition: height 0.5s ease;

    background: ${colors.whiteSurface};

    border: 20px solid ${colors.mediumSurface};

    box-shadow: 6px 6px 0 ${colors.darkSurface};

    display: flex;
    justify-content: center;
`

const Interactions = styled.div`
    height: 90%;
    width: 280px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const Column = styled.div`
    min-width: ${props=>props.width}px;

    overflow-y: scroll;


    padding: 10px 0 0 0;

    display: flex;
    flex-direction: column;
    align-items: ${props => props.align};
`

const ProofColumn = styled.div`
    height: 90%;

    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
`

const ShowProof = props => {
    
    const [lemmaFlag, setLemmaFlag] = useState(false)


    return (
        <Page>
            <Interactions>
                <Goal complete={!props.firstGoal} lemmaFlag={lemmaFlag}/>
                <PromptContainer complete={!props.firstGoal} lemmaFlag={lemmaFlag} setLemmaFlag={setLemmaFlag} />
                <Message complete={!props.firstGoal}/>
                <Navigation lemmaFlag={lemmaFlag} />
            </Interactions>
            <ProofColumn>

            <Proof lemmaFlag={lemmaFlag} >
                <Column width={60} align={"center"}>
                    {props.lines.map( (id, idx) => <Counter key={id} id={id} order={idx + 1} firstGoalPosition={props.firstGoalPosition}/>)}
                </Column>
                <Column width={240} align={"flex-start"}>
                    <ProofR key={1} id={1} lemmaFlag={lemmaFlag}/>
                </Column>
                <Column width={140} align={"center"}>
                    {props.lines.map( id => <Justification key={id} id={id} settled={props.settled}/>)}
                </Column>
            </Proof>


            {lemmaFlag ? <SentenceForm type={props.proofType} cancel={() => setLemmaFlag(false)} confirm={result => () => {
                props.fill(props.state, props.goalSentence , result)
                setLemmaFlag(false)
            }}/> : null }


            </ProofColumn>
            
        </Page>
    );
}


const msp = () => {
    return state => {
        const initialProof = state.proofs.find(p => p.id === 1)

        const extract = children => {
            return children.flatMap( id => (id%2===0) ? [id] : extract(state.proofs.find(p=> p.id === id).children))
        }

        const lines = extract(initialProof.children)

        const firstGoal = lines.find( l => !state.sentences.find( s => s.id === l).justificationId )
        const firstGoalPosition = lines.findIndex(l=>l===firstGoal)


        return {...state,
            state: state,
            lines: lines.flat(Infinity),
            firstGoal: firstGoal,
            firstGoalPosition: firstGoalPosition,
            goalSentence: state.sentences.find( s => s.id === state.currentGoal),
            settled: lines.slice(0, firstGoalPosition)
        }
    }
}

const mdp = dispatch => {
    return {
        fill: (state, goalSentence, result) => fill(state, goalSentence, null, {lemma: result}, dispatch , null)
    }
}

export default connect(msp, mdp)(ShowProof)

