import React, { useState } from 'react'

const Checkbox = ({ handleChange = console.log, value }) => {

  return (
    <input
        type='checkbox'
        onChange={({ target }) => handleChange(target.checked)}
        checked={value}
    />
  )
}

export default Checkbox