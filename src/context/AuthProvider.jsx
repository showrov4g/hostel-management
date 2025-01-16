import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";


export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null)
    const [loading, setLoading]= useState(true)
    const provider = new GoogleAuthProvider();
    const axiosPublic = UseAxiosPublic();

    // create user 
    const createUser =(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // user login 
    const loginUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    // user logout 
    const logout = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    // google login 
    const loginWithGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    // update user profile
    const updateUserProfile=(updateData)=>{
        return updateProfile(auth.currentUser, updateData)
    }

    // user observer management
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            if(currentUser){
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }else{
                localStorage.removeItem('access-token')
            }


            setUser(currentUser)
            setLoading(false)
        })
        return()=>{
            unSubscribe();
        }
    },[])

    const authInfo={
        user,
        createUser,
        loginUser,
        logout,
        loginWithGoogle,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;