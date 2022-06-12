import React from 'react'

const InputBase = ({label, ...props}) => (
        <>
            <input type="number" {...props}/>
            <span>{label}</span>
        </>
    )

export default InputBase