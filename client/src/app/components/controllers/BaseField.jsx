import TextError from "./textError";
import { Field, ErrorMessage } from "formik";
import { TextField, FormLabel } from "@mui/material";
import { makeStyles } from '@mui/styles'

function BaseField(props) {
  const {
    name,
    lable,
    topLabel,
    variant = "outlined",
    parentclass,
    background,
    width,
    ...rest
  } = props;

  const useStyles = makeStyles({
    root: {
      background,
      width,
    },
  });

  const classes = useStyles();

  return (
    <div className={parentclass}>
      <FormLabel>{topLabel}</FormLabel>
      <Field name={name}>
        {(props) => {
          return (
            <TextField
              fullWidth
              size="small"
              label={lable}
              className={classes.root}
              variant={variant}
              {...rest}
              {...props.field}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default BaseField;
