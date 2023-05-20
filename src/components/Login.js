import React, { useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "./firebase/Firebase";
import bcrypt from 'bcryptjs';
import { AppState } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const { setlogin ,setUserName } = useContext(AppState);
  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    mobile: "",
    password: ""
  });

  const loginn = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach(doc => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          setlogin(true); 
          setUserName(_data.name);
         
         
          swal({
            text: "Successfully Login",
            icon: "success",
            button: false,
            timer: 3000,
          });
          navigate('/');
        } else {
          swal({
            text: 'Invalid Data',
            icon: "error",
            button: false,
            timer: 3000,
          });
        }
      });
    } catch (error) {
      swal({
        text: error.message,
        icon: "error",
        button: false,
        timer: 3000,
      });
    }
    setLoading(false);
  }

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold flex justify-center ">Login</h1>

      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-300 font-medium">
            Mobile No.
          </label>
          <input
            id="message"
            name="message"
            placeholder="Mobile Number"
            type={"number"}
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full bg-[#1D2C36] bg-opacity-25 rounded border-b-4 border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-300 font-medium">
            Password
          </label>
          <input
            id="message"
            name="message"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-[#1D2C36] bg-opacity-25 rounded border-b-4 border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          disabled={loading}
          onClick={loginn}
          className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
        >
          {loading ? (
            <TailSpin className="mr-2 animate-spin" color="#FFF" width={20} height={20} />
          ) : (
            "Login"
          )}
        </button>
      </div>

      <div className="flex justify-center mt-4 text-white">
        Don't have an account?{" "}
        <Link to="/singup" className="ml-1 text-blue-500 font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
