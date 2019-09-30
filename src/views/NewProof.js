import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { withRouter } from 'react-router-dom'

import { Page, colors } from '../styles'

import SentenceForm from '../userInterface/SentenceForm'
import Button from '../userInterface/Button'

import Fade from 'react-reveal'

import display from '../helpers/display'
import loadProof from '../helpers/loadProof'



const TypeChoice = styled.div`

    height: 200px;
    width: 250px;

    padding: 20px 50px;
    margin: 50px;

    border-radius: 2px;
    background: ${colors.lightSurface};
    border: 12px solid ${colors.mediumSurface};
    box-shadow: 4px 4px 0 ${colors.darkSurface};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`

const Label = styled.h2`
    margin: 20px 0 10px 0;
`

const Info = styled.p`
    margin: 10px;
    text-align: center;
`

const ButtonRow = styled.div`

    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

`

const LineRow = styled.div`

    width: 100%;

    margin: 0 0 10px 0;

    display: flex;
    justify-content: center;
    align-items: center;

`

const EntryForm = styled.div`
    margin: 10px;
    width: 100%;
    height: 60%;

    display: flex;
    justify-content: center;
    align-items: center;


`

const SentenceFormDisplay = styled.div`
    width: 300px;
    height: 80%;
    margin: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Proof = styled.div`


    width: 40%;
    max-width: 300px;
    min-height: 200px;

    padding: 20px 0;
    margin: 10px;

    border-radius: 2px;
    background: ${colors.lightSurface};
    border: 12px solid ${colors.mediumSurface};
    box-shadow: 4px 4px 0 ${colors.darkSurface};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`


const NewProof = props => {

    const [type, setType] = useState(null)
    const [premises, setPremises] = useState([])
    const [conclusion, setConclusion] = useState([])
    const [adding, setAdding] = useState(null)

    const remove = idx => () => {
        setPremises([...premises.slice(0, idx), ...premises.slice(idx+1, premises.length)])
    }

    return (
        <Page>

            {type ?
            <EntryForm>
                <Proof>
                    <Info>{`New ${type} proof:`}</Info>
                    <Label>Premises</Label>
                    {premises.length === 0 ?
                    <LineRow>
                        <Info>(none)</Info>
                    </LineRow>
                    :
                    <>
                    {premises.map( (p, idx) => {
                        return (
                            <LineRow >
                                <Info >{display(p)}</Info>
                                <Button text="X" minor={true} active={!adding} onClick={remove(idx)} />
                            </LineRow>
                        )})
                    }
                    </>
                    }
                    <Button text="+" active={!adding} onClick={()=>setAdding("premise")}/>

                    <Label>Conclusion</Label>
                    {conclusion.length === 0 ?
                    <LineRow>
                        <Info>(required)</Info>
                        <Button text="+" active={!adding} onClick={()=>setAdding("conclusion")}/>
                    </LineRow>
                    :
                    <LineRow>
                        <Info>{display(conclusion[0], true)}</Info>
                        <Button text="X" minor={true} active={!adding} onClick={()=>setConclusion([])}/>
                    </LineRow>
                    }


                    <ButtonRow>
                        <Button text="submit" active={!adding && conclusion.length !== 0} onClick={props.loadProof(premises, conclusion[0], type, props.history)}/>
                        <Button text="cancel" active={!adding} onClick={()=>{
                            setType(null)
                            setPremises([])
                            setConclusion([])
                            setAdding(null)
                        }} />
                    </ButtonRow>

                </Proof>
                <SentenceFormDisplay><Fade right duration={200} when={adding}>
                    <SentenceForm type={type} label={`Add a ${adding}:`} cancel={() => setAdding(null)} confirm={result => () => {
                        if (adding === "premise") {
                            setPremises([...premises, result])
                        } else {
                            setConclusion([result])
                        }
                        setAdding(null)
                    }} />
                </Fade></SentenceFormDisplay>
            </EntryForm>
            
            :
            <TypeChoice>
                <Label>Start a new proof!</Label>
                <Info>What kind of proof do you want to start?</Info>
                <ButtonRow>
                    <Button text="propositional" active={true} onClick={()=>setType("propositional")}/>
                    <Button text="predicate" active={true} onClick={()=>setType("predicate")}/>
                </ButtonRow>
            </TypeChoice>
            }
            
            
           
            
        </Page>
    )
}


const msp = () => {
    return state => {
       
        return {...state}
    }
}

const mdp = dispatch => {
    return {loadProof: (premises, conclusion, type, history) => () => loadProof(premises, conclusion, type, history, dispatch)}
}

export default withRouter(connect(msp, mdp)(NewProof))


