
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Messages = () => {

    const [allMessages, setAllMessages] = useState([]);

    useEffect(async () => {

        const channelID = localStorage.getItem('channel')


        console.log("userID: ", channelID);

        const response = await axios.get("http://localhost:8010/channels/messages/" + channelID)

        console.log("messages response", response);

        setAllMessages(response.data)

    }, []);


    // window.scrollTo(0,document.body.scrollHeight);


    window.onload = function () {
        window.scrollTo(0, document.querySelector("#scrollingContainer").scrollHeight);

    }

    const scroll = () => {
        window.scrollTo(0)
    }

    return (

        <div>
            {console.log("state messages; ", allMessages)}
            <ul className="list-group list-group-flush" id="scrollingContainer">
                {allMessages.map((elem) =>
                    <li key={elem.ok} className="list-group-item text-start" >
                        <div key={elem.sender} className="d-flex w-100 justify-content-start">
                            <b><p  className="mb-1 me-1 text-start">{elem.sender}</p></b>
                            <small className="text-start">22:17</small>
                        </div>
                        <p key={elem.messages} className="mb-1">{elem.message}</p>
                    </li>
                )}

            </ul>
        </div>
    );
}

export default Messages;


