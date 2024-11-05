import React,{ createContext,useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import profile from './Imgs/profile.jpg'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  // getDocs,
  collection,
  
  query,
  orderBy,
  onSnapshot,updateDoc, arrayUnion,arrayRemove,
} from "firebase/firestore";
import { getDatabase} from 'firebase/database';

// import {  getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  
  signInWithPopup,
  onAuthStateChanged,
  signOut

} from "firebase/auth";

const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp=initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseApp);
export const database = getFirestore(firebaseApp);
export const realdatabase = getDatabase(firebaseApp)
export const storage = getStorage(firebaseApp);




export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => { 
const [searchshow,setSearchshow]= useState(false)  
  const [email, setemail] = useState();
  const [fullname, setfullname] = useState();
  const [username, setusername] = useState();
  const [dob, setdob] = useState('');
  const [password, setpassword] = useState();
  const [user, setuser] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [getAllUser, setgetAllUser] = useState([]);
  const [search,setSearch]= useState(false)
const [hello,sethello]=useState(false)
  useEffect(()=>{
     onAuthStateChanged(firebaseAuth,(user)=>{
      if(user){
        setuser(user);
      }
      else {
        setuser(null);
      }
     })
   },[])

  const isLoggedIn = user ? true : false;

  // register
 
  const signupUserWithPassEmailName = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  // login
  const loginWithEmailandPass= async (email, password)=>{

   return signInWithEmailAndPassword(firebaseAuth,email, password);

  }
  // login with facebook
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
  // logout
  const logout = async () => {
    try {
      // Clear myId from Redux
      setuser(null);
      setUserdata(null);
      console.log("User logged out");
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  // Write user data to Firestore
  const writeUserData = async (userId) => {
    try {
      if (!userId) {
        throw new Error("User ID is missing.");
      }
      const userRef = doc(database, "users", userId); // Ye sahi reference hai
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const userData = {
        userId:userId,
        email: email,
        fullname: fullname,
        username: username,
        dob: dob,
        bio: "",
        gender:"",
        proimg: profile,
        followers:[],
        followings:[],
        password: password,
        videos:[],
        stories:[],
        date: new Date().toLocaleString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        time: time,
      };
      await setDoc(userRef, userData);
      return userData;
    } catch (error) {
      console.error("Error writing user data: ", error);
      throw error;
    }
  };
  
  
  const userData = (email, fullname, username, password) => {
    setemail(email);
    setfullname(fullname);
    setusername(username);
    setpassword(password);
    // setUserId(userId)
    };

  // save daata
  const saveData = async () => {
    try {

      const usera = await signupUserWithPassEmailName(email, password);
      if (usera) {
        const userIda = usera.user.uid; // Yeh value directly user se le rahe hain
        await writeUserData(userIda); // direct pass kar rahe hain userIda ko
      }
    } catch (error) {
      console.log("Error signing up:", error);
    }
  };
  
  const savedob=(maindob)=>{
    setdob(maindob)
  }
  // get userdata
  async function getUserData(userId) {
    try {
      const userRef = doc(database, "users", userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        // setUserData(userData); // Set the fetched data into the state

        return userData;
      } else {
        console.log("No such user!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      throw error;
    }
  }
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // indexOf
          const data = await getUserData(user.uid); // Fetch user data using the user's UID
          // setmyId(data.userId);
          setUserdata(data); // Set the fetched data into the state
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user,hello]); // Re-run effect when user or getUserData changes

  // get all user function
  const getAllUserFunction = () => {
    try {
      const q = query(
        collection(database, "users"),
        orderBy("time"), // Assuming 'time' field exists in the user documents
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setgetAllUser(userArray);
        // setLoading(false);
      });
      return () => unsubscribe(); // Clean up subscription on unmount
    } catch (error) {
      console.error("Error fetching users: ", error);
      // setLoading(false);
    }
  };
  useEffect(() => {
   
    getAllUserFunction();
    
  }, []);
 const followuser=async(id)=>{
  if(userdata.userId){
  try {
    // console.log("heloss",userdata.userId)
    const userRef = doc(database, "users", userdata.userId);
 const updatedData = {
  followings: arrayUnion(id)
 };
 await updateDoc(userRef, updatedData);
 console.log("follower",id)
 const userRef1 = doc(database, "users", id);
 const updatedData1 = {
  followers: arrayUnion(userdata.userId)
 };
 await updateDoc(userRef1, updatedData1);
//  console.log("followerd",id)

} catch (error) {
 console.error("Error in following user:", error);
}
}}
const unfollowuser =async(id)=>{
  if (userdata.userId) {
    try {
      // Reference to the user's document in Firestore
      const userRef = doc(database, "users", userdata.userId);

      // Prepare the updated data with arrayRemove to remove the user from followings
      const updatedData = {
        followings: arrayRemove(id), // Removes the specified user ID from the followings array
      };
      await updateDoc(userRef, updatedData);
      const userRef1 = doc(database, "users", id);

      // Prepare the updated data with arrayRemove to remove the user from followings
      const updatedData1 = {
        followers: arrayRemove(userdata.userId), // Removes the specified user ID from the followings array
      };

      // Update Firestore document
      await updateDoc(userRef1, updatedData1);
      console.log("User successfully unfollowed!");
    } catch (error) {
      console.error("Error in unfollowing user:", error);
    }
  }
}
const saved = async (links,postUserId,type) => {
  if (userdata.userId && links) {
    try {
      const linkObject = {
        link: links,
        userId: postUserId,
        type:type
      };
      const userRef = doc(database, "users", userdata.userId);
      const updatedData = {
        saved: arrayUnion(linkObject)
      };
      await updateDoc(userRef, updatedData);
      console.log("Link with user ID added successfully:");
    } catch (error) {
      console.error("Error in adding link with user ID:", error);
    }
  } else {
    console.error("User ID or link is missing.");
  }
};
const deleteSaved = async (links, postUserId, type) => {
  if (userdata.userId && links) {
    try {
      const linkObject = {
        link: links,
        userId: postUserId,
        type: type
      };
      const userRef = doc(database, "users", userdata.userId);
      const updatedData = {
        saved: arrayRemove(linkObject)
      };
      await updateDoc(userRef, updatedData);
      console.log("Link with user ID removed successfully:");
    } catch (error) {
      console.error("Error in removing link with user ID:", error);
    }
  } else {
    console.error("User ID or link is missing.");
  }
};
const notification = async (username,userId,proimg,task) => {
  try {
    const linkObject = {
      username: username,
      userId: userId,
      proimg:proimg,
      task:task
    };

    const userRef = doc(database, "users", userId);
    const updatedData = {
      notification: arrayUnion(linkObject)
    };
    await updateDoc(userRef, updatedData);
  } catch (error) {
    console.error("err in notification:", error);
  }
};

const liked = async (username,userId,proimg,task,src) => {
  notification(username,userId,proimg,task)
  try {
    const userRef = doc(database, "users", userdata.userId);
    const updatedData = {
      likedBy: arrayUnion(src)  // Storing userId directly as an array element
    };
    await updateDoc(userRef, updatedData);
    console.log("Liked successfully");
  } catch (error) {
    console.error("Error in like:", error);
  }
  
};
const deleteLiked = async (src) => {
  try {
    const userRef = doc(database, "users", userdata.userId);
    const updatedData = {
      likedBy: arrayRemove(src)  // Removing userId directly from the array
    };
    await updateDoc(userRef, updatedData);
    console.log("User ID removed from likedBy array successfully");
  } catch (error) {
    console.error("Error in removing user ID from likedBy array:", error);
  }
  
};

  return (
      <FirebaseContext.Provider
        value={{
          signupUserWithPassEmailName,
          loginWithEmailandPass,
           loginWithFacebook,
          isLoggedIn,
          logout,
          userData,
          saved,deleteSaved,
        saveData,
        userdata,
        savedob,
        getAllUser,
        database,
        getUserData,
        user,
        search,
        setSearch,
        searchshow,setSearchshow,
        email,
        followuser,
        unfollowuser,sethello,liked,deleteLiked
        }}
      >
    {props.children}
      </FirebaseContext.Provider>
    );
  };











