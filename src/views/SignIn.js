import React, { useState } from 'react'

import styled from 'styled-components'

import {colors, fonts} from '../styles'

import Button from '../userInterface/Button'



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
    height: 70%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const Title = styled.div`

    width: 80%;

    font-size: 4vw;
    font-weight: 700;

    color:${colors.darkText};

    padding: 4% 10%;

`

const BigInfo = styled.div`
    width: 80%;

    font-size: 2.4vw;
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

    font-size: 1.8vw;
    font-weight: 400;
    
    margin: 0 10px;

    color:${colors.darkText};

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

    const toggleState = ()=>{
        setUsername("")
        setPassword("")
        setReturning(!returning)
    }

    const submitData = (username, password, returning) => e => {
        e.preventDefault()
        if (returning) {
            console.log("log in", username, password)
        } else {
            console.log("sign up", username, password)
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
                    <TextField type="text" name="password" value={password} onChange={e=>setPassword(e.target.value)} />
                    <Submit type="submit" value="Submit" onClick={submitData(username, password, returning)}/>


                </Form>
                <ContentRow>
                    {returning ? 
                    <>
                    <SmallInfo>Need an account?</SmallInfo>
                    <Button active={true} minor={true} text='signup' onClick={toggleState}/>
                    </>:
                    <>
                    <SmallInfo>Have an account?</SmallInfo>
                    <Button active={true} minor={true} text='login' onClick={toggleState}/>
                    </>}
                </ContentRow>
            </Window>
        </Page>
    );
}

export default SignIn
