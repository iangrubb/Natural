import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

const Container = styled.div`
    height: 40px;
    border-radius: 10px;

    margin: ${props => props.goal?'75px':'5px'} 0 10px 0;
    padding: 0 10px;

    border: ${props => props.currentGoal ? '2px solid #555' : 'none'};
    background: ${props => props.currentGoal ? '#eee' : 'none'};

    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Justification = props => {
    return (
        <Container goal={props.goal} currentGoal={props.currentGoal}>
            {props.justification ? props.justification.type : "< Goal >"}{props.citations.map(c => `, ${c}`)}
        </Container>
    );
}


const msp = () => {
    return (state, ownProps) => {
        const sent = state.sentences.find( s => s.id === ownProps.id)
        const just = state.justifications.find( j => j.id === sent.justificationId )

        let citations
        if (just) {
            citations = just.citationIds.map( id => {
                if (id % 2 === 0) {
                    return ownProps.settled.includes(id) ? (ownProps.settled.indexOf(id) + 1) : "?"
                } else {
                    const subproof = state.proofs.find( p => p.id === id )
                    const firstId = subproof.children[0]
                    const first = ownProps.settled.includes(firstId) ? (ownProps.settled.indexOf(firstId) + 1) : "?"
                    const lastId = subproof.children[subproof.children.length - 1]
                    const last = ownProps.settled.includes(lastId) ? (ownProps.settled.indexOf(lastId) + 1) : "?"

                    return `${first}-${last}`
                }
            })
        } else {
            citations = []
        }

        


        return {...state, justification: just, goal: !sent.justificationId, currentGoal: state.currentGoal === ownProps.id, citations: citations}
    }
}

export default connect(msp)(Justification)
