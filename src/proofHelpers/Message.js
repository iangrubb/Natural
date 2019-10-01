import React from 'react';
import styled from 'styled-components'

import {colors, fonts} from '../styles'

const Container = styled.div`
    width: 84%;
    max-height: calc(100% - 520px);
    min-height: 100px;

    border-radius: 2px;

    margin: 8px 0;

    background: ${colors.lightSurface};
    border: 12px solid ${colors.mediumSurface};
    box-shadow: 4px 4px 0 ${colors.darkSurface};

    display: flex;
    flex-direction: column;
    align-items: center;
`

const Content = styled.div`
    width: 90%;
    margin: 15px 0 15px 10px;
    padding: 0 0 20px 0;

    overflow: scroll;
`

const Label = styled.h2`

    font-size: ${props => props.size}em;
    text-align: center;
    margin: 10px 0 0 0;

`

const Message = props => {
    return (
        <Container>
            {props.complete ? 
            null :
            <>
            <Label size={1}>Details</Label>
            <Content>

            </Content>
            </>
            }
            
             
        </Container>
    );
}

export default Message;
