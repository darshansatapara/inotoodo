import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
  
    
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            props.showAlert("Logged in successfully", "success");
            navigate("/");
          } else {
            props.showAlert("Invalid credentials", "danger");
            
          }
  };

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3" >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onchange} id="email" name='email' aria-describedby="emailHelp" placeholder='email@gmail.com' />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" placeholder='Password at-least 5 charactors ' name='password' className="form-control" onChange={onchange} id="password" value={credentials.password} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login