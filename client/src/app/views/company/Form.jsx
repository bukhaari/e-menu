import { memo, useState } from 'react'
import {
    Container,
    Grid,
    IconButton,
    Icon,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import PopupDiolog from '../../components/common/PopUpDiolog'
import BaseFormik from '../../components/common/BaseFormik'
import BaseField from '../../components/controllers/BaseField'
import BaseButton from '../../components/controllers/BaseBtn'
import * as Yup from 'yup'

import AddIcon from '@mui/icons-material/Add'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(4),
        float: 'right',
    },
}))

const breakPoin = { xs: 12, sm: 12 }

function EmployeeForm({ titlePopUp, isNewOrUpdate = {} }) {
    const classes = useStyles()
    const [PopUp, setPopUp] = useState(false)

    let [loading, setLoading] = useState(false)

    const onSubmit = async (values) => {
         console.log(values)

        if (isNewOrUpdate._id) {
            setLoading(true)
            setLoading(false)
        }

        if (isNewOrUpdate === 'new') {
            setLoading(true)
            setLoading(false)
        }
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!'),
    })

    const initialValues = {
        name: '',
    }

    return (
        <>
            {isNewOrUpdate !== 'new' ? (
                <IconButton size={'small'} onClick={() => setPopUp(true)}>
                    <Icon style={{ color: '#d72323' }} color="inherit">
                        edit
                    </Icon>
                </IconButton>
            ) : (
                <IconButton
                    className={classes.button}
                    size={'small'}
                    style={{ fontSize: '15px' }}
                    onClick={() => setPopUp(true)}
                >
                    <AddIcon /> Add New
                </IconButton>
            )}

            <PopupDiolog
                title={titlePopUp}
                OpenPopUp={PopUp}
                setOpenPopUp={setPopUp}
            >
                <Container
                    component="main"
                    maxWidth="sm"
                    style={{ marginTop: 25, marginBottom: 20 }}
                >
                    <BaseFormik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item {...breakPoin}>
                                <BaseField
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    label="Phone Number"
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <BaseButton
                                    loading={loading}
                                    label={
                                        isNewOrUpdate._id ? 'Update' : 'Create'
                                    }
                                />
                            </Grid>
                        </Grid>
                    </BaseFormik>
                </Container>
            </PopupDiolog>
        </>
    )
}

export default memo(EmployeeForm)
