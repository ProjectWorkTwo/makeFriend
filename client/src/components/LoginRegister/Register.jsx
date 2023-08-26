import React, { useState } from "react";
import Button from "../styles/Button";
import Form from "../styles/Form";

let userData = {};

const Register = ({setFormSelector}) => {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    dob: "",
    gender: "male",
    registerType: "singup"
  });

  const handleChangeEvent = (e) => {
    setRegisterData((prev) => ({
      ...registerData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    userData = registerData;
    // console.log(userData);
  };

  const changeForm = ()=>{
    setFormSelector(prev => !prev);
  }

  return (
    <Form>
      <h1>Create An Account</h1>
      <form onSubmit={handleSubmitEvent}>
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
        <Button type="submit">Register</Button>
        <p onClick={changeForm}>If yet not registered?</p>
      </form>
    </Form>
  );
};

export default Register;