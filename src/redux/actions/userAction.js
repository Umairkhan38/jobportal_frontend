import axios from 'axios';
import { toast } from "react-toastify";
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS
} from '../constants/userConstant';
import { useSelector } from 'react-redux';



export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("http://localhost:8000/api/signin",user,
        {withCredentials: true, credentials: 'include'});
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        const { data } = await axios.get("http://localhost:8000/api/logout");
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}



// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("/api/signup", user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}



// userUpdate action
export const userUpdateAction = (user) => async (dispatch) => {

    const { userInfo } = useSelector(state => state.signIn);

    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post(`/api/user/edit/${userInfo.id}`, user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}



//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("http://localhost:8000/api/me", {withCredentials: true, credentials:'include'});
        console.log("me api data is ",data)

        dispatch({
            type: USER_LOAD_SUCCESS,
            payload:data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}



//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/allusers");
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}



//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    console.log("job is ",job);
    try {
        const { data } = await axios.post("/api/user/jobhistory", job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Successfully Applied for this Job!");

    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

