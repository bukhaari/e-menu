import TextError from './textError'
import { Field, ErrorMessage } from 'formik'
import { TextField, FormLabel } from '@mui/material'
import { makeStyles } from '@mui/styles'

function BaseFile(props) {
    const {
        name,
        lable,
        topLabel,
        variant = 'outlined',
        parentclass,
        background,
        image = null,
        width,
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
        <div className={parentclass}>
            <FormLabel>{topLabel}</FormLabel>
            <Field type="file" as="file" name={name}>
                {({ field, form }) => {
                    const { name, value, onChange } = field
                    return (
                        <TextField
                            fullWidth
                            type="file"
                            size="small"
                            className={classes.root}
                            variant={variant}
                            {...rest}
                            name={name}
                            onChange={(e) => {
                                const image = e.target.files[0]
                                form.setFieldValue('image', image)
                            }}
                        />
                    )
                }}
            </Field>

            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default BaseFile
