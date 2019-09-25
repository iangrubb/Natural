
import React from 'react'
import styled from 'styled-components'

import ProofContainer from '../userInterface/ProofContainer'


const Page = styled.div`
    width: 100%;
    height: calc(100% - 50px);

    overflow: scroll;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const Exercises = props => {
    return (
        <Page>
            {exerciseData.map( (e, idx) => <ProofContainer key={idx} {...e} />)}
        </Page>
    );
}






const exerciseData = [
    {logic: "Propositional",
    name: "Direct Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '→ Elimination'
    ],
    proofs: [
        {premises: [
            {type:"conjunction", left: {type:"atom", letter:"B"}, right: {type:"atom", letter:"C"}},
            {type:"conditional", left: {type:"disjunction", left:{type:"atom", letter:"D"}, right:{type:"atom", letter:"C"}}, right: {type:"atom", letter:"A"}}],
        conclusion: {type:"conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}}}
    ]},

    {logic: "Propositional",
    name: "Conditional Proofs",
    rules: [],
    proofs: [
        {premises: [
            {type:"conditional", left: {type:"conjunction", left:{type:"atom", letter:"A"}, right:{type:"atom", letter:"B"}}, right: {type:"atom", letter:"C"}}],
        conclusion: {type:"conditional", left: {type:"atom", letter:"A"} , right: {type:"conditional", left: {type:"atom", letter:"B"} , right: {type:"atom", letter:"C"}}}}
    ]},

    {logic: "Propositional",
    name: "Proofs by Cases",
    rules: [],
    proofs: [
        {premises: [
            {type:"disjunction", left: {type:"conjunction", left:{type:"atom", letter:"A"}, right:{type:"atom", letter:"B"}}, right: {type:"conjunction", left:{type:"atom", letter:"C"}, right:{type:"atom", letter:"D"}}}],
        conclusion: {type:"disjunction", left: {type:"atom", letter:"A"} , right: {type:"atom", letter:"D"}}}
    ]},

    {logic: "Propositional",
    name: "Proofs by Contradiction",
    rules: [],
    proofs: [
        {premises: [{type:"negation", right: {type:"disjunction", left: {type:"atom", letter:"A"} , right: {type:"atom", letter:"B"}}}],
        conclusion: {type:"conjunction", left: {type:"negation", right: {type:"atom", letter:"A"}} , right: {type:"negation", right: {type:"atom", letter:"B"}}}}
    ]},

    {logic: "Propositional",
    name: "Challenge Proofs",
    rules: [],
    proofs: [
        {premises: [{type:"disjunction", left: {type:"atom", letter:"A"} , right: {type:"atom", letter:"B"}}],
        conclusion: {type:"conditional", left: {type:"negation", right: {type:"atom", letter:"A"}} , right: {type:"atom", letter:"B"}}}
    ]},

    {logic: "Predicate",
    name: "Direct Proofs",
    rules: [],
    proofs: [
        {premises: [{type:"universal", variable: 2, right: {type:"atom", predicate: "A", terms:[2]}}],
        conclusion: {type:"atom", predicate:"A", terms:["b"]}},


        {premises: [{type:"atom", predicate:"A", terms:["b"]}],
        conclusion: {type:"existential", variable: 1, right: {type:"atom", predicate: "A", terms:[1]}}}

    ]},

    {logic: "Predicate",
    name: "Universal Proofs",
    rules: [],
    proofs: [
        {premises: [{type:"universal", variable: 2, right: {type:"conjunction", left: {type:"atom", predicate: "A", terms:[2]}, right: {type:"atom", predicate: "B", terms:[2]}}}],
        conclusion: {type:"universal", variable: 2, right: {type:"atom", predicate: "A", terms:[2]}}}
    ]},

    {logic: "Predicate",
    name: "Existential Proofs",
    rules: [],
    proofs: [
        {premises: [{type:"existential", variable: 1, right: {type:"atom", predicate: "A", terms:[1]}}],
        conclusion: {type:"existential", variable: 1, right: {type:"disjunction", left: {type:"atom", predicate: "A", terms:[1]}, right: {type:"atom", predicate: "B", terms:[1]}}}}
    ]},

    {logic: "Predicate",
    name: "Challenge Proofs",
    rules: [],
    proofs: []},

    {logic: "Relational",
    name: "Direct Proofs",
    rules: [],
    proofs: []},

    {logic: "Relational",
    name: "Challenge Proofs",
    rules: [],
    proofs: []},
    
]


export default Exercises





