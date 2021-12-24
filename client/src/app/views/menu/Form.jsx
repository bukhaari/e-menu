import { memo, useState } from 'react'
import { Container, Grid, IconButton, Icon } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PopupDiolog from '../../components/common/PopUpDiolog'
import BaseFormik from '../../components/common/BaseFormik'
import BaseField from '../../components/controllers/BaseField'
import BaseButton from '../../components/controllers/BaseBtn'
import * as Yup from 'yup'
import axios from 'axios'
import useSwr from 'swr'

import AddIcon from '@mui/icons-material/Add'

const useStyles = makeStyles((theme) => ({
    button: {
        // marginTop: theme.spacing(2),
        // marginRight: theme.spacing(4),
        float: 'right',
        fontSize: '15px',
    },
}))

const breakPoin = { xs: 12, sm: 12 }

function EmployeeForm({ titlePopUp, isNewOrUpdate = {} }) {
    const classes = useStyles()

    const url = 'company/'

    const { data, mutate } = useSwr(url)

    const [PopUp, setPopUp] = useState(false)

    let [loading, setLoading] = useState(false)

    const onSubmit = async (values, formikHelpers) => {
        console.log(values)

        if (isNewOrUpdate._id) {
            setLoading(true)

            await axios.put(url + isNewOrUpdate._id, values)
            mutate()
            setPopUp(false)
            formikHelpers.resetForm()
            setLoading(false)
        }

        if (isNewOrUpdate === 'new') {
            setLoading(true)
            await axios.post(url, values)
            mutate([...data, values], false)
            formikHelpers.resetForm()
            setLoading(false)
        }
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!'),
    })

    const initialValues = {
        name: isNewOrUpdate._id ? isNewOrUpdate.name : '',
    }

    return (
        <>
            {isNewOrUpdate !== 'new' ? (
                <IconButton size={'small'} onClick={() => setPopUp(true)}>
                    <Icon
                    // color="inherit"
                    // style={{ color: '#d72323' }}
                    >
                        edit
                    </Icon>
                </IconButton>
            ) : (
                <IconButton
                    className={classes.button}
                    size={'small'}
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
                    maxWidth="lg"
                    style={{ marginTop: 25, marginBottom: 20 }}
                >
                    <BaseFormik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item {...breakPoin}>
                                <BaseField name="name" label="Name" />
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
