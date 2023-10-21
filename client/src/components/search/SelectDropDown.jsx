
import React from 'react'

export const SelectDropDown = ({handleChange, options, selected}) => {
  return (
    <select onInput={handleChange} name='category' defaultValue={selected}>
      {
        options.map((option) => (
          <option value={option} key={option} >{ option }</option>
        ))
      }
    </select>
  )
}
