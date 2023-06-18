import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Singup = (props) => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "", name: "" });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);


    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      
      props.showAlert("Account alrady exist", "danger");
    }
  };

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });

  }
  return (
    <div>
       <h1>Create an account to use Inotoodo</h1>
      <form onSubmit={handleSubmit}>

        <div className="mb-3" >
          <label htmlFor="name" className="form-label">User Name</label>
          <input required type="text" className="form-control" value={credentials.name} onChange={onchange} id="name" name='name' placeholder='Enter Name' />
          <label htmlFor="email" className="form-label">Email address</label>
          <input required type="email" className="form-control" value={credentials.email} onChange={onchange} id="email" name='email' aria-describedby="emailHelp" placeholder='email@gmail.com' />

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input required type="password" placeholder='Password at-least 5 charactors ' name='password' className="form-control" onChange={onchange} id="password" value={credentials.password} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Conform Password</label>
          <input required type="password" placeholder='Enter conform Password' name='conformpassword' className="form-control" onChange={onchange} id="conformpassword" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Singup;