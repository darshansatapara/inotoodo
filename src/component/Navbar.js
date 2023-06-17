// import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  //for the see path name
  // useEffect(()=>{
  //   console.log(location.pathname)
  // },[location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Your Note</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} >about</Link>
              </li>
            </ul>
            <form className="d-flex">
              <Link to="/login" className="btn btn-primary mx-2 " role="button" aria-disabled="true">login</Link>
              <Link to="signup" className="btn btn-primary mx-2 " role="button" aria-disabled="true">Sing Up</Link>
            </form>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar