import React from 'react';
import styled from 'styled-components'



const Container = styled.div`

    height: 50px;
    width: 100%;
    top: 0;
    left: 0;
    
    background: #1F1823;
    color: #ccc;

    box-shadow: 2px 0 8px #333;

    display: flex;
    align-items: baseline;
`

const Title = styled.div`
    margin: 14px 20px 10px 40px;
    font-size: 2em;
    font-weight: 700;
`

const Button = styled.div`
    margin: 0 10px 4px 0;
    font-size: 1.4 em;
    font-weight: 200;

    padding: 6px 12px 2px 18px;

    box-shadow: 2px 3px 0 #ccc;
    transform: translateY(-3px);

    :active {
        transform: translateY(-1px);
        box-shadow: 2px 1px 0 #ccc;
    }
    
`

const NavBar = () => {
    return (
        <Container>
            <Title>Natural</Title>
            <Button>Home</Button>
            <Button>Proof</Button> 
            <Button>Guide</Button> 
            <Button>Exercises</Button>
        </Container>
    );
}

export default NavBar
