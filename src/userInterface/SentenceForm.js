import React, { useState, useEffect } from 'react';

import styled from 'styled-components'

import Button from './Button'

import {colors, fonts} from '../styles'



const variableDisplay = number => {

    if (number === 1) {
        return <Part size={0.9}>x</Part>
    } else if (number === 2) {
        return <Part size={0.9}>y</Part>
    } else if (number === 3){
        return <Part size={0.9}>z</Part>
    } else {
        return <><Part size={0.9}>x</Part><Part size={0.6} sub={true}>{number}</Part></>
    }    
}



const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


const Container = styled.div`

    width: 80%;

    background: ${colors.mediumSurface};

    box-shadow: 6px 6px 0 ${colors.darkSurface};

    padding: 20px;

`

const Window = styled.div`

    overflow: scroll;
    height: 40px;

    margin: 8px 0;

    background: ${colors.whiteSurface};

    display: flex;
    justify-content: center;
    align-items: center;

`

const ButtonRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 50px;



    overflow: scroll;

`

const Label = styled.h3`
    padding: 0 10px;
    margin: 4px 0;
`



const Gap = styled.div`

    height: 24px;
    width: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: ${colors.mediumSurface};
    border-radius: 2px;

    border: ${props=> props.active ? `dashed 2px ${colors.darkSurface}` : "none"}

`

const Part = styled.div`

    font-family: ${fonts.text};

    display: flex;
    align-items: center;

    font-weight: ${props=> props.bold ? '700' : '400'}
    font-size: ${props=> props.size ? `${props.size}` : '1'}em

    transform: translateY(${props=> props.sub ? '4px' : '0px'})

    border: ${props=> props.active ? "dashed 2px #333" : "none"}
