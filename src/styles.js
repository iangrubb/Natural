import styled from 'styled-components'

export const colors = {

    darkText: '#0A050A',
    lightText: '#EBEAEF',
    highlightText: '#FCF926',

    darkSurface: '#18091B',
    mediumSurface: '#A49FAD',
    lightSurface: '#F9F7FC',

    hightlightOutline: '#FCF946',

    availableBackground: '#42C2C9',
    currentGoalBackground: '#46E681',

    pointer: 'red',


    


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

const boxstyle = `  
    border-radius: 2px;
    background: ${colors.lightSurface};
    border: 12px solid ${colors.mediumSurface};
    box-shadow: 4px 4px 0 ${colors.darkSurface};
`