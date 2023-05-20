import "./App.css";
import Cards from "./components/Cards";
import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom';
import Addmove from "./components/Addmove";
import Detail from "./components/Detail";
import { createContext, useContext, useState } from "react";
import Login from "./components/Login";
import Singup from "./components/Singup";

const AppState = createContext();



function App() {
  const [login , setlogin] = useState(false);
  const [ userName , setUserName] = useState("");

  
  return (
    <AppState.Provider value={{login, userName, setlogin, setUserName}}>
    <div className="relative">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addmovie" element={<Addmove />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
      </Routes>
      
    </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState};
