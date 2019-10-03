import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

import Fade from 'react-reveal'


import Sentence from './Sentence';



const Container = styled.div`


    margin: 4px 0 4px ${props => props.depth===1? '0': '30'}px;

    padding: 6px;

    border-radius: 4px; 
`


const Premises = styled.div`
    display: flex;

    border-left: solid black 3px;
    flex-direction: column;
`

const Else = styled.div`

    border-left: solid black 3px;
    border-top: solid black 3px;


    display: flex;
    flex-direction: column;
`


const Proof = props => {
    return (
        <Fade right ><Container depth={props.depth} highlighted={props.highlighted}>
            <Premises>
                {props.children.slice(0, props.premiseCount).map(id => <Sentence depth={props.depth}  lemmaFlag={props.lemmaFlag} key={id} id={id}/>)}
            </Premises>
            <Else>
                {props.children.slice(props.premiseCount, props.children.length).map(id => (id % 2 === 0 ?
                    <Sentence depth={props.depth} lemmaFlag={props.lemmaFlag} key={id} id={id}/>
                    :  
                    <ProofR lemmaFlag={props.lemmaFlag} key={id} id={id}/>
                ))}
            </Else>    
        </Container></Fade>
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
            if (proofId === 1) {
                return 1
            } else {
                const parent = state.proofs.find( p => p.children.includes(proofId))
                return depth(parent.id) + 1
            }
        }

        return {...state, highlighted: state.highlightArray.includes(ownProps.id), children: children, premiseCount: children.findIndex(x=> x===firstAfterLine), depth: depth(ownProps.id)}
    }
}

const ProofR = connect(msp)(Proof)
export default ProofR

