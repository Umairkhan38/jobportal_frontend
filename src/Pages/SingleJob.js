import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../Components/Footer'
import LoadingBox from '../Components/LoadingBox'
import Navbar from '../Components/Navbar'
import { jobLoadSingleAction } from '../redux/actions/jobAction'
import Button from '@mui/material/Button'
import { userApplyJobAction } from '../redux/actions/userAction'
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify'

const SingleJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { singleJob, loading } = useSelector(state => state.singleJob)
    const { userInfo } = useSelector(state => state.signIn);


    const {user} = useSelector(state=>state.userProfile);
    
    console.log("user profile is ",user)
    
    if(!user?.imageUrl){
        toast.error("please upload a resume in edit-profile section to Apply!")
    }
    
    const { id } = useParams();

    
    const arr=[{title:"Senior Java Developer",url:'https://youtube.com/playlist?list=PLu0W_9lII9agS67Uits0UnJyrYiXhDS6q&feature=shared'},
    {title:'dotNet Developer', url:'https://youtube.com/playlist?list=PL18HZjtdIA4DiYGQj1zst6myBAVE3wgMg&feature=shared'},
    {title:'DevOps', url:'https://youtube.com/playlist?list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&feature=shared'},
    {title:'MERN_STACK Developer', url:'https://youtube.com/playlist?list=PLBuAVfmfL97YHkuJcVZrrGzBKOh80e0ru&feature=shared'},
    {title:'Frontend Developer', url:'https://youtube.com/playlist?list=PLbtI3_MArDOkNtOan8BQkG6P8wf6pNVz-&feature=shared'},
    {title:"Automation Tester - Cypress", url:"https://youtube.com/playlist?list=PL8VbCbavWfeG_QP9yIylsXOCb8CJunKU_&feature=shared"},
    {title:'Node.js Application Developer', url:'https://youtube.com/playlist?list=PL8p2I9GklV456iofeMKReMTvWLr7Ki9At&feature=shared'},
    {title:"UI/UX Developer",url:"https://youtube.com/playlist?list=PLvDSYqFjjGrjIDkeaXwQPwBVKR3D4vsAH&feature=shared"}]
    

     
     useEffect(() => {
         dispatch(jobLoadSingleAction(id));
         if(userInfo){
            toast.success('If You want, you can update your resume in edit section before applying!')
        }
    
    }, [id]);
     
 
    
    const applyForAJob = () => {
        

        dispatch(userApplyJobAction({
            title: singleJob && singleJob.title,
            description: singleJob && singleJob.description,
            salary: singleJob && singleJob.salary,
            location: singleJob && singleJob.location,

        }))
        setTimeout(()=>{
            navigate('/');
        },3000)
    }


    return (
        <>

            <Box sx={{ bgcolor: "#fafafa" }}>

                <Navbar />
                <Box sx={{ height: '85vh' }}>
                    <Container sx={{ pt: '30px' }}>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Box sx={{ flex: 4, p: 2 }}>

                                {
                                    loading ? <LoadingBox /> :

                                        <Card>
                                            <CardContent>
                                                <Typography variant="h5" component="h3">
                                                    {singleJob && singleJob.title}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Salary</Box>: ${singleJob && singleJob.salary}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Category</Box>: {singleJob && singleJob.jobType ? singleJob.jobType.jobTypeName : "No category"}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Location</Box>: {singleJob && singleJob.location}
                                                </Typography>
                                                <Typography variant="body2" sx={{ pt: 2 }}>
                                                    {/* <h3>Job description:</h3> */}
                                                    {singleJob && singleJob.description}
                                                </Typography>
                                            </CardContent>
                                           
                                        </Card>
                                }
                            </Box>  
                            <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2 }}>
                                    <Button disabled={!user?.imageUrl} onClick={applyForAJob} sx={{ fontSize: "13px",backgroundColor:'green',color:'white' }} variant='contained'>Apply for this Job</Button>
                                </Card>
                            </Box>
                        </Stack>

                           <hr />
                          <h2>Recommended Free Courses for you to get Skillup!</h2>      
                           <hr />

                        <Box style={{margin:'15px'}}>{
                        arr?.map(elem=>{
                            if(elem?.title===singleJob?.title){
                                return <ReactPlayer url={elem.url} />
                            }

                        })
                        }
                        </Box>
                        

                    </Container>
                </Box>
                {/* <Footer /> */}
            </Box>
        </>
    )
}

export default SingleJob

