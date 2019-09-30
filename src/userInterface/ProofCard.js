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
    height: 160px;

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
    height: 72%;

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


const ProofCard = props => {
    return (
        <Container>
            <Proof>
                {props.premises.map( (p, idx) => <Line key={idx}>{display(p, true)}</Line>)}
                <Line conclusion={true}>{display(props.conclusion, true)}</Line>
            </Proof>
            <Button active={true} text="Start Proof" onClick={props.loadProof(props.premises, props.conclusion, props.type, props.history)}/>
        </Container>
    );
}

const msp = () => {
    return state => {
        return {...state}
    }
}

const mdp = dispatch => {
    return {loadProof: (premises, conclusion, type, history) => () => loadProof(premises, conclusion, type, history, dispatch)}
}

export default withRouter(connect(msp, mdp)(ProofCard))

