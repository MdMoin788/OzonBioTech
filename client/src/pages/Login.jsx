
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/home/Button'
import { Input } from '../components/Input'
import { loginFormData } from '../constants/data'
import { loginUser } from '../store/actions/userActions'
import '../styles/login/login.less'
export const Login = () => {
  const [loginData, setLoginData] = useState(loginFormData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  
  useEffect(() => {
    if (user?.name) {
      navigate('/')
    }
    return () => {
      
    }
  }, [navigate, user])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = loginData.map((item) => item.name === name ? { ...item, value: value } : item)
    setLoginData(data)
  }

  const handleLogin = (option) => {
    if (option === 'register') {
      navigate('/register')
      return
    }
    else if (option === 'forgot') {
      navigate('/forgot')
      return
    }
    dispatch(loginUser({email: loginData[0]?.value, password: loginData[1].value}))
  }
  return (
    <div className="login">
      <h3>Login Form</h3>
      <div className="form-container">
        {loginData.map((inputOption) => (
          <Input
            option={inputOption}
            key={inputOption.name}
            handleChanage={handleChange}
          />
        ))}
        <Button title={"Login"} handleClick={()=> handleLogin('login')} className={ 'login-btn' } />
        <div className="forgot-create-account-container">
          <Button title={"Forgot Password"} handleClick={() => handleLogin('forgot')} className={ 'forgot-btn'} />
          <Button title={'Create an Acount'} handleClick={() => handleLogin('register')} className={ 'signup-btn'} />
        </div>
      </div>
    </div>
  );
}
