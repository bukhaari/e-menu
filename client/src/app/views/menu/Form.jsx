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

    const url = 'menu/'

    const { mutate } = useSwr(url)
    const { data: category } = useSwr('category/')

    const [PopUp, setPopUp] = useState(false)

    let [loading, setLoading] = useState(false)

    const categoryData = category?.map((d) => {
        return { label: d.name, value: d._id }
    })

    const boleanData = [
        { label: 'True', value: 'true' },
        { label: 'False', value: 'false' },
    ]

    const onSubmit = async (values, formikHelpers) => {
        if (isNewOrUpdate?._id && values.image === '') {
            values.image = isNewOrUpdate.image
        }        
        
        const formData = new FormData()

        formData.append('image', values.image)
        formData.append('name', values.name)
        formData.append('price', values.price)
        formData.append('available', values.available)
        formData.append('bestSeller', values.bestSeller)
        formData.append('description', values.description)
        formData.append('categoryId', values.categoryId)

        try {
            if (isNewOrUpdate._id) {
                setLoading(true)
                await axios.put(url + isNewOrUpdate._id, formData, )
                mutate()
                setPopUp(false)
                formikHelpers.resetForm()
                setLoading(false)
            }

            if (isNewOrUpdate === 'new') {
                setLoading(true)
                await axios.post(url, formData)

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
        categoryId: Yup.string().required('Name is required!'),
    })

    const initialValues = {
        name: isNewOrUpdate?._id ? isNewOrUpdate.name : '',
        price: isNewOrUpdate?._id ? isNewOrUpdate.price : '',
        available: isNewOrUpdate?._id
            ? isNewOrUpdate.available
                ? 'true'
                : 'false'
            : '',
        bestSeller: isNewOrUpdate?._id
            ? isNewOrUpdate.bestSeller
                ? 'true'
                : 'false'
            : '',
        description: isNewOrUpdate?._id ? isNewOrUpdate.description : '',
        categoryId: isNewOrUpdate?._id ? isNewOrUpdate?.category?._id : '',
        image: '',
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
                                    name="price"
                                    label="Price"
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="select"
                                    label="is an available"
                                    name="available"
                                    options={boleanData}
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="select"
                                    label="is a bestSeller"
                                    name="bestSeller"
                                    options={boleanData}
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="select"
                                    label="Select Category"
                                    name="categoryId"
                                    options={categoryData}
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="field"
                                    label="Description"
                                    name="description"
                                />
                            </Grid>
                            <Grid item {...breakPoin}>
                                <FormControl
                                    control="file"
                                    topLabel="Image"
                                    name="image"
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