`





const SentenceForm = props => {

    const [sentences, setSentences] = useState([{id: 1, type: "gap"}])
    const [focus, setFocus] = useState(1)
    const [counter, setCounter] = useState(1)


    const resultBuilder = sentence => {
        if (sentence.type === "atom") {
            return sentence
        } else if (sentence.type === "universal" || sentence.type === "existential" || sentence.type === "negation") {
            const right = sentences.find( s => s.id === sentence.right)
            return {...sentence, right: resultBuilder(right)}
        } else if (sentence.type === "conditional" || sentence.type === "conjunction" || sentence.type === "disjunction") {
            const left = sentences.find( s => s.id === sentence.left)
            const right = sentences.find( s => s.id === sentence.right)
            return {...sentence, left: resultBuilder(left), right: resultBuilder(right)}
        }
    }

    const totalResult = resultBuilder(sentences.find(s => s.id === 1))


    const handleInput = value => {

        if (focus) {
            const target = sentences.find( s => s.id === focus)
            const remainder = sentences.filter( s => s.id !== focus)

            if (props.type === "propositional") {
                const updated = {id: target.id, type: "atom", letter: value.toUpperCase()}
                setSentences([...remainder, updated])
                setFocus(null)
            } else {
                if (target.type === "gap") {
                    const updated = {id: target.id, type: "atom", predicate: value.toUpperCase() , terms: []}
                    setSentences([...remainder, updated])
                } else {
                    if (typeof value === "number" || !['x', 'y', 'z'].includes(value.toLowerCase())) {
                        const processedValue = typeof value === "string" ? value.toLowerCase() : value
                        const updated = {...target, terms: [...target.terms, processedValue]}
                        setSentences([...remainder, updated])

                    }
                }

            }
        }
    }


    const collectVariables = (target, collection) => {

        let newCollection
        if (target.type === "universal" || target.type === "existential" ) {
            newCollection = [...collection, target.variable]
        } else {
            newCollection = [...collection]
        }

        if (target.id === 1) {
            return newCollection
        } else {
            const parent = sentences.find( s => s.left === target.id || s.right === target.id)
            return collectVariables(parent, newCollection)
        }

    }

    const activeVariables = focus ? collectVariables(sentences.find( s => s.id === focus), []) : null
    


    const handleKey = e => {
        if (alphabet.includes(e.key.toLowerCase())) {
            handleInput(e.key)
        }
    }

    useEffect( () => {
        document.addEventListener("keyup", handleKey)
        return ()=>document.removeEventListener("keyup", handleKey)
    } , [sentences, focus])


    const clear = () => {
        setSentences([{type: "gap", id: 1}])
        setFocus(1)
        setCounter(1)
    }

    
    const update = type => () => {

        const target = sentences.find( s => s.id === focus)
        const remainder = sentences.filter( s => s.id !== focus)


        if (target.type === "gap") {

            if (type === "conditional" || type === "conjunction" || type === "disjunction") {

                const updated = {id: target.id, type: type, left: counter + 1, right: counter + 2}
                const added = [updated, {id: counter + 1 ,type: 'gap'}, {id: counter + 2,type: 'gap'}]
    
                setCounter(counter + 2)
                setFocus(counter + 1)
                setSentences([...remainder, ...added])
    
            } else if (type === "negation") {
                
                const updated = {id: target.id, type: type, right: counter + 1}
                const added = [updated, {id: counter + 1 ,type: 'gap'}]

                setCounter(counter + 1)
                setFocus(counter + 1)
                setSentences([...remainder, ...added])

            } else if (type === "universal" || type === "existential" ) {

                const newVariable = activeVariables.length + 1
                const updated = {id: target.id, type: type, variable: newVariable, right: counter + 1}
                const added = [updated, {id: counter + 1 ,type: 'gap'}]

                setCounter(counter + 1)
                setFocus(counter + 1)
                setSentences([...remainder, ...added])
            }
        }
    }


    const display = (content, main) => {
    
        switch (content.type){
            case "gap":
                return <Gap active={content.id === focus} onClick={()=>setFocus(content.id)}></Gap>

            case "atom":
                if (content.letter) {
                    return <Part active={content.id === focus}>{content.letter}</Part>
                } else {
                    return <Part active={content.id === focus}><Part>{content.predicate}</Part>{ content.terms.map( t => {
                        if (typeof t === 'string') {
                            return <Part size={0.9}>{t}</Part>
                        } else {
                            return variableDisplay(t)
                        }
                    })}                
                    </Part>
                }
            case "universal":
                return <Part active={content.id === focus}>  <Part bold={true} size={1.2}>∀</Part>  {variableDisplay(content.variable)}  {display(sentences.find( s => s.id === content.right), false)}</Part>
            case "existential":
                return <Part active={content.id === focus}>  <Part bold={true} size={1.2}>∃</Part>  {variableDisplay(content.variable)}  {display(sentences.find( s => s.id === content.right), false)}</Part>
            case "negation":
                return <Part active={content.id === focus}>¬{display(sentences.find( s => s.id === content.right), false)}</Part>
            case "conjunction":
                return (
                    <Part active={content.id === focus}>
                        {main ? null : '('}
                        {display(sentences.find( s => s.id === content.left), false)}
                        {' & '}
                        {display(sentences.find( s => s.id === content.right), false)}
                        {main ? null : ')'}
                    </Part>
                    )
            case "disjunction":
                return (
                    <Part active={content.id === focus}>
                        {main ? null : '('}
                        {display(sentences.find( s => s.id === content.left), false)}
                        {' ∨ '}
                        {display(sentences.find( s => s.id === content.right), false)}
                        {main ? null : ')'}
                    </Part>
                    )
            case "conditional":
                return (
                    <Part active={content.id === focus}>
                        {main ? null : '('}
                        {display(sentences.find( s => s.id === content.left), false)}
                        {' → '}
                        {display(sentences.find( s => s.id === content.right), false)}
                        {main ? null : ')'}
                    </Part>
                    )
        }
    }


    return (
        <Container>

            <Window >
                {display(sentences.find(s=>s.id === 1), true)}
            </Window>

            <ButtonRow>
                <Label>Connectives:</Label>
                <Button active={true} text="&" onClick={update("conjunction")} />
                <Button active={true} text="∨" onClick={update("disjunction")} />
                <Button active={true} text="→" onClick={update("conditional")} />
                <Button active={true} text="¬" onClick={update("negation")}/>
                {props.type === "predicate" ? <Button active={true} text="∀" onClick={update("universal")}/> : null}
                {props.type === "predicate" ? <Button active={true} text="∃" onClick={update("existential")}/> : null}
            </ButtonRow>

            {props.type === "predicate"? 
            <ButtonRow>
                <Label>Variables in scope:</Label>
                {activeVariables && activeVariables.length > 0 ? activeVariables.map( v => <Button active={sentences.find(s=>s.id===focus).type === "atom"     } text={variableDisplay(v)} onClick={()=>handleInput(v)} />) : "(none)"}
            </ButtonRow>
            : null}

            <ButtonRow>
                <Button active={!sentences.find( s => s.type === "gap" || (s.terms && s.terms.length === 0))} text="Confirm" onClick={props.confirm(totalResult)}/>
                <Button active={true} text="Clear" onClick={clear}/>
                <Button active={true} text="Cancel" onClick={props.cancel}/>
            </ButtonRow>

        </Container>
    );
}


export default SentenceForm
