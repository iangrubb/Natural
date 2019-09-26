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

const IntroChoice = props => {
    return (
        <Container>
            <Instructions>{props.atom? "Which special rule do you want to use?" : "Do you want to use the main intro rule or a special rule?"}</Instructions>
            <ButtonContainer>
                <Button text='Main Rule' active={!props.atom} onClick={props.onClick('canon')}/>
            </ButtonContainer>
            <ButtonContainer>
                <Button text='DNE' active={!props.contradiction} onClick={props.onClick('dne')}/>
                <Button text='Reit' active={true} onClick={props.onClick('reit')}/>
                <Button text='Exp' active={!props.contradiction} onClick={props.onClick('exp')}/>
            </ButtonContainer>
        </Container>
    );
}

export default IntroChoice;
