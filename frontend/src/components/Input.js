import React, { useState } from 'react'
import styled from 'styled-components'
import Col from './Col'
import Text from './Text'

const StyledInput = styled.input`
  width: ${props => props.wid || 'auto'};
  min-width: ${props => props.minWid || 'auto'};
  height: ${props => props.ht || 'auto'};
  background-color: #fff;
  border: none;
  padding: 6px;
  border-radius: 6px;
`

const StyledTextArea = styled.textarea`
  width: ${props => props.wid || 'auto'};
  height: ${props => props.ht || 'auto'};
`

const Input = (props) => {
  const { handleChange = console.log, value, label } = props

  return (
    <React.Fragment>
      {props.multiline
        ? (
          <StyledTextArea
            {...props}
            onChange={({ target }) => handleChange(target.value)}
            value={value}
          />
        ) : ( 
          <Col>
            {label && (
                <Text>
                  {label}
                </Text>
            )}

            <StyledInput
              {...props}
              onChange={({ target }) => handleChange(target.value)}
              value={value}
            />
          </Col>
        )
      }
    </React.Fragment>
  )
}

export default Input