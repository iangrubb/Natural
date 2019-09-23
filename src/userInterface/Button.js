import React from 'react';
import styled from 'styled-components'

const Container = styled.div`

    margin: 6px 4px 2px 4px;
    padding: 8px;

    border-radius: 4px;
    box-shadow: ${props => props.active ? '3px 2px 4px #555' : 'none'};

    background: ${props => props.active ? '#333' : '#aaa'};
    color: #ddd;

    transform: ${props => props.active ? 'translateY(-2px)' : 'none'};

    :hover {
        transform: ${props => props.active ? 'translateY(-2px) scale(1.02)' : 'none'};
        color: ${props => props.active ? '#eee' : '#ddd'};
    }

    :active {
        transform: translateY(0px);
    }
`


const Button = props => {
    return (
        <Container active={props.active} onClick={props.onClick}>
            {props.text}
        </Container>
    );
}

export default Button;
