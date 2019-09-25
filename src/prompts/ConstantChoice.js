import React from 'react'

import styled from 'styled-components'
import Button from '../userInterface/Button'

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

    background: #ddd;
    border: 2px solid #aaa;
    border-radius: 4px;
`


const ConstantChoice = props => {
    return (
        <Container>
            <Instructions>{props.instructions}</Instructions>
            <ButtonContainer>
                {props.constants.map((p, idx) => <Button key={idx} text={p} active={true} onClick={props.onClick(p)}/>)}
            </ButtonContainer>
            <Button text="New" active={true} onClick={()=>console.log("do this")}></Button>
        </Container>
    )
}

// props.onClick()

export default ConstantChoice;



