import React from 'react'
import styled from 'styled-components'

import ProofCard from '../userInterface/ProofCard'

const Category = styled.div`
    width: 90%;
    max-width: 1200px;

    display: flex;
    justify-content: space-evenly;

    background: #eee;
    border: 2px solid #aaa;

    border-radius: 2vw;
    padding: 1vh 0;
    margin: 5vh 0;
`

const CategoryDetails = styled.div`
    width: 32%;
    height: fit-content;

    min-width: 180px;

    padding: 2vh 2vw;

    display: flex;
    flex-direction: column;
    align-items: center;


    border-radius: 4px;

`

const ProofList = styled.div`
    width: 64%;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Line = styled.h2`
    text-align: center;

    font-size: ${props => props.size}vh;

    margin: 1vh 0;
`

const List = styled.div`
    padding: 0;
    margin: 0;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;

`

const Rule = styled.div`
    text-align: center;

    margin: 0.4vh 0.4vw;
    padding: 1vh 1vw;

    background: #ddd;
    border-radius: 4px;




`

const ProofContainer = props => {
    return (
        <Category>
            <CategoryDetails>
                <Line size={1.8}>{props.logic} Logic</Line>
                <Line size={3.2}>{props.name}</Line>
                <Line size={2}>Rules Required:</Line>
                <List>
                    {props.rules.map( (r, idx) => <Rule key={idx}>{r}</Rule>)}
                </List>
            </CategoryDetails>
            <ProofList>
                {props.proofs.map( (p, idx) => <ProofCard key={idx} {...p}/>)}
            </ProofList>
        </Category>
    );
}

export default ProofContainer

