import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ProofR from '../proofComponents/Proof'
import Sentence from '../proofComponents/Sentence'
import Justification from '../proofComponents/Justification'
import Counter from '../proofComponents/Counter'



const Page = styled.div`
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    background: #eee;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const Proof = styled.div`
    height: 90%;
    width: 60%

    overflow: scroll;

    background: #aaa;

    display: flex;
    justify-content: center;
`

const Interactions = styled.div`
    height: 90%;
    width: 30%;

    background: #aaa;
`

const Column = styled.div`
    min-width: ${props=>props.width}px;
    height: 100%;

    background: #ccc;

    overflow: scroll;

    display: flex;
    flex-direction: column;
    align-items: ${props => props.align};
`

const ShowProof = props => {
    return (
        <Page>
            <Proof>
                <Column width={80} align={"center"}>
                    {props.lines.map( (id, idx) => <Counter key={id} id={id} order={idx + 1}/>)}
                </Column>
                <Column width={200} align={"flex-start"}>
                    <ProofR key={props.initialProofId} id={props.initialProofId} />
                </Column>
                <Column width={100} align={"center"}>
                    {props.lines.map( id => <Justification key={id} id={id}/>)}
                </Column>
            </Proof>
            <Interactions>


            </Interactions>
        </Page>
    );
}


const msp = () => {
    return state => {
        const initialProof = state.proofs.find(p => p.id === state.initialProofId)

        const extract = children => {
            return children.map( id => (id%2===0) ? id : state.proofs.find(p=> p.id === id).children)
        }

        const lines = extract(initialProof.children)


        return {...state, lines: lines.flat(Infinity), initialProof: initialProof}
    }
}

export default connect(msp)(ShowProof)

