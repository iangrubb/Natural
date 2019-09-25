import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Button from '../userInterface/Button'

import display from '../helpers/display'

const Container = styled.div`

    width: 180px;
    height: 200px;

    margin: 2%;
    padding: 10px;

    background: #ccc;

    border-radius: 4px;
    box-shadow: 2px 2px 4px #999;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`

const Proof = styled.div`
    width: 90%;
    height: 76%;

    background: #ddd;
    border: 2px solid #aaa;
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Line = styled.div`
    padding: 4px 0;
    width: 80%;
    border-top: ${props => props.conclusion ? '2px solid black' : 'none'};
    display: flex;
    align-items: flex-end;
`


const ProofCard = props => {
    console.log(props)
    return (
        <Container>
            <Proof>
                {props.premises.map( (p, idx) => <Line key={idx}>{display(p, true)}</Line>)}
                <Line conclusion={true}>{display(props.conclusion, true)}</Line>
            </Proof>
            <Button active={true} text="Start Proof" onClick={props.loadProof(props.premises, props.conclusion)}/>
        </Container>
    );
}

const msp = () => {
    return state => {


        return {...state}
    }
}

const mdp = dispatch => {
    return {loadProof: (premises, conclusion)=>()=>{

        const modifiedPremises = premises.map( (p, idx) => { return {id: (idx + 1) * 2 , content: p, justificationId: idx + 1} })
        const modifiedConclusion = {id: (premises.length + 1) * 2, content: conclusion}

        const sentences = [...modifiedPremises, modifiedConclusion]

        const extractConstants = sentence => {
            if (sentence.type === "atom" && sentence.predicate) {
                return sentence.terms.filter( t => typeof t === "string")
            } else if (sentence.type === "atom" && sentence.letter) {
                return []
            } else if (sentence.type === "contradiction") {
                return []
            } else if (sentence.type === "universal" || sentence.type === "existential" || sentence.type === "negation") {
                return extractConstants(sentence.right)
            } else {
                return [...extractConstants(sentence.left), ...extractConstants(sentence.right)]
            }
        }

        dispatch({type: "LOAD PROOF ID"})
        dispatch({type: "LOAD PROOFS", children: sentences.map((s, idx) => (idx + 1) * 2)})
        dispatch({type: "LOAD SENTENCES", sentences: sentences})
        dispatch({type: "LOAD JUSTIFICATIONS", premises: premises })
        dispatch({type: "SET GOAL", newId: modifiedConclusion.id})
        dispatch({type: "UNSET FOCUS"})
        dispatch({type: "LOAD PROOF COUNTER"})
        dispatch({type: "LOAD SENTENCE COUNTER", counter: sentences.length * 2 })
        dispatch({type: "LOAD JUSTIFICATION COUNTER", counter: premises.length })
        dispatch({type: "LOAD GLOBAL CONSTANTS", constants: sentences.flatMap( s => extractConstants(s.content) ) })

    }}
}

export default connect(msp, mdp)(ProofCard)

