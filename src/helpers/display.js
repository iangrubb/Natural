
import React from 'react';
import styled from 'styled-components'

const Part = styled.div`
    display: flex;
    align-items: center;

    font-weight: ${props=> props.bold ? '700' : '400'}
    font-size: ${props=> props.size ? `${props.size}` : '1'}em

    transform: translateY(${props=> props.sub ? '4px' : '0px'})
`
 
const display = (content, main) => {

    switch(content.type){
        case "atom":
            if (content.letter) {
                return <Part >{content.letter}</Part>
            } else {
                return <><Part>{content.predicate}</Part>{ content.terms.map( (t, idx) => {
                    if (typeof t === 'string') {
                        return <Part key={idx} size={0.9}>{t}</Part>
                    } else {
                        return <><Part key={idx} size={0.9}>x</Part><Part size={0.6} sub={true}>{t}</Part></>
                    }
                })}                
                </>
            }
        case "universal":
            return <Part>  <Part bold={true} size={1.2}>∀</Part>  <Part size={0.9}>x</Part><Part size={0.6} sub={true}>{content.variable}</Part>{display(content.right, false)}</Part>
        case "existential":
            return <Part>  <Part bold={true} size={1.2}>∃</Part>  <Part size={0.9}>x</Part><Part size={0.6} sub={true}>{content.variable}</Part>{display(content.right, false)}</Part>
        case "contradiction":
            return <Part>⊥</Part>
        case "negation":
            return <Part>¬{display(content.right, false)}</Part>
        case "conjunction":
            return (
                <Part>
                    {main ? null : '('}
                    {display(content.left, false)}
                    {' & '}
                    {display(content.right, false)}
                    {main ? null : ')'}
                </Part>
                )
        case "disjunction":
            return (
                <Part>
                    {main ? null : '('}
                    {display(content.left, false)}
                    {' ∨ '}
                    {display(content.right, false)}
                    {main ? null : ')'}
                </Part>
                )
        case "conditional":
            return (
                <Part>
                    {main ? null : '('}
                    {display(content.left, false)}
                    {' → '}
                    {display(content.right, false)}
                    {main ? null : ')'}
                </Part>
                )
    }
}

export default display