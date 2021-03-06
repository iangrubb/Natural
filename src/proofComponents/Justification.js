import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'

const Container = styled.div`
    min-height: 40px;
    

    margin: ${props => props.topSpacing}px 0 ${props => props.bottomSpacing}px 0;
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
        <Container bottomSpacing={props.bottomSpacing} topSpacing={props.topSpacing} goal={props.goal} currentGoal={props.currentGoal} >
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

        const sentence = sent

        const parent = state.proofs.find( p => p.children.includes(ownProps.id))
        
        const selfIndex = parent.children.indexOf(ownProps.id)
        
        const firstInProof = selfIndex === 0
        

        const subproofEnd = parent.children[parent.children.length - 1] === ownProps.id

        const isGoal = !sent.justificationId

        const lastPremise = (just && (just.type === "Premise" || just.type === "Assumption")) && (parent.children[selfIndex + 1] % 2 === 1 || !state.sentences.find( e => e.id === parent.children[selfIndex + 1]).justificationId || ( state.justifications.find( j => j.id === state.sentences.find( e => e.id === parent.children[selfIndex + 1]).justificationId).type !== "Premise" && state.justifications.find( j => j.id === state.sentences.find( e => e.id === parent.children[selfIndex + 1]).justificationId).type !== "Assumption" ))



        return {...state,
            citationIds: just ? just.citationIds : [],
            justification: just, goal: !sent.justificationId,
            currentGoal: state.currentGoal === ownProps.id,
            citations: citations,
            subproofEnd: subproofEnd,
            bottomSpacing: (subproofEnd ? 12 : 0) + (lastPremise ? 6 : 0),
            topSpacing: 10 + (firstInProof ? 6 : 0) + (isGoal ? 70 : 0)
        }
    }
}

const mdp = dispatch => {
    return ({
        click: citationIds => () => dispatch({type: "SET HIGHLIGHTS", ids: citationIds})
    
    })
}

export default connect(msp, mdp)(Justification)
