import styled from 'styled-components'

export const colors = {

    darkText: '#120F14',
    lightText: '#EBEAEF',
    highlightText: '#ECF280',

    darkSurface: '#1F1823',
    mediumSurface: '#A49FAD',
    lightSurface: '#F9F7FC',

    focusOutline: '#CECB02',

    availableBackground: '#A2D3AC',
    currentGoalBackground: '#F3FF9B',


    


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