import React from 'react'

import styled from 'styled-components'
import Button from '../userInterface/Button'

import {colors, fonts} from '../styles'

const Container = styled.div`

    padding: 2px 0 0 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: scroll;

    padding: 4px;
    width: 90%;
    height: 28%;

    background: ${colors.lightSurface};
`

const Instructions = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 0.9em;
    font-weight: 400;

    background: ${colors.lightSurface};
`

const CTA = styled.div`

    padding: 2px 0 0 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 1em;
    font-weight: 700;

`


const ConstantChoice = props => {
    return (
        <Container>
            <Instructions>{props.instructions}</Instructions>
            <CTA>{props.cta}</CTA>
            {props.constants.length > 0 ?
            <ButtonContainer>
                {Array.from(new Set(props.constants)).map((p, idx) => <Button key={idx} text={p} active={true} onClick={props.onClick(p)}/>)}
            </ButtonContainer>:
            <ButtonContainer>(No Current Constants)</ButtonContainer>}
            <Button text="new constant" minor={true} active={true} onClick={props.onClick(null)}></Button>
        </Container>
    )
}

// props.onClick()

export default ConstantChoice;



