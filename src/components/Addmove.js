import React, { useState } from "react";
import {TailSpin} from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "./firebase/Firebase";
import swal from 'sweetalert';


const Addmove = () => {
  const [form, setForm] = useState({
    name: "",
    year: "",
    description: "",
    image:"",
    rated:0,
    rating:0
  });

  const [loading , setloading] = useState(false);

  const addMovie = async ()=>{
    try{
    setloading(true);
    await addDoc(moviesRef,form);
    swal({
      name:"Successfully Added",
      icon:"success",
      buttons:false,
      timer:3000

    })
    setForm({
      name: "",
      year: "",
      description: "",
      image:""
    })
    
  }catch(err){
    swal({
      name:err,
      icon:"error",
      buttons:false,
      timer:3000

    })
  }
  setloading(false);
  }


  return (
    <div>
      {/* we copy from tailblock.cc STARTS here */}
      <section class=" body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-white">
              Add Move
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label
                    for="name"
                    class="leading-7 text-sm text-white font-medium"
                  >
                    Movie Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name} 
                    onChange={(e)=>setForm({...form,name: e.target.value})}
                    class="w-full  bg-[#1D2C36] bg-opacity-25  rounded border-b-4 border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label
                    for="email"
                    class="leading-7 text-sm text-white font-medium"
                  >
                    Year
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.year} 
                    onChange={(e)=>setForm({...form,year: e.target.value})}
                    class="w-full  bg-[#1D2C36] bg-opacity-25  rounded border-b-4 border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label
                    for="message"
                    class="leading-7 text-sm text-white font-medium"
                  >
                    Image Link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.image} 
                    onChange={(e)=>setForm({...form,image: e.target.value})}
                    class="w-full  bg-[#1D2C36] bg-opacity-25  rounded border-b-4 border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label
                    for="message"
                    class="leading-7 text-sm text-white font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description} 
                    onChange={(e)=>setForm({...form,description: e.target.value})}
                    class="w-full  bg-[#1D2C36] bg-opacity-25  rounded border-b-4 border-slate-950 focus:bg-slate-950 focus:ring-2 focus:ring-slate-800 h-32 text-base outline-none text-gray-400 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>

                <div class="p-2 w-full">
                <button onClick={addMovie} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white"  />  :'Save' }
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* we copy from tailblock.cc Ends here */}
    </div>
  );
};

export default Addmove;
