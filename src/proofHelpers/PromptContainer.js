import React from 'react';
import styled from 'styled-components'

import Instructions from '../prompts/Instructions'

const Container = styled.div`
    width: 90%;
    height: 20%;

    background: #ccc;

    border-radius: 4px;
    box-shadow: 2px 2px 4px #999;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`



const PromptContainer = () => {
    return (
        <Container>
            <h3 style={{margin:'4px'}}>Next Step</h3>
            <Instructions text="choose a highlighted sentence"/>
            
        </Container>
    );
}

export default PromptContainer;
