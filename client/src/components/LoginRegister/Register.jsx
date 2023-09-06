import React, { useState } from "react";

import FormMainWrapper from "../styles/FormMainWrapper";
import Button from "../styles/Button";
import Form from "../styles/Form";


import { Link, useNavigate } from "react-router-dom";
import LoginText from "./LoginText";
import ErrorMessage from "../ErrorMessage";

let userData = {};

const Register = () => {
  const navigate = useNavigate();
  const [userNameToggle, setUserNameToggle] = useState(false);
  const [userEmailToggle, setUserEmailToggle] = useState(false);
  const [registerData, setRegisterData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    dob: "",
    gender: "custom",
  });

  const handleChangeEvent = (e) => {
    setRegisterData((prev) => ({
      ...registerData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    userData = registerData;

    const formData = new FormData();
    formData.append("userFormData", userData);
    // console.log();

    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
      }),
    });

    let data = await res.json();

    if (res.status === 422 || !data) {
      console.log(data.userNameExist, data.emailExist);
      if(data.userNameExist){
        setUserNameToggle(prev => true);
      }else{
        setUserNameToggle(prev => false);
      }

      if(data.emailExist){
        setUserEmailToggle(prev => true);
      }else{
        setUserEmailToggle(prev => false);
      }


    } else {

      window.alert("registration was successful");
      navigate("/login", { replace: true });
    }
  };

  return (
    <FormMainWrapper>
      <div className="container">
        <LoginText />
        <Form>
          <h1>Create An Account</h1>
          <form onSubmit={handleSubmitEvent} method="POST">
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              name="fullName"
              onChange={handleChangeEvent}
              value={registerData.fullName}
              required
            />
            <input
              type="text"
              id="userName"
              placeholder="Username"
              name="userName"
              onChange={handleChangeEvent}
              value={registerData.userName}
              required
            />
            <input
              type="tel"
              id="password"
              placeholder="Email Address"
              name="email"
              onChange={handleChangeEvent}
              value={registerData.email}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleChangeEvent}
              value={registerData.password}
              required
            />
            <div className="dobGender">
              <div className="inputWrapper">
                <label htmlFor="dob">Birth Date: </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  onChange={handleChangeEvent}
                  value={registerData.dob}
                  required
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="gender">Gender: </label>
                <select
                  name="gender"
                  id="gender"
                  onChange={handleChangeEvent}
                  value={registerData.gender}
                  required
                >
                  <option value="custom">Custom</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <Button type="submit">Register</Button>
            {userNameToggle && <ErrorMessage message="username already exist" />}
            {userEmailToggle && <ErrorMessage message="email addreess already exist" />}
            <Link to="/login">
              <p>If yet not registered?</p>
            </Link>
          </form>
        </Form>
      </div>
    </FormMainWrapper>
  );
};

export default Register;
