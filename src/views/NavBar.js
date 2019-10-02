import React from 'react';
import styled from 'styled-components'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { colors } from '../styles'


const Spacer = styled.div`

    height: 50px;
    width: 100%;
    top: 0;
    left: 0;

    background: ${colors.darkSurface};
    color: ${colors.lightText};

    box-shadow: 2px 0 8px ${colors.darkSurface};

    z-index: 3;

    display: flex;
    justify-content: space-between;

`

const Container = styled.div`

    display: flex;
    align-items: baseline;
`

const Title = styled.div`
    margin: 14px 20px 10px 40px;
    font-size: 2em;
    font-weight: 700;
`

const Button = styled(Link)`
    margin: 0 10px 4px 0;
    font-size: 1.6 em;
    font-weight: 200;

    padding: 6px 12px 2px 18px;

    box-shadow: 3px 3px 0 ${colors.lightText};
    transform: translateY(-3px);

    border-radius:2px;

    color: ${colors.lightText};
    text-decoration: none;

    &:active {
        transform: translateY(-1px);
        box-shadow: 3px 2px 0 ${colors.lightText};
    }

    &:focus, &:hover, &:visited, &:link, {
        text-decoration: none;
    }
    
`

const SignButton = styled.div`
    
    font-size: 1.2em;
    font-weight: 700;

    padding: 4px 6px 2px 6px;
    margin: 0 20px 0 0;

    height: 18px;

    align-self:center;


    border: 2px solid ${colors.lightText};

    border-radius:2px;

    color: ${colors.darkSurface};
    background: ${colors.lightText};
    text-decoration: none;

    box-shadow: 3px 2px 0 ${colors.mediumSurface};

    &:active {
        transform: translateY(1px);
        box-shadow: 2px 1px 0 ${colors.mediumSurface};
    }

    &:focus, &:hover, &:visited, &:link, {
        text-decoration: none;
    }
`

const NavBar = props => {
    return (
        <Spacer>
        <Container>
            <Title>Natural</Title>

            <Button to="/home">Home</Button>
            <Button to="/proof">Current Proof</Button>
            <Button to="/newProof">New Proof</Button>
            {/* <Button to="/guide">Guide</Button> */}
            <Button to="/exercises">Exercises</Button>

        </Container>
        <SignButton onClick={()=> props.loggedIn ? props.logOut() : props.toggleSignIn()}>{props.loggedIn ? "Signout" : "Signin" }</SignButton>
        </Spacer>
    );
}

const msp = () => {
    return state => {
        
        return {
            loggedIn: state.userInfo
        }
    }
}

const mdp = dispatch => {
    return {logOut: () => {
        dispatch({type: "LOGOUT"})
    }}
}

export default connect(msp, mdp)(NavBar)