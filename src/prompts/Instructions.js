import React from 'react';
import styled from 'styled-components'

const Container = styled.div`

    padding: 5%;

    height: 80%;
    width: 90%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 1em;
    font-weight: 700;

    background: #ddd;
    border: 2px solid #aaa;
    border-radius: 4px;


`

const Instructions = props => {
    return (
        <Container>
            {props.text}
        </Container>
    )
}

export default Instructions;


