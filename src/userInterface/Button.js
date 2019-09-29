import React from 'react';
import styled from 'styled-components'

import { colors } from '../styles'

const Container = styled.div`

    margin: 6px 4px 2px 4px;
    padding: 8px;

    box-shadow: ${props => props.active ? `3px 3px 0 ${colors.highlightText}` : 'none'};

    background: ${props => props.active ? colors.darkSurface : '#aaa'};
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
        <Container active={props.active} onClick={props.active ? props.onClick : null}>
            {props.text}
        </Container>
    );
}

export default Button;
