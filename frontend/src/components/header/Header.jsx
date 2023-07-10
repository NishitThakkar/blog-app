import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Screenshot from '../../assests/logo_ps-removebg-preview.png';
import '../../css/style.css';

function Header() {
    const token = window.sessionStorage.getItem("jwt_token");
    const user = JSON.parse(window.sessionStorage.getItem("userDetail"));
    function Logout() {
        window.sessionStorage.clear()
        toast.success("Logout successfully", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark sticky-top">

            <div className="container">
                <Link className="navbar-brand text-light px-2" to={"/"}>
                    <img src={Screenshot} alt="" className='header_img' />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse float-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 px-5">

                        {
                            user && <>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" aria-current="page" to={"/Create_blog"}>Create</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link text-light" to={"/"}>List</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link text-light" to={"/My_blog"}>My blog</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link text-light" to={"/Login"} onClick={Logout}>Logout</Link>
                                </li>
                            </>


                        }
                        {!user &&

                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to={"/"}>List</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link text-light" to={"/Login"}>Login</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link text-light" to={"/Signup"}>Signup</Link>
                                </li>
                            </>
                        }

                    </ul>
                    {
                        user && <span className='text-white'>Hello {user.name}</span>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Header