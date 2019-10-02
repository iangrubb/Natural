import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

const Container = styled.div`
    height: 40px;
    

    margin: ${props => props.spacing}px 0 ${props => props.subproofEnd ? '12' : '0'}px 0;
    padding: 0 10px;

    border-radius: 2px;

    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Justification = props => {

    // On click temporarily removed, should be on hover
    // onClick={props.click(props.citationIds)}

    return (
        <Container subproofEnd={props.subproofEnd} spacing={props.spacing} goal={props.goal} currentGoal={props.currentGoal} >
            {props.justification ? props.justification.type : null}{props.citations.map(c => `, ${c}`)}
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

        const parent = state.proofs.find( p => p.children.includes(ownProps.id))
        
        const selfIndex = parent.children.indexOf(ownProps.id)
        
        const firstInProof = selfIndex === 0
        

        const subproofEnd = parent.children[parent.children.length - 1] === ownProps.id

        const isGoal = !sent.justificationId






        return {...state,
            citationIds: just ? just.citationIds : [],
            justification: just, goal: !sent.justificationId,
            currentGoal: state.currentGoal === ownProps.id,
            citations: citations,
            subproofEnd: subproofEnd,
            spacing: 10 + (firstInProof ? 10 : 0) + (isGoal ? 70 : 0)
        }
    }
}

const mdp = dispatch => {
    return ({
        click: citationIds => () => dispatch({type: "SET HIGHLIGHTS", ids: citationIds})
    
    })
}

export default connect(msp, mdp)(Justification)
