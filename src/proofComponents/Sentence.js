import React from 'react';
import { connect } from 'react-redux'

import styled from 'styled-components'


const Container = styled.div`
    height: 40px;
    border-radius: 10px;

    margin: ${props => props.goal?'80px':'10px'} 40px 10px 10px;
    padding: 0 10px;

    background: #aaa;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Part = styled.div`
    display: flex;
    align-items: center;
`




const display = (content, main) => {

    switch(content.type){
        case "atom":
            return <Part>{content.letter}</Part>
        case "negation":
            return <Part>¬{display(content.left, false)}</Part>
        case "conjunction":
            return (
                <Part>
                    {main ? null : '('}
                    {display(content.left, false)}
                    {' & '}
                    {display(content.right, false)}
                    {main ? null : ')'}
                </Part>
                )
        case "disjunction":
            return (
                <Part>
                    {main ? null : '('}
                    {display(content.left, false)}
                    {' ∨ '}
                    {display(content.right, false)}
                    {main ? null : ')'}
                </Part>
                )
        case "conditional":
            return (
                <Part>
                    {main ? null : '('}
                    {display(content.left, false)}
                    {' → '}
                    {display(content.right, false)}
                    {main ? null : ')'}
                </Part>
                )
        // case "disjunction":
        //     return (
        //         <Container >

        //         {props.main ? null : ')'}

        //         <Sentence sentence={props.sentence.left} main={false}/>

        //         ∨

        //         <Sentence sentence={props.sentence.right} main={false}/>

        //         {props.main ? null : ')'}

        //         </Container>
        //     )
        // case "conditional":
        //     return (
        //         <Container >

        //         {props.main ? null : '('}

        //         <Sentence sentence={props.sentence.left} main={false}/>

        //         →

        //         <Sentence sentence={props.sentence.right} main={false}/>

        //         {props.main ? null : ')'}

        //         </Container>
        //     )
        
    }

}




const Sentence = props => {
    return (
        <Container goal={props.goal}>
            {display(props.content, true)}
        </Container>
    );
}
const msp = () => {
    return (state, ownProps) => {
        const sentence = state.sentences.find(s=>s.id === ownProps.id)
        return {...state, content: sentence.content, goal: !sentence.justificationId}
    }
}

export default connect(msp)(Sentence)
