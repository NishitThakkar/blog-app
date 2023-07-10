import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Header from '../header/Header';

function Create_blog() {

  const URL = "http://localhost:7000"
  const { id } = useParams();
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem("jwt_token");

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (!token) {
      navigate("/Login")
    }
    if (id) {
      axios.get(`${URL}/blog/${id}`, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
        setTitle(res.data.data[0].title)
        setCategory(res.data.data[0].category)
        setDescription(res.data.data[0].description)
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }
  }, [])

  function submitData() {

    const data = { title, category, description, userId: JSON.parse(window.sessionStorage.getItem("userDetail"))._id, creator: JSON.parse(window.sessionStorage.getItem("userDetail")).name }

    if (id) {
      axios.put(`${URL}/blog/${id}`, data, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
        toast.success("Blog updated successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
      navigate("/My_blog")
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    } else {
      axios.post(`${URL}/create_blog`, data, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {

        toast.success("Blog created successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
        setTitle("")
        setCategory("")
        setDescription("")
      }).catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }
  }

  return (
    <>
      <Header />

      <div className='container'>
        <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4 text-center'>Create Blog Here</h2>

        <form>
          <div className="mb-3 mt-5" >
            <input type="text" className="form-control" placeholder='Title' id="title" name='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <br />

            <select class="form-select" aria-label="Default select example" name='Category' value={category} onChange={(e) => { setCategory(e.target.value) }} >
              <option selected >Select a category</option>
              <option value="Food" >Food</option>
              <option value="Travel" >Travel</option>
              <option value="Health and fitness" >Health and fitness</option>
              <option value="Sports" >Sports</option>
              <option value="Lifestyle" >Lifestyle</option>
              <option value="Fashion and beauty" >Fashion and beauty</option>
              <option value="Photography" >Photography</option>
              <option value="Personal" >Personal</option>
            </select> <br />
            <textarea style={{ height: 200 }} type="text" className="form-control" placeholder='Description' id="description" name='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} />

          </div>

          <button type="button" className="btn btn-primary mb-3" onClick={submitData}>
            {id ? "update" : "submit"}
          </button>
        </form>

      </div>

    </>
  )
}

export default Create_blog