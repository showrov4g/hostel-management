import axios from "axios"

const axiosPublic = axios.create({
    baseURL: `https://hostel-management-vert.vercel.app`
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;