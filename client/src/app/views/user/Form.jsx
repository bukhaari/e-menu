import { memo, useState } from 'react'
import { Container, Grid, IconButton, Icon } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PopupDiolog from '../../components/common/PopUpDiolog'
import BaseFormik from '../../components/common/BaseFormik'
import FormControl from '../../components/controllers/FormControl'
import * as Yup from 'yup'
import axios from 'axios'
import useSwr from 'swr'
import AddIcon from '@mui/icons-material/Add'

const useStyles = makeStyles((theme) => ({
    button: {
        float: 'right',
        fontSize: '15px',
    },
}))

const breakPoin = { xs: 12, sm: 6 }

function Form({ titlePopUp, isNewOrUpdate = {} }) {
    const classes = useStyles()

    const url = 'user/'

    const { mutate } = useSwr(url)

    const [PopUp, setPopUp] = useState(false)

    let [loading, setLoading] = useState(false)

    const boleanData = [
        { label: 'True', value: 'true' },
        { label: 'False', value: 'false' },
    ]

    const onSubmit = async (values, formikHelpers) => {
        try {
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

                mutate()
                formikHelpers.resetForm()
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!'),
    })

    const initialValues = {
        name: isNewOrUpdate?._id ? isNewOrUpdate.name : '',
        email: isNewOrUpdate?._id ? isNewOrUpdate.email : '',
        webUrl: isNewOrUpdate?._id ? isNewOrUpdate.webUrl : '',
        password: isNewOrUpdate?._id ? isNewOrUpdate.password : '',
        isAdmin: isNewOrUpdate?._id
            ? isNewOrUpdate.isAdmin
                ? 'true'
                : 'false'
            : '',
    }

    return (
        <>
            {isNewOrUpdate !== 'new' ? (
                <IconButton size={'small'} onClick={() => setPopUp(true)}>
                    <Icon>edit</Icon>
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
                <Container component="main" maxWidth="lg">
                    <BaseFormik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="field"
                                    name="name"
                                    label="Name"
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="field"
                                    name="email"
                                    label="Email"
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="field"
                                    type="password"
                                    name="password"
                                    label="Password"
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="select"
                                    name="isAdmin"
                                    label="is an admin"
                                    options={boleanData}
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="field"
                                    name="webUrl"
                                    label="Web Url"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    control="button"
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

export default memo(Form)
