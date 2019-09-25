import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'
import Sentence from './Sentence';

const Container = styled.div`

    margin: 2px 0 0 ${props => props.depth===1? '0': '30'}px;
    border-left: solid black 4px;
    width: 90%;
    
`

const Premises = styled.div`
    display: flex;
    flex-direction: column;
`

const Else = styled.div`
    box-shadow: -4px -4px 0 black;

    display: flex;
    flex-direction: column;
`


const Proof = props => {
    return (
        <Container depth={props.depth}>
            <Premises>
                {props.children.slice(0, props.premiseCount).map(id => <Sentence key={id} id={id}/>)}
            </Premises>
            <Else>
                {props.children.slice(props.premiseCount, props.children.length).map(id => (id % 2 === 0 ? <Sentence key={id} id={id}/>  :  <ProofR key={id} id={id}/>))}
            </Else>    
        </Container>
    );
}

const msp = () => {
    return (state, ownProps) => {
        const children = state.proofs.find(p=> p.id === ownProps.id).children
        
        const firstAfterLine = children.find( c => {
            if (c % 2 === 0) {
                const line = state.sentences.find(s=> s.id === c)
                const just = state.justifications.find(j=> j.id === line.justificationId)
                return just ? just.type !== "Premise" && just.type !== "Assumption" : true
            } else {
                return true
            }
        })

        const depth = proofId => {
            if (proofId === state.initialProofId) {
                return 1
            } else {
                const parent = state.proofs.find( p => p.children.includes(proofId))
                return depth(parent.id) + 1
            }
        }

        return {...state, children: children, premiseCount: children.findIndex(x=> x===firstAfterLine), depth: depth(ownProps.id)}
    }
}

const ProofR = connect(msp)(Proof)
export default ProofR

