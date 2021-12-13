
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../styles/signupStyle.css"

const Signup = () => {

    let hystory = useHistory()

    const [email, setEmail] = useState("");
    const [telNumber, setTelNumber] = useState(0);
    const [lastName, setLastname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [userState, setUserState] = useState("");

    const [password, setPassword] = useState("");
    const [confPsw, setConfPsw] = useState("");
    const [dateOfB, setDateOB] = useState("");


    const signupPost = async (req, res) => {

        if (password === confPsw) {

            const userData = {

                firstName,
                lastName,
                birthday: dateOfB,
                state: userState,
                telNumber,
                email,
                password,
                confPsw

            }

            console.log("userdata", userData);

            const userDataArray = Object.values(userData)

            const userDataArrayIndex = userDataArray.indexOf("")

            const userdataKeys = Object.keys(userData)

            const inputUnfilled = userdataKeys[userDataArrayIndex]

            for (let i = 0; i <= userDataArray.length; i++) {

                if (userDataArray[i] === "") {

                    return alert(`${inputUnfilled} unfilled`)

                }
            }

            console.log("userDataValues :", userDataArray);
            console.log("inputUnfilled :", inputUnfilled);

            const response = await axios.post("http://localhost:8010/users/addUser", userData)

            if (response.status !== 200) {
                alert("signup failed")
            } else if (response.status === 200) {

                alert('User created, you can connect now !')
                hystory.push('/login')

            }

            console.log("response :", response);

        } else {
            alert("password incorrect")
        }
        console.log(email, dateOfB);
    }


    return (
        <div>
            <div className="container" id="signBorder">
                <h1 className="text-center">Signup</h1>
                <div className="mb-2">
                    <input className="form-control" onChange={(e => setFirstName(e.target.value))} type="text" placeholder="FirstName" />
                </div>
                <div className="mb-2">
                    <input className="form-control" onChange={(e => setLastname(e.target.value))} type="text" placeholder="Lastname" />
                </div>
                <div className="mb-2">
                    <input className="form-control" onChange={(e => setUserState(e.target.value))} type="text" placeholder="State" />
                </div>
                <div className="mb-2">
                    <input className="form-control" onChange={(e => setEmail(e.target.value))} type="email" placeholder="Email" />
                </div>
                <div className="mb-2">
                    <input className="form-control" onChange={(e => setTelNumber(e.target.value))} type="number" placeholder="Tel.Number" />
                </div>
                <div className="mb-2">
                    <input className="form-control" onChange={(e => setPassword(e.target.value))} type="password" placeholder="Password" />
                    <p>* password lenght up to 8 character</p>
                </div>
                <div className="mb-2">
                    <input className="form-control" onChange={(e => setConfPsw(e.target.value))} type="password" placeholder="Confirm password" />
                </div>
                <div className="mb-2">
                    <label className="form-label">Date of birth</label>
                    <input className="form-control" onChange={(e => setDateOB(e.target.value))} type="date" placeholder="Date of birth" />
                </div>
                <button type="button" className="btn btn-primary mt-2" onClick={signupPost}>Submit</button>
            </div>
        </div>
    );
}

export default Signup;
