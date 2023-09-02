import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./styles/Button";
import Posts from "./Post/Posts";

const Home = () => {
  // const navigate = useNavigate();
  // const varifyLogin = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await res.json();

  //     if (res.status !== 200) {
  //       throw new Error(res.error);
  //     }
  //   } catch (error) {
  //     console.log('Something went wrong');
  //     navigate("/login", { replace: true });
  //   }
  // };
  // useEffect(() => {
  //   varifyLogin();
  // }, []);
  
  return (
    <>
      <Posts/>
    </>
  );
};

export default Home;
