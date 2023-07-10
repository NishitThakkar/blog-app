import axios from 'axios'
import React, { useState } from 'react'
import Header from '../header/Header'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const URL = "http://localhost:7000"

  function submitData() {
    const data = { name, email, password }
    axios.post(`${URL}/signup`, data).then((res) => {
      toast.success("Account created successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
      setName("")
      setEmail("")
      setPassword("")
      navigate("/Login")
    }).catch((err) => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  return (
    <>
      <Header />

      <div className='container'>
        <form>
          <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4 text-center'>Signup</h2>

          <div className='mb-3 mt-5'>

            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
            <br />

            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <br />

            <label htmlFor="password" className="form-label">Password</label>
            <input type="text" className="form-control" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <br />

          </div>

          <button type="button" className="btn btn-primary mb-3" onClick={submitData}>
            submit
          </button>
        </form>
      </div >
    </>
  )
}

export default Signup