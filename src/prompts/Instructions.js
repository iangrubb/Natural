import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    width: 80%;
    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 1.2em;


`

const Instructions = props => {
    return (
        <Container>
            {props.text}
        </Container>
    )
}

export default Instructions;


