
import React,{ createContext ,useContext , useState, useEffect} from "react";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
    
  } from "firebase/auth";
  const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyDi_yqiC8EABK-Lgo6g1jz6mxtd0FHAHj0",
  authDomain: "insta-6bcb5.firebaseapp.com",
  projectId: "insta-6bcb5",
  storageBucket: "insta-6bcb5.appspot.com",
  messagingSenderId: "767016756533",
  appId: "1:767016756533:web:3923e18f1615309243187c",
  measurementId: "G-C2CGCT4J65"
};

// Initialize Firebase
const firebaseApp=initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseApp);
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => { 

    const [user,setuser]=useState(null);
    useEffect(()=>{
      onAuthStateChanged(firebaseAuth,(user)=>{
       if(user){
         setuser(user);
       }
       else {
         setuser(null);
       }
      })
    },[user])
 
   const isLoggedIn = user ? true : false;
    const signupUserWithPassEmailName= async (email,password,username,fullname)=>{
       return createUserWithEmailAndPassword(firebaseAuth,email,password,username,fullname)
    }
    const loginWithEmailandPass= async (email, password)=>{
     
     return signInWithEmailAndPassword(firebaseAuth,email, password);
         
    }
    const loginWithFacebook = async () => {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      try {
        const result = await signInWithPopup(firebaseAuth, provider);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    return (
        <FirebaseContext.Provider
          value={{
            signupUserWithPassEmailName,
            loginWithEmailandPass,
             loginWithFacebook,
             isLoggedIn
            //  https://insta-6bcb5.firebaseapp.com/__/auth/handler  raj_gahlot galhlot_raj
          }}
        >
      {props.children}
        </FirebaseContext.Provider>
      );
    };