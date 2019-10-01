
import React from 'react';

import styled from 'styled-components'
import Button from '../userInterface/Button'

import {colors, fonts} from '../styles'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Instructions = styled.div`

    padding: 2px 0 0 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 0.9em;
    font-weight: 400;

`

const CTA = styled.div`

    padding: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 1em;
    font-weight: 700;

`


const Options = props => {
    return (
        <Container>
            <Instructions>{props.instructions}</Instructions>
            <CTA>{props.cta}</CTA>
            <ButtonContainer>
                {props.prompts.map((p, idx) => <Button key={idx} text={p} active={true} onClick={props.actions[idx]}/>)}
            </ButtonContainer>
        </Container>
    );
}

export default Options;
