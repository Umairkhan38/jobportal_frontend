import { useTheme } from '@emotion/react'
import { Box, Card, Container, ListItemIcon,  Pagination, MenuList, Stack, Typography,MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import {useDispatch, useSelector} from 'react-redux';
import { jobAction } from '../redux/actions/jobAction'
import { useState } from 'react'
import {useParams,Link, useNavigate} from 'react-router-dom'
import CardElement from '../Components/CardElement'
import Footer from '../Components/Footer'
import LoadingBox from '../Components/LoadingBox'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SelectComponent from '../Components/SelectComponent'
import { jobTypeLoadAction } from '../redux/actions/jobTypeAction'
import StudyBot from '../Components/StudyBot'


function Home() {

  const {jobs,setUniqueLocation, pages, loading} = useSelector(state=>state.loadJobs);
  console.log(loading);
  

  const {palette} = useTheme();
  const dispatch = useDispatch()
  const [page,setPage]=useState(1)
  const [cat,setCat]=useState('')
  const {keyword, location} = useParams(); 
  const { userInfo } = useSelector(state => state.signIn);
  const navigate=useNavigate();

  console.log(jobs);
  useEffect(() => {
    if(userInfo){
        navigate('/')
    }else{
        navigate('/login')
    }
}, []);

  useEffect(()=>{
    dispatch(jobAction(page,keyword,cat,location));
  },[page,keyword,cat,location])

  useEffect(() => {
    dispatch(jobTypeLoadAction());
}, []);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
}


  return (
    <>
    <Box sx={{bgColor:'#fafafa', minHeight:'100vh'}}>
     <Navbar /> 
      <Header />
      <Container>
        <Stack direction={{ xs:'column', sm:'row'}}
          spacing={{xs:1, sm:2, md:2}}
        >
          <Box sx={{flex:2, p:2}}>
            <Card sx={{ minWidth:150, mb:3, mt:3, p:2}}>
            <Box sx={{pb:2}}>
              <Typography component='h4' sx={{color : palette.secondary.main, fontWeight:600}}>
              Filter Job By Category
              </Typography>
            </Box>
            <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />

            </Card> 
               {/* jobs by location */}
              

          </Box>
          <Box sx={{flex:5, p:2}}>
            {
              loading ? 
              <LoadingBox /> 
              :
              jobs && jobs.length === 0 ?
            <>
                <Box
                    sx={{
                        minHeight: '350px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <h2>No result found!</h2>
                </Box>
            </> :
              jobs&&jobs.map((job,i)=>{
              return  <CardElement
                  key={i}
                  id={job._id}
                  jobTitle={job.title}
                  description={job.description}
                  category={job.jobType ? job.jobType.jobTypeName : "No category"}
                  location={job.location}
                   />
              })
            }
            <Stack spacing={2}>
              <Pagination page={page} count={pages === 0 ? 1: pages} onChange={(event,value)=>setPage(value)} /> 
            </Stack>
          </Box>
        </Stack>
      </Container>
      </Box>

      <Footer />
      </>

    )
}

export default Home