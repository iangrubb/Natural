import React from 'react'

import styled from 'styled-components'
import Button from '../userInterface/Button'

import {colors, fonts} from '../styles'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width:100%;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: scroll;

    padding: 5%;
    width: 90%;
    height: 28%;

    background: #ddd;
    border: 2px solid #aaa;
    border-radius: 4px;
`

const Instructions = styled.div`

    padding: 5%;
    width: 90%;
    height: 36%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 1em;
    font-weight: 400;

    background: ${colors.lightSurface};
`


const ConstantChoice = props => {
    return (
        <Container>
            <Instructions>{props.instructions}</Instructions>
            {props.constants.length > 0 ?
            <ButtonContainer>
                {Array.from(new Set(props.constants)).map((p, idx) => <Button key={idx} text={p} active={true} onClick={props.onClick(p)}/>)}
            </ButtonContainer>:
            <ButtonContainer>(No Current Constants)</ButtonContainer>}
            <Button text="New Constant" active={true} onClick={props.onClick(null)}></Button>
        </Container>
    )
}

// props.onClick()

export default ConstantChoice;



