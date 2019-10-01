import React from 'react'

import styled from 'styled-components'

import ProofCard from '../userInterface/ProofCard'

import { colors, fonts } from '../styles'

const Category = styled.div`
    width: 90%;
    max-width: 1000px;

    display: flex;

    background: ${colors.lightSurface};

    box-shadow: -10px -10px 0 ${colors.darkSurface};

    padding: 0 0 50px 0;
    margin: 50px 0 0 0;

    border-radius:2px;
`

const CategoryDetails = styled.div`
    width: 180px;
    height: fit-content;

    min-width: 180px;

    padding: 10px;
    margin: 30px 0 0 10px;

    color: ${colors.darkText};

    display: flex;
    flex-direction: column;
    align-items: center;

    box-shadow: 6px 6px 0 ${colors.darkSurface};



`

const ProofList = styled.div`

    margin: 20px 10px 0 10px;
    width: calc(100% - 240px);

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
`

const Line = styled.h2`
    text-align: center;

    font-size: ${props => props.size}vh;
    

    margin: 1vh 0;
`

const List = styled.div`

    display: flex;
    flex-wrap: wrap;
    justify-content: center;


`

const Rule = styled.div`
    text-align: center;

    margin: 0.4vh 0.4vw;
    padding: 0.4vh 0.4vw;



    font-family: ${fonts.text};





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
                {props.proofs.map( p => <ProofCard key={p.proofId} {...p} />)}
            </ProofList>
        </Category>
    );
}

export default ProofContainer

