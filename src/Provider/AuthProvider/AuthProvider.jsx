import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";
import app from '../../Firebase/firebaseConfig'
export const AuthContext=createContext()
const auth=getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading , setLoading]=useState(true)
    
    const googleProvider = new GoogleAuthProvider();
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password) 
    }
    const loggingUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }
    const signGoogle=()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const updateUser=(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo,

        })
    }

    useEffect(() => {
        const unsubscripe=onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return () =>{
            return unsubscripe()
        }
    },[])


    const Info={
      user,
      loading,
      createUser,
      loggingUser,
      logOut,
      signGoogle,
      updateUser,

    }
    return (
        <div>
            <AuthContext.Provider value={Info}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;