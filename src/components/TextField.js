import React from 'react'

function TextField({name, value, type, label, handleChange, placeholder, required}) {
  return (
    <div className='field_row'>
        <label htmlFor="">{label}</label>
        <div className="field_input">
            <input type={type ? type : "text"} required={required ? true : false} name={name} placeholder={placeholder} onChange={handleChange} autoComplete="off" value={value} step=".01" />
        </div>
    </div>
  )
}

export default TextField