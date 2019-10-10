import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {withRouter} from 'react-router-dom'

import Button from '../userInterface/Button'

import display from '../helpers/display'

import { colors, fonts } from '../styles'

import loadProof from '../helpers/loadProof'

const Container = styled.div`

    width: 180px;

    margin: 2%;
    padding: 10px;

    background: ${colors.mediumSurface};

    box-shadow: 6px 6px 0 ${colors.darkSurface};

    border-radius:2px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`

const Proof = styled.div`
    width: 98%;
    height: 120px;

    font-family:${fonts.text};
    font-size: 0.9em;

    overflow: scroll;

    background: ${colors.lightSurface};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Line = styled.div`
    padding: 4px 0;
    width: 92%;
    border-top: ${props => props.conclusion ? `2px solid ${colors.darkText}` : 'none'};
    display: flex;
    align-items: flex-end;
`

const Complete = styled.div`


    height: 30px;
    width: 30px;

    z-index: 2;

    
    border: 2px solid ${colors.darkSurface};
    border-radius: 50%;

    background: lightgreen;
    

    color: darkgreen;

    text-align: center;

    display:flex;
    justify-content: center;
    align-items: center;

`

const Row = styled.div`

    width: 90%;
    margin: 4px 0 0 0;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
`


const ProofCard = props => {
    return (
        <Container>
            
            <Proof>
                {props.premises.map( (p, idx) => <Line key={idx}>{display(p, true)}</Line>)}
                <Line conclusion={true}>{display(props.conclusion, true)}</Line>
            </Proof>
            <Row>
            <Button active={true} text="Start Proof" onClick={props.loadProof(props.premises, props.conclusion, props.type, props.history, props.myProofId)}/>
            {props.complete ? <Complete>✓</Complete>  : null}
            </Row>
            
        </Container>
    );
}

const msp = () => {
    
    return (state, ownProps) => {

        return {...state, complete: state.userInfo && ownProps.myProofId && state.userInfo.success_ids.includes(ownProps.myProofId)}
    }
}



const mdp = dispatch => {
    return {loadProof: (premises, conclusion, type, history, id) => () => loadProof(premises, conclusion, type, history, dispatch, id)}
}

export default withRouter(connect(msp, mdp)(ProofCard))

