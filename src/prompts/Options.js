
import React from 'react';

import styled from 'styled-components'
import Button from '../userInterface/Button'

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

    background: #ddd;
    border: 2px solid #aaa;
    border-radius: 4px;
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
