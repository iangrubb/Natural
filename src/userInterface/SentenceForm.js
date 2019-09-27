import React, { useState } from 'react';

import styled from 'styled-components'

import Button from './Button'


const Container = styled.div`
    background: white;
    border-radius: 4px;

    padding: 20px;

    width: 360px;
`

const Window = styled.div`

    overflow: scroll;
    height: 50px;

    margin: 16px 0;
    border: solid 2px #aaa;
    border-radius: 20px;

    background: #ddd;

    display: flex;
    justify-content: center;
    align-items: center;

`

const ButtonRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`

const Label = styled.h3`
    padding: 0 10px;
    margin: 4px 0;
`

const InputText = styled.input`

    width: 40px;
    height: 24px;

    margin: 0 4px;

    padding: 0;

    background: #ddd;
    border: solid #aaa 2px;
    border-radius: 4px;

    font-family: 'Josefin Sans', sans-serif;
    font-size: 1em;

    text-align: center;

    :focus {
        outline: none;
    }

`

const TextInputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`

const Part = styled.div`
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: ${props => props.color}

`


// Should accept quanifier boolean
// Should accept arrays of atoms, predicates, and constants.


const SentenceForm = props => {

    const [sentence, setSentence] = useState({type: "gap", active:true})
    const [focus, setFocus] = useState()
    const [atoms, setAtoms] = useState(props.initialAtoms)
    const [predicates, setPredicates] = useState(props.initialPredicates)
    const [constants, setConstants] = useState(props.initialConstants)




    const render = partialSentence => {
    
        switch (partialSentence.type){
            case "gap":
                return 3
        }
        
    }


    return (
        <Container>
            <Label>Connectives:</Label>
            <ButtonRow>
                <Button active={true} text="&"/>
                <Button active={true} text="∨"/>
                <Button active={true} text="→"/>
                <Button active={true} text="¬"/>
                {props.type === "predicate" ? <Button active={true} text="∀"/> : null}
                {props.type === "predicate" ? <Button active={true} text="∃"/> : null}
            </ButtonRow>

            {props.type === "propositional"?
            <>
            <Label>Atoms:</Label>
            <ButtonRow>
                <Button active={true} text="A"/>
            </ButtonRow>
            </>
            : null}

            {props.type === "predicate"? 
            <>
            <Label>Predicates:</Label>
            <ButtonRow>
                <Button active={true} text="A"/>
            </ButtonRow>
            </>
            : null}

            {props.type === "predicate"? 
            <>
            <Label>Constants:</Label>
            <ButtonRow>
                <Button active={true} text="a"/>
            </ButtonRow>
            </>
            : null}
            {props.type === "predicate"? 
            <>
            <Label>Variables:</Label>
            <ButtonRow>
                <Button active={true} text="x"/>
            </ButtonRow>
            </>
            : null}

            <ButtonRow>

                {props.type === "propositional" ?
                <TextInputContainer>
                    <Label>New atom:</Label>
                    <InputText type="text" />
                </TextInputContainer>
                : null}

                {props.type === "predicate" ?
                <TextInputContainer>
                    <Label>New predicate:</Label>
                    <InputText type="text" />
                </TextInputContainer>
                : null}

                {props.type === "predicate" ?
                <TextInputContainer>
                    <Label>New constant:</Label>
                    <InputText type="text" />
                </TextInputContainer>
                : null}

            </ButtonRow>

            <Label>Sentence:</Label>
            <Window>{render(sentence)}</Window>
            <ButtonRow>
                <Button active={true} text="Confirm"/>
                <Button active={true} text="Clear"/>
                <Button active={true} text="Cancel"/>
            </ButtonRow>
            
            
            
        </Container>
    );
}


export default SentenceForm
