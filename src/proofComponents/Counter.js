import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

const Container = styled.div`
    width: 40px;
    height: 40px;

    margin: ${props => props.spacing}px 0 ${props => props.subproofEnd ? '12' : '0'}px 0;
    font-weight: 700;
    font-size: 1.4em;


    color: ${props => props.dark ? '#222' : '#555'};

    display: flex;
    justify-content: center;
    align-items: center;
`

const Counter = props => {
    return (
        <Container subproofEnd={props.subproofEnd} spacing={props.spacing} goal={props.goal} dark={props.display}>
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




        return {...state,
            goal: !sentence.justificationId,
            display: ownProps.firstGoalPosition < 0 || ownProps.firstGoalPosition > ownProps.order - 1,
            subproofEnd: subproofEnd,
            spacing: 10 + (firstInProof ? 10 : 0) + (isGoal ? 70 : 0)}
    }
}

export default connect(msp)(Counter)
