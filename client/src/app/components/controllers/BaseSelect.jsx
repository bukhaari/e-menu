import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './textError'
import { MenuItem, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'

function BaseSelect(props) {
    const {
        name,
        lable,
        topLabel,
        variant = 'outlined',
        parentclass,
        background,
        width,
        options,
        ...rest
    } = props

     const useStyles = makeStyles({
         root: {
             background,
             width,
         },
     })

     const classes = useStyles()

    return (
        <>
            {/* <label htmlFor={name}>{label}</label> */}
            <Field name={name}>
                {(props) => {
                    return (
                        <TextField
                            fullWidth
                            select
                            size="small"
                            label={lable}
                            className={classes.root}
                            variant={variant}
                            {...rest}
                            {...props.field}
                        >
                            {options.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )
                }}
            </Field>
            <ErrorMessage component={TextError} name={name} />
        </>
    )
}

export default BaseSelect
