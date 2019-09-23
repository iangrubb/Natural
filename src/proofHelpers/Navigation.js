import React from 'react';
import styled from 'styled-components'

import Button from '../userInterface/Button'

const Container = styled.div`
    width: 90%;
    height: 12%;

    background: #ccc;

    border-radius: 4px;
    box-shadow: 2px 2px 4px #999;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Navigation = () => {
    return (
        <Container>
            <h3 style={{margin:'4px'}}>Navigate</h3>
            <Buttons>
                <Button text={"back"} active={true}/>
                <Button text={"forward"} active={true}/>
            </Buttons>
        </Container>
    );
}

export default Navigation;
