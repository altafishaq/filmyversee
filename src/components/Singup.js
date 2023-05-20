import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {getAuth ,RecaptchaVerifier ,signInWithPhoneNumber } from 'firebase/auth'
import app from "./firebase/Firebase";
import swal from 'sweetalert';
import { addDoc } from "firebase/firestore";
import { usersRef } from "./firebase/Firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';



const auth = getAuth(app);

const Singup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name:"",
    mobile:"",
    password:""
  });
  const [otpSent , setOtpSent] = useState(false);
  const [ OTP , setOTP] = useState("");

  const generateRecaptha = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container' ,{
      'size':'invisible',
      'callback' : (response)=>{

      }
    },auth);
  }

const requestOtp =()=>{
  setLoading(true);
  generateRecaptha();
  let appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth,`+92${form.mobile}`,appVerifier)
  .then(confirmationResult =>{
    window.confirmationResult = confirmationResult;
    swal({
      text:"OTP Sent",
      icon:"success",
      button:false,
      timer:3000,
    });
    setOtpSent(true);
    setLoading(false);
  }).catch((error)=>{
    console.log(error)
  })
}

const verifyOTP = () => {
  try {
    setLoading(true);
    window.confirmationResult.confirm(OTP).then((result) => {
      swal({
        text: "Successfully Registered",
        icon: "success",
        button: false,
        timer: 3000,
      });
      uploadData(); // Call uploadData function to save user data in the database
      navigate('/login');
      setLoading(false);
    });
  } catch (error) {
    console.log(error);
  }
};

const uploadData = async()=>{
  try{
  const salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(form.password , salt);
  await addDoc(usersRef, {
    name:form.name,
    password:hash,
    mobile:form.mobile
  });
}catch(error){
console.log(error);
}
}



  return (
    <div className="w-full flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold flex justify-center ">Singup</h1>
     {
      otpSent ? 
      <>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label
            htmlFor="message"
            class="leading-7 text-sm text-gray-300 font-medium"
          >
           OTP
          </label>
          <input
            
            id="message"
            name="message"
            placeholder="OTP Code here"
            value={OTP}
            onChange={(e)=>setOTP(e.target.value)}
            class="w-full bg-[#1D2C36] bg-opacity-25  rounded border-b-4 border-slate-950 focus:border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full">
        <button onClick={verifyOTP} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">
          {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
        </button>
      </div>
      </>

      :

      <>
      

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label
            for="message"
            class="leading-7 text-sm text-gray-300 font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Name"
            value={form.name}
            onChange={(e)=>setForm({...form, name:e.target.value})}
            class="w-full bg-[#1D2C36] bg-opacity-25  rounded border-b-4 border-slate-950 focus:border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label
            for="message"
            class="leading-7 text-sm text-gray-300 font-medium"
          >
           Mobile No.
          </label>
          <input
            type={"number"}
            id="message"
            name="message"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e)=>setForm({...form, mobile:e.target.value})}
            class="w-full bg-[#1D2C36] bg-opacity-25  rounded border-b-4 border-slate-950 focus:border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>


      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label
            for="message"
            class="leading-7 text-sm text-gray-300 font-medium"
          >
            Password
          </label>
          <input
             type="password"
            id="message"
            name="message"
            placeholder="Password"
            value={form.password}
            onChange={(e)=>setForm({...form, password:e.target.value})}
            class="w-full bg-[#1D2C36] bg-opacity-25  rounded border-b-4 border-slate-950 focus:border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full">
        <button onClick={requestOtp} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">
          {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
        </button>
      </div>
      </>
}
      <div>
       <Link to={"/login"}> <p>Already have an Account? <span className="text-blue-500">Login</span> </p></Link>
      </div>
      <div id="recaptcha-container">

      </div>
    </div>
  );
};

export default Singup;
