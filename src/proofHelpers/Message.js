import React from 'react';
import styled from 'styled-components'

import {colors, fonts} from '../styles'

const Container = styled.div`
    width: 84%;
    height: 32%;

    border-radius: 2px;

    background: ${colors.lightSurface};
    border: 12px solid ${colors.mediumSurface};
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

const Message = props => {
    return (
        <Container>
            {props.complete ? 
            null :
            <>
            <Title><h4 style={{margin:'4px'}}>Details</h4></Title>
            </>
            }
             
        </Container>
    );
}

export default Message;
