import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Messages from '../components/Messages';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const Chat = () => {

    const [message, setMessage] = useState("");
    const [channel, setChannel] = useState({});

    // console.log("message : ",message);

    useEffect(async () => {

        const channelID = localStorage.getItem('channel')

        const response = await axios.get('http://localhost:8010/channels/' + channelID)

        setChannel(response.data)

        console.log("chat response", response);
        console.log("channelID", channelID);

    }, []);

    const sendMessage = async () => {

        const userID = localStorage.getItem('chatbox-user')

        const userData = await axios.get('http://localhost:8010/users/' + userID)

        console.log("userData :", userData);
        console.log("userID :", userID);

        const sendData = {

            channel: channel.name,
            sender: userData.data.firstName,
            senderID: userID,
            message: message
        }

        axios.post("http://localhost:8010/channels/newMessage", sendData)

        window.location.reload();


        console.log("sendmessage ok");

    }



    return (

        <Box>
            <div className="text-center">
                <h3>{channel.name}</h3>
                <a href="/home"><button href="/home" type="button" style={{ boxShadow: "none", marginBottom: "10px" }} className="btn btn-success">exit chat</button></a>
            </div>

            <Paper sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                },
            }} elevation={24} style={{ width: "fit-content", height: "fit-content", marginLeft: "366px" }}>

                <div className='container' style={{ width: "560px" }}>
                    {console.log("state channel", channel)}
                    <div className="overflow-auto" style={{ height: 475, backgroundImage: 'https://mdbootstrap.com/img/Photos/Others/images/76.jpg' }}>
                        {/* <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F6a%2Fb3%2F3d%2F6ab33d19c8809d4dabbe81086e276b5d.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F332140541238995639%2F&tbnid=twIYE8doCVlgIM&vet=12ahUKEwjooKG8yvnxAhXLCWMBHVpADq4QMygBegUIARCuAQ..i&docid=tyvz_ae9A2PhCM&w=640&h=960&q=whatsapp%20wallpaper&ved=2ahUKEwjooKG8yvnxAhXLCWMBHVpADq4QMygBegUIARCuAQ" className="card-img" alt="..." /> */}

                        <Messages className="card-img-overlay" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Write here" onChange={(e) => setMessage(e.target.value)} />
                        <button className="btn btn-outline-secondary" style={{ boxShadow: "none" }} type="button" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </Paper>
        </Box>


    );
}

export default Chat;
