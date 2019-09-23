
import React from 'react';
import styled from 'styled-components'

const Part = styled.div`
    display: flex;
    align-items: center;
`

const display = (content, main) => {

    switch(content.type){
        case "atom":
            return <Part>{content.letter}</Part>
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