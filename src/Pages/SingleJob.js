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
    const [course, setCourse] = useState([]);



    const {user} = useSelector(state=>state.userProfile);
    
    console.log("user profile is ",user)
    
    if(!user?.imageUrl){
        toast.error("please upload a resume in edit-profile section to Apply!")
    }
    
    const { id } = useParams();

   

    // Define your API key and the title of the video you want to fetch
    const apiKey = 'AIzaSyCQDRKgIbxE-wwNJvAW6rf-oIm1slZGLtw';
    console.log("singlejob is ",singleJob);
    const playlistTitle = singleJob?.title;

    
    useEffect(() => {
      dispatch(jobLoadSingleAction(id));
  }, [dispatch, id]); // Only run when id changes
  

  useEffect(() => {
      if (!playlistTitle) return; // Ensure there's a title before fetching
  
      const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=playlist&q=${encodeURIComponent(playlistTitle)}`;
  
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json(); // Return the parsed JSON
          })
          .then(data => {
              // Handle the response data
              setCourse(data.items);
              console.log("response is ", data);
              console.log("course is ",course);
          })
          .catch(error => {
              // Handle errors
              console.error('There was a problem with the fetch operation:', error);
          });
  }, [playlistTitle]);

//     useEffect(() => {
//         dispatch(jobLoadSingleAction(id));
//         if(userInfo){
//             toast.success('If You want, you can update your resume in edit section before applying!')
//         }
        
//         // Construct the URL for fetching the playlist data
//         // if(singleJob){
//         const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=playlist&q=${encodeURIComponent(playlistTitle)}`;


// // Make a GET request to the YouTube Data API
// fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const res = response.json();
//     // console.log("course is ",course)
//   })
//   .then(data => {
//     // Handle the response data
//     setCourse(data)
//     console.log("response is ",data)
//     console.log(data);
//   })
//   .catch(error => {
//     // Handle errors
//     console.error('There was a problem with the fetch operation:', error);
//   });

//         // }
//     }, [id]);
     
 
    
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

                                    singleJob && (
                                        <Card>
                                          <CardContent>
                                            <Typography variant="h5" component="h3">
                                              {singleJob.title}
                                            </Typography>
                                            <Typography variant="body2">
                                              <Box component="span" sx={{ fontWeight: 700 }}>Salary</Box>: ${singleJob.salary}
                                            </Typography>
                                            <Typography variant="body2">
                                              <Box component="span" sx={{ fontWeight: 700 }}>Category</Box>: {singleJob.jobType ? singleJob.jobType.jobTypeName : "No category"}
                                            </Typography>
                                            <Typography variant="body2">
                                              <Box component="span" sx={{ fontWeight: 700 }}>Location</Box>: {singleJob.location}
                                            </Typography>
                                            <Typography variant="body2" sx={{ pt: 2 }}>
                                              {singleJob.description}
                                            </Typography>
                                          </CardContent>
                                        </Card>
                                      )
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

                           <Box style={{display:"flex", flexWrap:"wrap"}}>
                           {course.map(item => {
                              const playlistId = item.id.playlistId;
                              const list = `https://www.youtube.com/playlist?list=${playlistId}`;
                              return <ReactPlayer style={{ margin: '15px 5px' }} url={list} key={playlistId} />;
                            })}
                                </Box>
                                                        

                    </Container>
                </Box>
                {/* <Footer /> */}
            </Box>
        </>
    )
}

export default SingleJob

