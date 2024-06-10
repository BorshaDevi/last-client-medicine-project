import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";
import app from '../../Firebase/firebaseConfig'
import usePublie from "../../Hook/usePublie";
export const AuthContext=createContext()
const auth=getAuth(app)
const AuthProvider = ({children}) => {
    const axiosPublic=usePublie()
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
            console.log('User',currentUser)
            setUser(currentUser)
            setLoading(false)
            if(currentUser){
                const email=currentUser?.email
                 axiosPublic.post('/jwt',{email})
                .then(result =>{
                    if(result.data.token){
                        localStorage.setItem('token',result.data.token)
                    }
                })
            }
            else{
                localStorage.removeItem('token')
            }
        })
        return () =>{
            return unsubscripe()
        }
    },[axiosPublic])


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