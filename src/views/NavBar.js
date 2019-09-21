import React from 'react';
import styled from 'styled-components'

const Container = styled.div`

    height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    background: #222;
    color: #ccc;
    box-shadow: 2px 2px 2px #333;

    display: flex;
    align-items: baseline;
`

const Title = styled.h1`
    margin: 20px 0 20px 40px;
`

const NavBar = () => {
    return (
        <Container>
            <Title>Natural</Title>
            
        </Container>
    );
}

export default NavBar;
