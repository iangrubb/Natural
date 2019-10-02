import React, { useState } from 'react'

import { connect } from 'react-redux'

import styled from 'styled-components'

import {colors, fonts} from '../styles'

import Button from '../userInterface/Button'

import { signUpUser, logInUser } from '../actions'



const Page = styled.div`

    width: 100%;
    height: calc(100% - 50px);

    z-index: 2;

    position: absolute;
    bottom: 0;
    left: 0;

    background: hsla(1, 0%, 100%, 0.8);


    display: flex;
    justify-content: center;
    align-items: center;

`

const Window = styled.div`

    border-radius: 2px;
    background: ${colors.lightSurface};
    border: 12px solid ${colors.mediumSurface};
    box-shadow: 4px 4px 0 ${colors.darkSurface};

    width: 70%;
    max-width: 800px;
    height: 70%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const Title = styled.div`

    width: 80%;

    font-size: 2.6em;
    font-weight: 700;

    color:${colors.darkText};

    padding: 4% 10%;

`

const BigInfo = styled.div`
    width: 80%;

    font-size: 1.6em;
    font-weight: 400;

    color:${colors.darkText};

    padding: 0 10%;

`

const Form = styled.form`
    width: 60%;
    height: 40%;

    margin: 2% 0;


    display: flex;
    flex-direction: column;
    justify-content: center;


`

const SmallInfo = styled.div`

    font-size: 1.2em;
    font-weight: 400;

    height: 20px;
    
    margin: 0 15px;

    color: ${props => props.color ? props.color : colors.darkText};

    display:flex;
    align-items:center;

`

const ContentRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const TextField = styled.input`
    width: 80%;
    height: 14%;
    margin: 2% 0;

    font-size: 1.4em;

    border: 2px solid ${colors.mediumSurface};
    border-radius: 2px;
`

const Submit = styled.input`
    width: 100px;
    height: 36px;

    margin: 20px 0 0 0;
    padding: 4px 0 0 0;

    background: ${colors.mediumSurface};

    border: none;
    border-radius: 2px;
    box-shadow: 2px 2px 0 ${colors.darkSurface};

    color: ${colors.darkText};

    font-family: ${fonts.display};
    font-size: 1.4em;
    font-weight: 700;


`


const SignIn = props => {

    const [returning, setReturning] =  useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const clearState = () => {
        setUsername("")
        setPassword("")
        props.clearErrorMessage()
    }

    const toggleState = ()=>{
        clearState()
        setReturning(!returning) 
    }

    const submitData = (username, password, returning) => e => {
        e.preventDefault()
        if (username !== "" && password !== "") {
            if (returning) {
                props.logInUser(username, password)
                clearState()
            } else {
                props.signUpUser(username, password)
                clearState()
            }
        }
    }


    return (
        <Page onClick={props.toggleSignIn}>
            <Window onClick={e=>e.stopPropagation()}>
                <Title>{returning ? 'Welcome Back!' :'Welcome!'}</Title>
                <BigInfo>{returning ? 'Log in to see your proofs and track your progress.' : 'Set up an account to save proofs and track your progress.'}</BigInfo>
                <Form>
                    <SmallInfo>Username</SmallInfo>
                    <TextField type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} />
                    <SmallInfo>Password</SmallInfo>
                    <TextField type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} />
                    <SmallInfo color="red" >{props.errorMessage ? props.errorMessage : " "}</SmallInfo>
                    <Submit type="submit" value="Submit" onClick={submitData(username, password, returning)}/>
                </Form>
                <ContentRow>
                    {returning ? 
                    <>
                    <SmallInfo>Need an account?</SmallInfo>
                    <Button active={true} text='signup' onClick={toggleState}/>
                    </>:
                    <>
                    <SmallInfo>Have an account?</SmallInfo>
                    <Button active={true} text='login' onClick={toggleState}/>
                    </>}
                </ContentRow>
            </Window>
        </Page>
    )
}


const msp = () => {
    return state => {
        return {...state}
    }
}

const mdp = dispatch => {
    return {signUpUser: signUpUser(dispatch), logInUser: logInUser(dispatch), clearErrorMessage: () => dispatch({type: "UNSET ERROR MESSAGE"})}
  }
  
export default connect(msp, mdp)(SignIn)
