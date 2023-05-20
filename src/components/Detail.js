import React, { useEffect, useState } from 'react'
import ReactStars from "react-stars";
import { useParams } from 'react-router-dom';
import { moviesRef } from './firebase/Firebase';
import { doc } from 'firebase/firestore';
import { db } from './firebase/Firebase';
import { getDoc } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import Review from './Review';



const Detail = () => {
    const {id} = useParams();
    const [data, setData] = useState({
        name:"",
        year:"",
        image:"",
        description:"",
        rating:0,
        rated:0

    })
    
    const [loading , setloading] = useState(false);

    useEffect(()=>{
        async function getData(){
            setloading  (true);
          const _doc = doc(db, "movies" , id);
         const _data = await getDoc(_doc);
         setData(_data.data());
         setloading  (false);
        }
        getData();
    },[])


  return (
    
       <div className=' md:pl-16 w-full mt-8 flex flex-col md:flex-row '>
        
        {
            loading ? <div className=' h-96 w-full flex justify-center items-center'> <TailSpin  height={35} color='white' /></div> :
            <>
         <img className='h-[400px] w-78 rounded-md px-4 block md:sticky top-24' src={data.image} alt="" />
         <div className='md:ml-8 md:w-1/2 px-4 mt-4 '>
            <h1 className='text-3xl font-bold text-gray-300' >{data.name} <span className='text-lg'>({data.year})</span></h1>
            <ReactStars
                  size={20}
                  half={true}
                  value={data.rating/data.rated}
                  edit={false}
                />
            <p className='mt-4 text-gray-400 '>{data.description}</p>
            <Review id={id} prevRating = {data.rating} userRated={data.rated} />

         </div>
         </>
        }
       </div>
    
  ) 
}

export default Detail
