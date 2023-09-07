import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Posts from "./Post/Posts";

const Home = () => {
  const navigate = useNavigate();
  if(!localStorage.getItem('userLoginData')){
    navigate("/register", { replace: true });
  }
  
  return (
    <>
      <Posts/>
    </>
  );
};

export default Home;
