import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../header/Header'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const URL = "http://localhost:7000"

  function submitData() {
    const data = { email, password }

    axios.post(`${URL}/login`, data).then((res) => {
      if (res.data.data) {
        toast.success("Welcome back " + res.data.data.name + "!", {
          position: toast.POSITION.TOP_RIGHT
        });
        window.sessionStorage.setItem("jwt_token", res.data.jwt_token);
        window.sessionStorage.setItem("userDetail", JSON.stringify(res.data.data));
        navigate("/")
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }).catch((err) => {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  return (

    <div>
      <Header />
      <form className='container'>
        <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4 text-center'>Login</h2>
        <div className="mb-3 mt-5" >

          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <br />

          <label htmlFor="password" className="form-label">Password</label>
          <input type="text" className="form-control" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <br />
        </div>

        <button type="button" className="btn btn-primary mb-3" onClick={submitData}>
          Login
        </button>
      </form>
    </div >
  )
}

export default Login