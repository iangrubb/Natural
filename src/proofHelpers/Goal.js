import React from 'react';
import styled from 'styled-components'

import Button from '../userInterface/Button'

const Container = styled.div`
    width: 90%;
    height: 16%;

    background: #ccc;

    border-radius: 4px;
    box-shadow: 2px 2px 4px #999;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TextContainer = styled.div`
    width:90%;
    height: 30px;
    margin: 4px 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Goal = () => {
    return (
        <Container>
            {false ?
            <h1>Proof Complete!</h1> :
            <>
                <h3 style={{margin:'0'}}>Current Goal</h3>
                <TextContainer>{"<put goal here>"}</TextContainer>
                <Button text={'change'}/>
            </>}
        </Container>
    );
}

export default Goal;
