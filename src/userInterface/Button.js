import React from 'react';
import styled from 'styled-components'

const Container = styled.div`

    margin: 6px 4px 2px 4px;
    padding: 8px;

    border-radius: 4px;
    box-shadow: 3px 2px 4px #555;

    background: #333;
    color: #ddd;

    transform: translateY(-2px);

    :hover {
        transform: translateY(-2px) scale(1.02);
        color: #eee;
    }

    :active {
        transform: translateY(0px);
    }
`


const Button = props => {
    return (
        <Container>
            {props.text}
        </Container>
    );
}

export default Button;
