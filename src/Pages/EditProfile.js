import { Avatar, Box } from '@mui/material'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux'
import { userSignUpAction, userUpdateAction } from '../redux/actions/userAction'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userProfileAction } from '../redux/actions/userAction';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import {toast} from 'react-toastify';



const validationSchema = yup.object({
    firstName: yup
        .string('Enter your First Name')
        .min(3, 'First Name should be of minimum 3 characters length')
        .required('First Name is required'),
    lastName: yup
        .string('Enter your Last Name')
        .min(3, 'Last Name should be of minimum 3 characters length')
        .required('Last Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required')
});


const EditProfile = () => {
    
    const { user } = useSelector(state => state.userProfile);
    const { userInfo } = useSelector(state => state.signIn);

    const params = useParams()
    const dispatch = useDispatch();
    const navigate=useNavigate();

    if(!userInfo){
        navigate('/login');
    }

 
    const handleFileChange = (event) => {
        formik.setFieldValue('imgFile', event.target.files[0]);
    };
    

    const formik = useFormik({
        initialValues: {
          firstName: `${user?.firstName}`,
          lastName: `${user?.lastName}`,
          email: `${user?.email}`,
          imgFile:null
        },

        validationSchema: validationSchema,
        onSubmit: async(values, actions) => {

            try{

                const formData = new FormData();
                formData.append('imgFile', values.imgFile);
                formData.append('firstName', values.firstName);
                formData.append('lastName', values.lastName);
                formData.append('email', values.email);
                const {data} = axios.patch(`/api/user/edit/${params.id}`,formData);
                toast.success("Your Profile Updated Successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
            catch(err){
                toast.error(err);

            }

        }
    });



    return (
        <>
            <Navbar />
            <Box sx={{ height: '100vh', display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "primary.white" }}>

                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <h2>Edit Profile</h2>
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name='firstName'
                            InputLabelProps={{
                                shrink: true,
                            }}

                            placeholder="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name='lastName'
                            InputLabelProps={{
                                shrink: true,
                            }}

                            placeholder="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />

                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            name='email'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E-mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                          <label
                            htmlFor="file-input"
                            style={{
                            backgroundColor: 'teal',
                            color: 'white',
                            width: '100%',
                            display:'flex',
                            padding: '2px 20px',
                            borderRadius: '5px',
                            marginBottom:'10px',
                            alignItems:'center',
                            cursor: 'pointer',
                            }}
      >
            {<AddIcon style={{ color: 'white', fontSize: '1.6rem', margin: '5px 0px' }} />}
        Select Resume
      </label>
      <input
        type="file"
        name="imgFile"
        id="file-input"
        onChange={(e) => handleFileChange(e)}
        onBlur={formik.handleBlur}
        style={{ display: 'none' }}
      />
      {formik.values.imgFile && formik.values.imgFile.name && (
        <p>Selected File: {formik.values.imgFile.name}</p>
      )}
        <p style={{color:'red'}}>*please upload file in jpg,png,jpeg format only!*</p>

            <Button fullWidth variant="contained" type='submit'>Update</Button>       
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default EditProfile
