import React from 'react'
import { styled } from '@mui/system'
import { Paper, Container } from '@mui/material'
import { MDBDataTable } from 'mdbreact'
import BtnForm from "./Form"

export const Main = styled(Container)(() => ({
    '& .css-1t99kfi-MuiPaper-root': {
        marginTop: '20px',
        padding: '10px',
    },
}))

function Company(props) {
    const TableData = {
        columns: [
          {
            label: "Name",
            field: "name",
            sort: "asc",
            width: 150,
          },
          {
            label: "Date",
            field: "date",
            sort: "asc",
            width: 70,
          },
          {
            label: "Action",
            field: "action",
            sort: "asc",
            width: 50,
          },
        ],
        rows:[
            {name:"pizza house", date:"12/23/2021", action:"action"},
            {name:"Syl", date:"12/23/2021", action:"action"},
        ]
      };

    return (
        <Main>
            <Paper>
                Company
                <BtnForm
                    titlePopUp="Employee Registration"
                    isNewOrUpdate="new"
                />
                <MDBDataTable responsive hover data={TableData} />
            </Paper>
        </Main>
    )
}

export default Company
