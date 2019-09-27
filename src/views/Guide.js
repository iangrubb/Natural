import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Page } from '../styles'

const Guide = props => {
    return (
        <Page>
            
        </Page>
    );
}

const msp = () => {
    return state => {
       
        return {}
    }
}

export default connect(msp)(Guide)