import React from 'react';
import styled from 'styled-components'

const Container = styled.div`

    height: 50px;
    width: 100%;
    top: 0;
    left: 0;
    background: #222;
    color: #ccc;
    box-shadow: 2px 0 8px #333;

    display: flex;
    align-items: baseline;
`

const Title = styled.div`
    margin: 14px 0 10px 40px;
    font-size: 2em;
    font-weight: 700;
`
const Option = styled.div`
    margin: 0 0 20px 45px;
    font-size: 1.2em;
    font-weight: 400;
`

const NavBar = () => {
    return (
        <Container>
            <Title>Natural</Title>
        </Container>
    );
}

export default NavBar;
