import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { allUserAction, deleteUserAction, updateUserStatus } from '../../redux/actions/userAction';
import { toast } from 'react-toastify';
import axios from 'axios';


const DashUsers = () => {

    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.allUsers);
    let data = [];
    data = (users !== undefined && users.length > 0) ? users : []

    useEffect(() => {
        dispatch(allUserAction());
    }, []);

    console.log("the data is ",data)
        
    const [status,setStatus]=useState('pending')

    const getUserId = async(status,id)=>{
        console.log("id ans status is ",id," ",status)
        try{
               const {data} = await axios.patch('https://portal-backend-txn0.onrender.com/api/user/userStatus',{id,status})

               toast.success("User Application Status updatedSuccessfully!");
               setTimeout(() => {
                   window.location.reload();
               }, 2000);
        }
        catch(err){
            console.log(err);
        }
    }
 
  
    const columns = [

        {
            field: '_id',
            headerName: 'User ID',
            width: 220,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'E_mail',
            width: 150,
        },
        {
            field: 'firstName',
            headerName: 'firstName',
            width: 120,
        },
        
        {
            field: 'jobHistory',
            headerName: 'Last Applied Job',
            width: 220,
            renderCell: (params) => {
                console.log("params status is ",params?.value[(params?.value?.length)-1]?.title)
                return<>
                    <span>{params?.value[(params?.value?.length)-1]?.title}</span>
                </>
              }           
            },
            {
            field: "User Resume",
            width: 150,
            renderCell: (values) => {
                { console.log("values for resume id is  ",values)}
                return <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                <Button disabled={!values.row.imageUrl} variant="contained" target="_blank" href={values.row.imageUrl} color="error">View Resume</Button>
            </Box>
            }
        },
        
        {
            field: "Application Status",
            width: 180,
            renderCell: (values) => {
                // { console.log("values for app status id is  ",values)}
                
                return <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <select name="selectedFruit" defaultValue={values.row?.jobHistory[values.row.jobHistory.length-1]?.applicationStatus} onChange={(e)=>getUserId(e.target.value,values.id)}>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accept</option>
                    <option value="rejected">Reject</option>
                </select>
                </Box>
            }
        },
        
        {
            field: 'role',
            headerName: 'User status',
            width: 150,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : "Regular user"
            )
        }
    ];


    
    return (
        <>
            <Box >
                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    All users
                </Typography>

                <Paper sx={{ bgcolor: "#67e3b9" }} >

                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{

                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                    bgcolor:'white'
                                },
                                color: 'black',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: '#c6e3b8'
                                },
                                button: {
                                    color: 'black'
                                }

                            }}
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[3]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>

            </Box>
        </>
    )
}

export default DashUsers
