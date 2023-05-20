// Header.js
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppState } from "../App";

const Header = () => {
  const { login } = useContext(AppState);

  return (
    <div className="sticky z-10 bg-slate-900 top-0 text-3xl border-b-2 shadow-sm border-gray-800 p-3 flex justify-between items-center">
      <Link to={"/"}>
        {" "}
        <span className="text-red-500 font-bold">
          Filmy
          <span className="font-bold text-white">Verse</span>
        </span>
      </Link>

      {login ? (
        <Link to={"/addmovie"}>
          <h1 className="text-lg font-medium flex items-center cursor-pointer">
            <Button>
              <AddIcon className="mr-1" color="secondary" />
              <span className="text-white">Add New</span>
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to={"/login"}>
          <h1 className="text-lg font-medium bg-green-500 flex items-center rounded cursor-pointer">
            <Button>
              <span className="text-white font-medium">Login</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
