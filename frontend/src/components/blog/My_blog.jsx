import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../header/Header';

function My_blog() {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem("jwt_token");
  const URL = "http://localhost:7000"

  useEffect(() => {
    if (!token) {
      navigate("/Login")
    } else {
      axios.get(`${URL}/my_blog/${JSON.parse(window.sessionStorage.getItem("userDetail"))._id}`, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
        setData(res.data.data[0].myBlog)
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }
  }, [])
  function deleteData(id) {
    axios.delete(`${URL}/blog/${id}`, { headers: { "Authorization": `JWT ${token}` } }).then(() => {
      axios.get(`${URL}/my_blog/${JSON.parse(window.sessionStorage.getItem("userDetail"))._id}`, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
        toast.success("Deleted successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
        setData(res.data.data[0].myBlog)
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }).catch((err) => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  const blogList = data.map((d) => {
    return <tr key={d._id}>
      <th scope="row">{d.title}</th>
      <td>{d.category}</td>
      <td>
        <Link to={"/View_blog/" + d._id}>
          <button className='btn btn-info'>View</button>
        </Link>
      </td>
      <td>
        <Link to={"/Create_blog/" + d._id}>
          <button className='btn btn-warning'>Update</button>
        </Link>
      </td>
      <td><button className='btn btn-danger' onClick={() => { deleteData(d._id) }}>Delete</button></td>
    </tr >

  })


  return (
    <>
      <Header />
      <div className='container'>
        <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4 text-center'>My Blogs</h2>
        <table className="table table-striped table-dark my-4">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">View</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className='container'>
            {
              data.length == 0 ?
                <p className='text-primary'>Nothing to show</p>
                :
                blogList
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default My_blog