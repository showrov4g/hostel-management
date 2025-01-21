import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { useNavigate, useParams } from 'react-router';

const UserProfile = () => {
    const axiosSecure = UseAxiosSecure()
    const [loginUser, setLoginUser] = useState(null);
    const {id}= useParams();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()

    // ------------
    const {data: logUser}= useQuery({
        queryKey:['loginUser'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })
   

    
    return (
        <div>
            <h1>{user?.displayName}</h1>
            <img src={user?.photoURL} alt="" />
            <p>{user?.email}</p>
            <p>Bage: {logUser?.subscription}</p>
        </div>
    );
};

export default UserProfile;