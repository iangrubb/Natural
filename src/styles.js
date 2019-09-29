import styled from 'styled-components'

export const colors = {

    darkText: '#120F14',
    lightText: '#EBEAEF',
    highlightText: '#F7F379',

    darkSurface: '#1F1823',
    mediumSurface: '#A09BA5',
    lightSurface: '#C8C7C9',
    whiteSurface: '#EDEAEF',


    


}

export const fonts = {

    display: 'Josefin Sans',
    text: 'Open Sans',
}

export const Page = styled.div`
    width: 100%;
    height: calc(100% - 50px);

    background: ${colors.lightSurface};

    overflow: scroll;

    display: flex;
    flex-direction: column;
    align-items: center;
`