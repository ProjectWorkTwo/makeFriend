import React, { useState } from "react";

import Button from "../styles/Button";
import Form from "../styles/Form";

let userData = {};

const Login = ({setFormSelector}) => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
    registerType: "login"
  });

  const handleChangeEvent = (e) => {
    setLoginData((prev) => ({
      ...loginData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    userData = loginData;
    console.log(userData);
  };

  const changeForm = ()=>{
    setFormSelector(prev => !prev);
  }

  return (
    <Form>
      <h1>Login Your Account</h1>
      <form onSubmit={handleSubmitEvent}>
        <input
          type="text"
          id="userName"
          placeholder="Username"
          name="userName"
          onChange={handleChangeEvent}
          value={loginData.userName}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          onChange={handleChangeEvent}
          value={loginData.password}
          required
        />
        <Button type="submit">Login</Button>
        <p onClick={changeForm}>If yet not registered?</p>
      </form>
    </Form>
  );
};

export default Login;
