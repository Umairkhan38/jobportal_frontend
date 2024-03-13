import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LogIn from './Pages/Login';
import UserDashboard from './Pages/user/UserDashboard';
import UserRoute from './Components/UserRoute';
import Layout from './Pages/globle/Layout';
import UserJobsHistory from './Pages/user/UserJobHistory.js';
import UserInfoDashboard from './Pages/user/UserInfoDashboard';
import AdminDashboard from './Pages/admin/AdminDashboard';
import AdminRoute from './Components/AdminRoute';
import SingleJob from './Pages/SingleJob';
import DashUsers from './Pages/admin/DashUsers';
import DashJobs from './Pages/admin/DashJobs';
import DashCategory from './Pages/admin/DashCategory';
import DashCreateJob from './Pages/admin/DashCreateJob';
import DashCreateCategory from './Pages/admin/DashCreateCategory';
import Register from './Pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import EditProfile from './Pages/EditProfile';
import { userProfileAction } from './redux/actions/userAction';
import StudyBot from './Components/StudyBot';
import { useState } from 'react';
import { toast } from "react-toastify";
import chat from "./assets/headset-solid.svg";
import close from "./assets/xmark-solid.svg";


//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC=Layout(UserInfoDashboard)
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCategoryHOC = Layout(DashCategory)
const DashCreateJobHOC = Layout(DashCreateJob)
const DashCreateCategoryHOC = Layout(DashCreateCategory)


const App = () => {

    const dispatch=useDispatch();
    const { userInfo } = useSelector(state => state.signIn);


    useEffect(() => {
        dispatch(userProfileAction());
    }, []);

    const [bot, setBot] = useState(false);

  const toggleBot = () => {
    if (userInfo) {
      bot === true ? setBot(false) : setBot(true);
    } else {
      toast.error("please! Login to access a StudyBot");
    }
  };


    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProSidebarProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/search/location/:location' element={<Home />} />
                            <Route path='/search/:keyword' element={<Home />} />
                            <Route path='/login' element={<LogIn />} />
                            <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/admin/users' element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                            <Route path='/admin/jobs' element={<AdminRoute><DashJobsHOC /></AdminRoute>} />
                            <Route path='/admin/category' element={<AdminRoute><DashCategoryHOC /></AdminRoute>} />
                            <Route path='/admin/job/create' element={<AdminRoute><DashCreateJobHOC /></AdminRoute>} />
                            <Route path='/admin/category/create' element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />

                            <Route path='/job/:id' element={<SingleJob />} />


                            <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
                            <Route path='/user/jobs' element={<UserRoute><UserJobsHistoryHOC /></UserRoute>} />
                            <Route path='/user/info' element={<UserRoute><UserInfoDashboardHOC /></UserRoute>} />
                            <Route path='/user/edit/:id' element={<EditProfile />} />

                            <Route path='*' element={<NotFound />} />
                          
                        </Routes>

                         {/* Move the conditional rendering outside of the <Routes> component */}
        {!bot ? (
          <img
            src={chat}
            style={{
              position: "fixed",
              right: "45px",
              bottom: "25px",
              color: "white",
              backgroundColor: "rgb(157, 216, 241)",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "18px",
            }}
            alt="chatbot"
            width="70"
            onClick={toggleBot}
          />
        ) : (
          <div className="flex-bot" style={{ position: "fixed", bottom: "3px", right: "5px" }}>
            <StudyBot />
            <img
              src={close}
              onClick={toggleBot}
              width='15'
              style={{
                position: "absolute",
                padding: "3px 5px",
                top: "18px",
                right: "25px",
                borderRadius: "3px",
                backgroundColor: "white",
                zIndex: "200",
                cursor: "pointer"
              }}
            />
          </div>
        )}
                          
                    </BrowserRouter>
                </ProSidebarProvider>
            </ThemeProvider>
        </>
    )
}

export default App