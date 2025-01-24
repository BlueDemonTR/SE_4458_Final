import React, { useState } from 'react'
import AtlasButton from '@atlaskit/button'
import styled from 'styled-components'

const Wrapper = styled.div`${props => `
    width: ${props.wid || 'auto'};


    button {
        ${props.white && `
            background: #fff
        `};

        ${props.black && `
            background: #000
        `};

        width: ${props.wid || 'auto'};
        height: ${props.ht || 'auto'};
        ${props.bg && `background: ${props.bg}`};
        ${props.pad && `padding: ${props.pad}`};
    }

    button:hover {
        ${props.white && `
            background: #ccc;
        `};
        
        ${props.black && `
            background: #333;
        `};

        ${props.hoverBg && `background: ${props.hoverBg};`}
    }

    span {
        ${props.white && `
            color: #000;
        `}
        
        ${props.black && `
            color: #fff;
        `}

        ${props.col && `color: ${props.col};`}
    }

`}`

const Button = (props) => {
    const { children } = props

    //appearance = [primary, default, subtle, link, subtle link, warning, danger]

    return (
        <Wrapper {...props} onClick={() => null}>
            <AtlasButton
                appearance='primary'
                spacing='compact'
                {...props}
                onClick={props.disabled ? () => null : props.onClick}
                style={props.disabled ? {
                    background: 'gray'
                } : {

                }}
            >
                {children}
            </AtlasButton>
        </Wrapper>
    )
}

export default Button