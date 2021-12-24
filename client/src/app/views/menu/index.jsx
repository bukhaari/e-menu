import React from 'react'
import { styled } from '@mui/system'
import { Paper, Container, Grid, Icon, IconButton } from '@mui/material'
import useSwr from 'swr'
import { MDBDataTable } from 'mdbreact'
import BtnForm from './Form'
import axios from 'axios'

export const Main = styled(Container)(() => ({
    '& .css-1t99kfi-MuiPaper-root': {
        margin: '20px',
        padding: '10px',
    },
}))

const IconStyle = styled(Icon)(() => ({
    color: '#d72323',
}))

export default function Menu() {
    const url = 'company/'

    const { data, mutate } = useSwr(url, { initialData: [] })

    const handleDlete = async (id) => {
        await axios.delete(url + id)
        mutate()
    }

    const TableData = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                // width: 150,
            },
            {
                label: 'Date',
                field: 'date',
                sort: 'asc',
                // width: 70,
            },
            {
                label: 'Time',
                field: 'time',
                sort: 'asc',
                // width: 70,
            },
            {
                label: 'Action',
                field: 'action',
                // sort: 'asc',
                // width: 50,
            },
        ],
        rows: data?.map((row) => {
            const data = { ...row }
            row.action = (
                <>
                    <BtnForm titlePopUp="Company form" isNewOrUpdate={data} />

                    <IconButton
                        size={'small'}
                        onClick={() => handleDlete(row._id)}
                    >
                        <IconStyle>delete</IconStyle>
                    </IconButton>
                </>
            )
            row.time = new Date(data.createdAt).toLocaleTimeString()
            row.date = new Date(data.createdAt).toDateString()
            return row
        }),
    }

    return (
        <Main>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <BtnForm
                            titlePopUp="Company form"
                            isNewOrUpdate="new"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MDBDataTable responsive hover data={TableData} />
                    </Grid>
                </Grid>
            </Paper>
        </Main>
    )
}
