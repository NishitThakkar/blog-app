import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../header/Header'

function View_blog() {
  let { id } = useParams()
  const [data, setData] = useState([])
  const [commentsList, setCommentsList] = useState([])
  const [comment, setComment] = useState("")
  const URL = "http://localhost:7000"
  const token = window.sessionStorage.getItem("jwt_token");
  const user = JSON.parse(window.sessionStorage.getItem("userDetail"));

  useEffect(() => {
    if (id) {
      axios.get(`${URL}/blog/` + id, { headers: { "Authorization": `JWT ${window.sessionStorage.getItem("jwt_token")}` } }).then((res) => {
        setData(res.data.data[0])
        setCommentsList(res.data.data[0].commentList)
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }

  }, [])


  function submitData() {

    const data = {
      blogId: id, comment, commentBy: user.name
    }

    axios.post(`${URL}/blog/comment`, data, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
      axios.get(`${URL}/blog/` + id, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
        setCommentsList(res.data.data[0].commentList)
        toast.success("Comment added successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
        setComment("")
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }).catch((err) => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  const commentList = commentsList.map((d) => {
    return <ul key={d._id} class="list-group">
      <li class="list-group-item mb-2">
        ➡️ {d.comment} <br />
        <span className='fw-bold'> by : </span>{d.commentBy}
      </li>
    </ul >

  })

  function cantComment() {
    setComment("")
    toast.error("You need to login for comment", {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  return (
    <>
      <Header />


      <div class=" container mt-4 text-start ">
        <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4 text-center'>View blog</h2>
        <div className=' text-start'>
          <div class="list-group">
            <p class="list-group-item list-group-item-action active cursor-none enable-button-pointers:false" aria-current="true">
              <div class="d-flex w-100 justify-content-between ">
                <h4 class="mb-1"> <span className='fw-bold'> Title </span> {data.title}</h4>
                <small> <span className='fw-bold'>Creator </span> {data.creator}</small>
              </div>
              <p class="mb-1"><span className='fw-bold py-2'> Category  </span> {data.category}</p>
              <small>{data.description}</small>
            </p>
          </div>

          <div className='my-4'>
            <label htmlFor="comment" className="form-label">Add a comment</label>
            <input type="text" className="form-control" id="comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />

            {
              user ?
                <button type="button" className="btn btn-primary mt-4" onClick={submitData}>
                  submit
                </button> :
                <button type="button" className="btn btn-primary mt-4" onClick={cantComment}>
                  submit
                </button>
            }


          </div>

          <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4 text-center'>Comments</h2>

          {
            commentList.length > 0 ?
              commentList
              :
              <p className='text-center mb-2'>
                No comments
              </p>
          }


        </div>
      </div>
    </>
  )
}

export default View_blog