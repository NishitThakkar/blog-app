import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Header from '../header/Header';

function List_blog() {
  const URL = "http://localhost:7000"
  const [data, setData] = useState([])
  const token = window.sessionStorage.getItem("jwt_token");

  useEffect(() => {
    axios.get(`${URL}/blog`, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
      setData(res.data.data)
    }).catch((err) => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT
      });
    })

  }, [])

  async function searchData(e) {
    axios.post(`${URL}/blog/searchData`, { search: e.target.value }, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
      setData(res.data.data)
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
      <td>{d.creator}</td>
      <td>
        <Link to={"/View_blog/" + d._id}>
          <button className='btn btn-primary'>View In Detail</button>
        </Link>
      </td>
    </tr >

  })

  return (
    <>
      <Header />
      <div className='container'>
        <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4'>List Of Blogs</h2>
        <span>
          <div className="row height d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="form">
                <i className="fa fa-search"></i>
                <input type="text" className="form-control form-input" placeholder="Search by title or category..." onChange={searchData} />
                <span className="left-pan"><i className="fa fa-microphone"></i></span>
              </div>
            </div>
          </div>
        </span>
        <table className="table table-striped table-dark my-4">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Creator</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ?
                blogList :
                <span>
                  There are no record to show
                </span>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default List_blog
