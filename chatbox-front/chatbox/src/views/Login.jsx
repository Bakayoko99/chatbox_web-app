
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/loginStyle.css';

const Login = () => {

    let history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const logUser = async () => {

        const response = await axios.post('http://localhost:8010/users/login', { email, password })

        console.log("login response :", response);

        if (response.status === 200) {

            console.log("response.status :", response.status);

            localStorage.setItem("chatbox-user", response.data.userID)

            history.push('/home')

        } else {
            alert("user not login")
        }
    }

    console.log(email);
    return (
        <div className="container" id="logBorder">
            <label className="form-label">Email</label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="username@example.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <label className="form-label">Password</label>
            <div className="input-group mb-3">
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="button" className="btn btn-success" onClick={logUser} >Login</button>
        </div>
    );
}

export default Login;
