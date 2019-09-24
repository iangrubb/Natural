import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    width: 90%;
    height: 36%;

    background: #ccc;

    border-radius: 4px;
    box-shadow: 2px 2px 4px #999;

    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title = styled.div`
    height: 14%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const Content = styled.div`
    width: 80%;
    height: 70%;

    padding: 5%;

    font-size: 1.2em;

    background: #ddd;
    border: 2px solid #aaa;
    border-radius: 4px;

    overflow: scroll;
`

const Message = () => {
    return (
        <Container>
            <Title><h3 style={{margin:'4px'}}>Details</h3></Title>
            <Content>
                
            </Content>  
        </Container>
    );
}

export default Message;
