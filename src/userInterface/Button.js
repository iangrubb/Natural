import React from 'react';
import styled from 'styled-components'

import { colors } from '../styles'

const Container = styled.div`

    cursor: pointer;

    margin: 6px 4px;
    padding: ${props => props.minor ? '4px' : '6px'};

    font-size: ${props => props.minor ? '0.8em' : '1em'}

    border-radius: 2px;

    box-shadow: ${props => props.active ? `3px 3px 0 ${colors.highlightText}` : 'none'};

    background: ${props => props.active ? colors.darkButton : '#aaa'};
    color: ${props => props.active ? colors.highlightText : '#999'};

    transform: ${props => props.active ? 'translateY(-2px)' : 'none'};

    :hover {
    }

    :active {
        transform: translateY(0px);
        box-shadow: ${props => props.active ? `3px 2px 0 ${colors.highlightText}` : 'none'};
    }
`


const Button = props => {
    return (
        <Container minor={props.minor} active={props.active} onClick={props.active ? props.onClick : null}>
            {props.text}
        </Container>
    );
}

export default Button;
