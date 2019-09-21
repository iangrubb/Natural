import React from 'react';
import styled from 'styled-components'

import Button from '../userInterface/Button'

const Container = styled.div`
    width: 90%;
    height: 8%;

    background: #ccc;

    border-radius: 4px;
    box-shadow: 2px 2px 4px #999;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Navigation = () => {
    return (
        <Container>
            <Button text={"back"}/>
            <Button text={"forward"}/>
        </Container>
    );
}

export default Navigation;
