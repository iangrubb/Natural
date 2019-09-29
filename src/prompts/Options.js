
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

    padding: 5%;

    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 1em;
    font-weight: 400;

    background: ${colors.lightSurface};
`


const Options = props => {
    return (
        <Container>
            <Instructions>{props.instructions}</Instructions>
            <ButtonContainer>
                {props.prompts.map((p, idx) => <Button key={idx} text={p} active={true} onClick={props.actions[idx]}/>)}
            </ButtonContainer>
        </Container>
    );
}

export default Options;
