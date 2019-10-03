import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Page } from '../styles'

import ProofCard from '../userInterface/ProofCard'

import { colors, fonts } from '../styles'

import {withRouter} from 'react-router-dom'


const ProofIndex = styled.div`

    width: 100%;

    padding: 2%;

    display: flex;
    align-items: center;
    flex-wrap: wrap;

`

const InfoBox = styled.div`

    width: 600px;
    height: 80vh;
    margin: 5vh 0 5vh 0;
    border-left: solid ${colors.darkSurface} 6px;

    display: flex;
    flex-direction: column;

    

    
    
`

const TitleBox = styled.div`

    border-bottom: solid ${colors.darkSurface} 6px;

    color: ${colors.darkSurface};


    display: flex;
    align-items: center;

    padding: 2vh 0 1vh ${props => props.size}vw;

    font-weight: 700;
    font-size: ${props => props.size}em;
`

const SubTitle = styled.div`

    margin: 2vh 0 3vh 40px;

    color: ${colors.mediumText};
    
    font-size: ${props => props.size}em;
`

const SubBox = styled.div`

    align-self: flex-end;
    width: 540px;

    margin: 2vh 0 0 0;
    padding: 0 0 2vh 0;
    border-left: solid ${colors.darkSurface} 6px;

    display: flex;
    flex-direction: column;

    overflow-y: scroll;

`

const Link = styled.a`

    text-decoration: none;

    margin: 3vh 0 0 40px;

    width: fit-content;

    color: ${colors.mediumText};

    box-shadow: 0 4px 0 ${colors.mediumText};
    
    font-size: ${props => props.size}em;

    cursor: pointer;
`




const Home = props => {
    return (
        <Page>
            {props.loggedIn ?
            <InfoBox>
                <TitleBox size={3}>Home</TitleBox>
                <SubTitle size={1.6}>{`Welcome back ${props.userInfo.username}!`}</SubTitle>
                <SubBox>
                    <TitleBox size={2}>Your Proofs</TitleBox>
                    <ProofIndex>
                        {props.userInfo.proofs.map( p => <ProofCard key={p.proofId} {...p} myProofId={p.proofId}/>)}
                    </ProofIndex>
                </SubBox>
            
            </InfoBox>
            : 
            <InfoBox>
                <TitleBox size={4}>Natural</TitleBox>
                <SubTitle size={1.6}>A virtual tutor for natural deduction proofs</SubTitle>
                <SubBox>
                    <TitleBox size={2}>Get Started</TitleBox>
                    <Link size={1.6} onClick={()=>props.history.push('./exercises')}>Try an Exercise</Link>
                    <Link size={1.6} onClick={()=>props.history.push('./newProof')}>Enter a New Proof</Link>
                    <Link size={1.6} onClick={props.toggleSignIn}>Create an Account</Link>
                </SubBox>
                <SubBox>
                    <TitleBox size={2}>About</TitleBox>
                    <Link size={1.6} href='https://en.wikipedia.org/wiki/Logic'>Formal Logic</Link>
                    <Link size={1.6} href="https://en.wikipedia.org/wiki/Natural_deduction">Natural Deduction</Link>
                    <Link size={1.6} href="https://github.com/iangrubb">Me</Link>
                </SubBox>

            </InfoBox>
            }
        </Page>
    );
}

const msp = () => {
    return state => {
       
        return {...state, loggedIn: state.userInfo}
    }
}

export default withRouter(connect(msp)(Home))
