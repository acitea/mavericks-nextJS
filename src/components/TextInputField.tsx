import { TextField } from "@mui/material"
import { useState, FC, ChangeEvent, ChangeEventHandler } from "react"


type TextInputFieldProps = {
    // onChange : ChangeEventHandler,
    name : string,
    validation? : Function
    // value : number | string,
}
export const TextInputField : FC<TextInputFieldProps> = ({validation = () => true, name}) => {

    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    function changeValueHandler(e:ChangeEvent, validation:Function) {
        let value = e.target.nodeValue ?? ''
        setValue(value)
        setError(validation(value))
    }

    return (
        <>
        <TextField id="standard-basic" label="Standard" variant="standard"
            onChange={e => changeValueHandler(e, validation)}
            name={name}
            value={value}
            error={error}
        />
        </>
    )
}