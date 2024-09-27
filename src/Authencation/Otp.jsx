import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import microsoft from '../Imgs/microsoft.png'
import playstore from '../Imgs/playstore.png'
// import auth from "./img/auth.png";
import allimg from "../Imgs/allimg.png";
import LoginLayout from "./LoginLayout";
import { useFirebase } from "../Firebase";
export default function OtpPage() {
  const navigate = useNavigate();
  // OTP ko state me store karenge
  const firebase  = useFirebase()
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
const [numtype,setnumType]= useState(false)
  const [emailtype,setemailType]= useState(false)
const numberoremail= firebase.email;
const isNumber = /^\d+$/.test(numberoremail);

// Regular expression to check if the input is a valid email
// const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(numberoremail);



  // OTP generate karne ka function
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit ka OTP generate karega aur string me convert karega
    setGeneratedOtp(otp);
    console.log("Generated OTP:", otp); // Testing ke liye OTP ko console me dikhayenge
  };

  // Page load hone par OTP generate karna
  useEffect(() => {
    if (isNumber) {
    setnumType(true);
  // } else if (isEmail) {
  //   setemailType(true);
  } else {
  //   navigate("/insta-app/login")
    setemailType(true); 
  // alert("Enter valid number or email");
  }
    generateOtp(); // Page load hone par OTP generate karega
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.saveData();

    // User OTP ko compare karna generated OTP se
    if (userOtp === generatedOtp) {
      // if(!firebase.user)
      
        // console.log("hello raj gahlot")
        // navigate("/insta-app/SignUpPage ")
        // alert("Invalid user credential");
       
    
        // alert("OTP Sahi hai! Home page par navigate ho rahe hain.");
        navigate("/insta-app");
      
      
    } else {
      setErrorMessage("Invalid OTP");
    }
  };

  // Image slider ke liye state
 

  return (
    // <>
    //   <div
    //     className="Main_container bg- w-100 h-100 d-flex align-items-center justify-content-center"
    //     style={{ height: "663.98px" }}
    //   >
    //     <div
    //       className="Second_main bg- d-flex "
    //       style={{
    //         margin: "32px 81.5px 0px",
    //         width: "936px",
    //         height: "803.984px",
    //       }}
    //     >
    //       <div className="col first w-100 bg-" style={{ position: "relative" }}>
    //         <img src={auth} className="mt-3" alt="Auth" />
    //         <div className="text-center w-100" style={{ position: "absolute", top: "0px", right: "-50px", marginTop: "-7px" }}>
    //           <img src={Moveimg} alt="Move_img" className="mt-5" />
    //         </div>
    //       </div>

    <LoginLayout>
          <div className="col Second w-100 bg-" style={{ padding: "13px 33px" }}>
            {/* Login */}
            <div
              className="Login_data bg- p-4 d-flex align-items-center justify-content-center flex-column gap-2"
              style={{
                width: "350px",
                border: "1px solid #bdbdbd",
              }}
            >
              <span style={{ backgroundRepeat: "no-repeat", backgroundPosition: "-440px -142px", height: "76px", width: "64px",backgroundImage:`url(${allimg})` }}>
                {/* <img src={allimg} alt="Insta_logo"  style={{ }}/> */}
              </span>
              <span className="w-100 text-center px-5" style={{ color: "#000", fontSize: "16px", fontWeight: "600" }}>
                Just one more step
              </span>
              <span className="d-flex flex-column text-center">
              <span className="d-flex">
                 
              {numtype && (  <span className="d-flex flex-column"> <span style={{ color: "black", fontSize: "14px" }}>Enter the 6-digit code we sent to : </span>
                  <span style={{ fontSize: "14px", color: "#0095f6" }}>{numberoremail}</span>
                  </span>)}
                {emailtype && (   <span className="d-flex flex-column"><span style={{ color: "black", fontSize: "14px" }}>Enter the 6-digit code we sent to : </span>
                  <span style={{ fontSize: "14px", color: "#0095f6" }}>{numberoremail}</span>
                  </span>)}
                </span>
                <span style={{ fontSize: "13px", color: "red" }}>{generatedOtp}</span>
              </span>

              {/* OTP input form */}
              <form onSubmit={handleSubmit} className="d-flex align-items-center flex-column justify-content-center">
                <div className="input-container">
                  <input
                    type="text"
                    name="otp"
                    autoComplete="on"
                    placeholder=" "
                    required
                    id="inputs"
                    value={userOtp}
                    onChange={(e) => setUserOtp(e.target.value)} // OTP input ko update karna
                  />
                  <label className="floating-placeholder" htmlFor="name">
                    ######
                  </label>
                </div>
                <button
                  type="submit"
                  style={{ color: "#0095f6", border: "none", background: "none", fontSize: "14px", fontWeight: "600" }}
                >
                  Verify OTP
                </button>
              </form>

              {/* Error message agar OTP galat hai */}
              {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}

              <div className="d-flex gap-2">
                <button
                  style={{ color: "#0095f6", border: "none", background: "none", fontSize: "14px", fontWeight: "600" }}
                >
                  <span>{emailtype && ("Change Email")} {numtype && ("Change Number")}</span>
                </button>
                |
                <button
                  onClick={generateOtp}  // Yahan OTP dubara generate hoga
                  style={{ color: "#0095f6", border: "none", background: "none", fontSize: "14px", fontWeight: "600" }}
                >
                  <span>Request new code</span>
                </button>
              </div>
            </div>

            <div
              style={{
                width: "350px",
                height: "63px",
                border: "1px solid #bdbdbd",
                fontSize: "14px",
              }}
              className="mt-2 d-flex align-items-center justify-content-center"
            >
              <span>Don't have a account? </span>
              <button
                className="fw-bold ms-1"
                style={{ border: "none", color: "#0095f6", background: "none" }}
                onClick={() => navigate("/insta-app")}
              >
                Log in
              </button>
            </div>

            <div className="d-flex mt-3 align-items-center justify-content-center" style={{ width: "350px" }}>
              <span style={{ color: "#000000", fontSize: "14px" }}>Get the app.</span>
            </div>

            <div className="Play_store_logo d-flex justify-content-center gap-2 mt-3" style={{ width: "350px", height: "44px" }}>
              <img src={playstore} alt="playstore_img" />
              <img src={microsoft} alt="microsoft_img" />
            </div>
          </div>
          </LoginLayout>
    //     </div>

//   </div>

    //   {/* Footer */}
    //   <div className="w-100 mt-5 d-flex flex-column align-items-center justify-content-center flex-column">
    //     <div
    //       className="fotter_data d-flex align-items-center gap-4 justify-content-center"
    //       style={{ maxWidth: "1066px", flexWrap: "wrap" }}
    //     >
    //       <a style={{ color: "#737373", fontSize: "12px" }}>Meta</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>About</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>Blog</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>Jobs</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>Help</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>API</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>Privacy</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>Terms</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>Top Accounts</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>Hashtags</a>
    //       <a style={{ color: "#737373", fontSize: "12px" }}>Locations</a>
    //     </div>

    //     <div className="d-flex align-items-center justify-content-center mt-3">
    //       <span style={{ color: "#737373", fontSize: "12px" }}>© 2024 Instagram from Meta</span>
    //     </div>
    //   </div>
    // </>
  );
}
