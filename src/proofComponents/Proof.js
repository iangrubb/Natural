import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'
import Sentence from './Sentence';

const Container = styled.div`

    margin: 0 0 0 ${props=> props.depth * 20}px;
    border-left: solid black 4px;

`

const Premises = styled.div`
    
`

const Else = styled.div`
    margin: -4px 0 0 0;
    border-top: solid black 4px;
`


const Proof = props => {
    console.log(props)
    return (
        <Container depth={0}>
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
                console.log("line",line)
                const just = state.justifications.find(j=> j.id === line.justificationId)
                return just ? just.type !== "Premise" : true
            } else {
                return true
            }
        })
        return {...state, children: children, premiseCount: children.findIndex(x=> x===firstAfterLine) }
    }
}

const ProofR = connect(msp)(Proof)
export default ProofR

