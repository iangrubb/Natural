import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

const Container = styled.div`
    width: 40px;
    min-height: 40px;

    margin: ${props => props.topSpacing}px 0 ${props => props.bottomSpacing}px 0;
    font-weight: 700;
    font-size: 1.4em;


    color: ${props => props.dark ? '#222' : '#555'};

    display: flex;
    justify-content: center;
    align-items: center;
`

const Counter = props => {
    return (
        <Container  bottomSpacing={props.bottomSpacing} topSpacing={props.topSpacing} goal={props.goal} dark={props.display}>
           {props.display ? props.order : '?'}
        </Container>
    );
}

const msp = () => {
    return (state, ownProps) => {

        const sentence = state.sentences.find(s=>s.id === ownProps.id)

        const parent = state.proofs.find( p => p.children.includes(ownProps.id))

        const selfIndex = parent.children.indexOf(ownProps.id)


        const just = state.justifications.find( j => j.id === sentence.justificationId )
        const premise = just && (just.type === "premise" || just.type === "assumption")



        const firstInProof = selfIndex === 0
        
        const subproofEnd = parent.children[parent.children.length - 1] === ownProps.id


        const isGoal = !sentence.justificationId

        const lastPremise = (just && (just.type === "Premise" || just.type === "Assumption")) && (parent.children[selfIndex + 1] % 2 === 1 || !state.sentences.find( e => e.id === parent.children[selfIndex + 1]).justificationId || ( state.justifications.find( j => j.id === state.sentences.find( e => e.id === parent.children[selfIndex + 1]).justificationId).type !== "Premise" && state.justifications.find( j => j.id === state.sentences.find( e => e.id === parent.children[selfIndex + 1]).justificationId).type !== "Assumption" ))
       




        return {...state,
            goal: !sentence.justificationId,
            display: ownProps.firstGoalPosition < 0 || ownProps.firstGoalPosition > ownProps.order - 1,
            bottomSpacing: (subproofEnd ? 12 : 0) + (lastPremise ? 6 : 0),
            topSpacing: 10 + (firstInProof ? 6 : 0) + (isGoal ? 70 : 0)
        }
    }
}

export default connect(msp)(Counter)
