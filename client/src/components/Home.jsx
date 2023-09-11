import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Posts from "./Post/Posts";


const Home = () => {
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  if (!localStorage.getItem("userLoginData")) {
    navigate("/register", { replace: true });
  }
  console.log(showProfile);
  return (
    <>
      <Posts />
    </>
  );
};

export default Home;
