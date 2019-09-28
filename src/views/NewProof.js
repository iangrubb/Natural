import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Page } from '../styles'

const NewProof = () => {
    return (
        <Page>
            
        </Page>
    )
}


const msp = () => {
    return state => {
       
        return {...state}
    }
}

export default connect(msp)(NewProof)


