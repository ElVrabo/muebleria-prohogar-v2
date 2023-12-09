import React from "react"

interface InputTextProps{
    type:string,
    width:string
}

const InputText = ({type,width}:InputTextProps)=>{
    return (
        <input type={type} style={{width:width}}  />
    )
}
export default InputText