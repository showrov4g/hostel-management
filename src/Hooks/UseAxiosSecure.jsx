import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

const axiosSecure = axios.create({
    baseURL: 'https://hostel-management-vert.vercel.app/'
})


const UseAxiosSecure = () => {
    const navigate = useNavigate()
    const {user, logout} = useContext(AuthContext);
    // request interceptor for authorization data 
    axiosSecure.interceptors.request.use(function(config){
        
        const token = localStorage.getItem("access-token");
        console.log("request is stop by interceptor", token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    },function(error){
        return Promise.reject(error);
    })
    // 401 and 403 status 
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async(error)=>{
        const status = error.response.status;
        if(status=== 401 || status ===403){
            await logout();
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure;
};

export default UseAxiosSecure;