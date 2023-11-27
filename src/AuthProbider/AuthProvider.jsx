import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider,createUserWithEmailAndPassword,onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebaseAuth/firebase.config";
import useAxoisPublic from "../Hooks/useAxiosPublic";



export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
  const provider = new GoogleAuthProvider();
  const [user,setuser]=useState(null)
  const [loading,setloading]=useState(true)
 
  const axoisPublic=useAxoisPublic()

// create user
  const createuser=(email,password)=>{
    setloading(true)
  return createUserWithEmailAndPassword(auth,email,password)
  }

   // loging
   const Loginguser = (email,password)=>{
    setloading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

  

  const googleAuth = ()=>{
    setloading(true)
  return signInWithPopup(auth,provider)
  }


  const logOut =()=>{
    setloading(true)
  return signOut(auth)
  }



  const updateprofile =(name,image)=>{
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: image 
    })
      }



      
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,currentuser=>{
      console.log('asi re bai asi',currentuser);
    setuser(currentuser)
    setloading(false)

    if(currentuser){

      const userInfo={email: currentuser.email }
      axoisPublic.post('/jwt',userInfo)
      .then(res=>{
      if(res.data.token){
        localStorage.setItem('access-token',res.data.token);
        setloading(false)
      }
      })
      }
      else{
      localStorage.removeItem('access-token')
      setloading(false)
      }  

   

    })
    return()=>{
      unSubscribe();
    }
    
    },[axoisPublic])











  const authInfo = {
    createuser,
    Loginguser,
    googleAuth,
    user,
    logOut,
    updateprofile,
    loading
  }

  return (
    <div>
        <AuthContext.Provider value={authInfo} >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;