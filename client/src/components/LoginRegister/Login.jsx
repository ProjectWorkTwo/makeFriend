import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../styles/Button";
import Form from "../styles/Form";
import LoginText from "./LoginText";
import FormMainWrapper from "../styles/FormMainWrapper";

let userData = {};

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const handleChangeEvent = (e) => {
    setLoginData((prev) => ({
      ...loginData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    userData = loginData;
    console.log(userData);

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
      }),
    });

    let data = await res.json();

    if (res.status === 500 || !data) {
      window.alert("Invalid registration");
    } else {
      window.alert("registration was successful");
      navigate("/", { replace: true });
    }
  };

  return (
    <FormMainWrapper>
      <div className="container">
        <LoginText />
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
            <Link to="/register">
              <p>If yet not registered?</p>
            </Link>
          </form>
        </Form>
      </div>
    </FormMainWrapper>
  );
};

export default Login;
