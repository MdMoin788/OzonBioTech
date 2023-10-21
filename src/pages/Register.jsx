

import React, { useState } from "react";
import ReactFileBase64 from 'react-file-base64'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/home/Button";
import { Input } from "../components/Input";
import { registerFormData } from "../constants/data";
import { registerUser } from "../store/actions/userActions";
import "../styles/register.less";
export const Register = () => {
  const [registerData, setRegisterData] = useState(registerFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user} = useSelector((state)=> state.user)
  useEffect(() => {
    if (user?.name) {
      navigate('/')
    }
    return () => {
      
    }
  }, [navigate,user])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let data = [];
    if (name === 'avatar') {
      // data = data.map(field => field.)
    }
    data = registerData.map((item) =>
      item.name === name ? { ...item, value: value } : item
    );
    setRegisterData(data);
  };

  const handleRegister = (option) => {
    if (option === 'login') {
      navigate("/login");
      return
    }
    dispatch(registerUser({name: registerData[0].value, email: registerData[1].value, password: registerData[2].value}));
  };
  return (
    <div className="register">
      <h3>Register Form</h3>
      <div className="form-container">
        {registerData.map((inputOption) => (
          <Input
            option={inputOption}
            key={inputOption.name}
            handleChanage={handleChange}
          />
        ))}
        <ReactFileBase64
          multiple={false}
          onDone={ handleChange }
        />
        <Button
          title={"Register"}
          handleClick={() => handleRegister("register")}
          className={"register-btn"}
        />
        <div className="forgot-login-account-container">
          <p>Already Have an Account</p>
          <Button
            title={"Login"}
            handleClick={() => handleRegister("login")}
            className={"login-btn"}
          />
        </div>
      </div>
    </div>
  );
};
