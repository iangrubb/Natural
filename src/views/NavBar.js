import React from 'react';
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import { colors } from '../styles'



const Container = styled.div`

    height: 50px;
    width: 100%;
    top: 0;
    left: 0;
    
    background: ${colors.darkSurface};
    color: ${colors.lightText};

    box-shadow: 2px 0 8px ${colors.darkSurface};

    z-index: 2;

    display: flex;
    align-items: baseline;
`

const Title = styled.div`
    margin: 14px 20px 10px 40px;
    font-size: 2em;
    font-weight: 700;
`

const Button = styled(Link)`
    margin: 0 10px 4px 0;
    font-size: 1.6 em;
    font-weight: 200;

    padding: 6px 12px 2px 18px;

    box-shadow: 3px 3px 0 ${colors.lightText};
    transform: translateY(-3px);

    border-radius:2px;

    color: ${colors.lightText};
    text-decoration: none;

    &:active {
        transform: translateY(-1px);
        box-shadow: 3px 2px 0 ${colors.lightText};
    }

    &:focus, &:hover, &:visited, &:link, {
        text-decoration: none;
    }


    
    
`

const NavBar = () => {
    return (
        <Container>
            <Title>Natural</Title>

            <Button to="/home">Home</Button>
            <Button to="/proof">Proof</Button>
            <Button to="/newProof">New</Button>
            {/* <Button to="/guide">Guide</Button> */}
            <Button to="/exercises">Exercises</Button>

        </Container>
    );
}

export default NavBar
