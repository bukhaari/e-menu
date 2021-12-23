import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    error: {
        color: 'red',
        marginLeft: '8px',
    },
})

function TextError({ children }) {
    const classes = useStyles()
    return <div className={classes.error}>{children}</div>
}

export default TextError
