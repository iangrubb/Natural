import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Page } from '../styles'

import ProofCard from '../userInterface/ProofCard'


const ProofIndex = styled.div`

    width: 80%;
    background: gray;

    padding: 2%;

    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

`


const Home = props => {
    return (
        <Page>
            {props.loggedIn ?
            <>
            <h2> Hello {props.userInfo.username}!</h2>
            <h3>Your Proofs</h3>
            <ProofIndex>
                {props.userInfo.proofs.map( p => <ProofCard key={p.proofId} {...p} />)}
            </ProofIndex>
            </>
            : 
            <h2>Landing Page</h2>
            }
            
        </Page>
    );
}

const msp = () => {
    return state => {
       
        return {...state, loggedIn: state.userInfo}
    }
}

export default connect(msp)(Home)
