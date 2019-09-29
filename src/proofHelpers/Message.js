import React from 'react';
import styled from 'styled-components'

import {colors, fonts} from '../styles'

const Container = styled.div`
    width: 90%;
    height: 36%;

    background: ${colors.mediumSurface};

    box-shadow: 4px 4px 0 ${colors.darkSurface};

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

    background: ${colors.whiteSurface};

    overflow: scroll;
`

const Message = props => {
    return (
        <Container>
            {props.complete ? 
            null :
            <>
            <Title><h3 style={{margin:'4px'}}>Details</h3></Title>
            <Content>
                
            </Content> 
            </>
            }
             
        </Container>
    );
}

export default Message;
