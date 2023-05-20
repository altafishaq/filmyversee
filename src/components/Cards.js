import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TailSpin  } from "react-loader-spinner";
import ReactStars from "react-stars";
import { moviesRef } from "./firebase/Firebase";
import { Link } from 'react-router-dom';


const Cards = () => {
  const [data, setData] = useState([]);
  const [loading , setloading] = useState(false);

  useEffect(()=>{
    async function getData(){
    setloading(true);
    const _data = await getDocs(moviesRef);
    // console.log(_data);

    // _data.forEach((doc)=>{
    //   setData((...prev)=>[...prev,doc.data()])
    // });


    _data.forEach((doc) => {
      setData((prev) => [...prev, {...(doc.data()), id: doc.id}]);
    });


    setloading(false);
    }
    getData();
  },[])

  return (
    <div className="flex flex-wrap  justify-center  space-x-5 p-2 mt-4 ">

    {loading ? <div className=" w-full flex justify-center items-center h-96  "><TailSpin height={60} color="white"  /></div>  :

      data.map((e, i) => {
        return (
         <Link to={`/detail/${e.id}`}> <div key={i}>
            <div className="bg-gray-800  rounded-md  font-medium p-2 pl-4  hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500  ">
              <img className=" h-60 md:h-74    rounded-md" src={e.image} alt="" />
              <h1>
                <span className="text-slate-500 ">Name:</span> {e.name} 
              </h1>
              <h1 className="flex items-center ">
                <span className="text-slate-500 mr-2 ">Rating:</span>
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating/e.rated}
                  edit={false}
                />
              </h1>
              <h1>
                <span className="text-slate-500 ">Year:</span> {e.year}
              </h1>
            </div>
          </div>
          </Link>
        );
      })
    }

    </div>
  );
};

export default Cards;
