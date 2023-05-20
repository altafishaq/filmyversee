import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "./firebase/Firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert";
import { AppState } from "../App";

const ReviewComponent = ({ id, prevRating, userRated }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);

  const { userName } = useContext(AppState); // Use the useContext hook outside the sendReview function

  const sendReview = async () => {
    setLoading(true);
    try {
      await addDoc(reviewsRef, {
        movieid: id,
        name: userName, // Use the userName from the context
        thought: form,
        rating: rating,
        timestamp: new Date().getTime(),
      });
      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });

      setRating(0);
      setForm("");

      swal({
        name: "Reviw Sent",
        icon: "success",
        button: false,
        timer: 3000,
      });
    } catch (error) {
      swal({
        name: error.message,
        icon: "error",
        button: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      setData([]);
      const quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewLoading(false);
    }
    getData();
  }, [loading]);

  return (
    <div>
      <div className="mt-4 w-full py-1 border-t-2 border-gray-700">
        <ReactStars
          size={30}
          half={true}
          value={rating}
          onChange={(rate) => setRating(rate)}
        />

        <input
          value={form}
          onChange={(e) => setForm(e.target.value)}
          type="text"
          placeholder="Share your thoughts"
          className="w-full p-2 outline-none bg-[#1D2C36] bg-opacity-25 "
        />
        <button onClick={sendReview} className="bg-green-600 w-full p-2 mt-2">
          {loading ? (
            <div className="flex justify-center">
              <TailSpin height={30} width={30} color="white" />
            </div>
          ) : (
            "Share"
          )}
        </button>
        {reviewLoading ? (
          <div className="mt-6 flex justify-center">
            {" "}
            <TailSpin height={30} color="white" />
          </div>
        ) : (
          <div>
            {data.map((e, i) => {
              return (
                <div className=" bg-[#1D2C36] bg-opacity-25 p-2 mt-2 w-full border-b-2 border-slate-950 " key={i}>
                  <div className="flex items-center">
                    <p className="text-blue-500">{e.name}</p>
                    <p className="ml-6 text-xs">
                      ({new Date(e.timestamp).toLocaleString()})
                    </p>
                  </div>
                  <ReactStars
                    size={15}
                    half={true}
                    value={e.rating}
                    edit={false}
                  />
                  <p>{e.thought}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
