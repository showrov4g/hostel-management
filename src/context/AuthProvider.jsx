import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";


export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null)
    const [loading, setLoading]= useState(true)
    const provider = new GoogleAuthProvider();

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

    // user observer management
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
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
        loginWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;