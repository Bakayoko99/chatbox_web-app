import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "../styles/homeStyle.css";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';


const Home = () => {

    let history = useHistory()

    const [channelName, setChannelName] = useState([]);
    const [chName, setChName] = useState('');
    const [chOwner, setChOwner] = useState([]);
    const [chUsers, setChUsers] = useState([]);
    const [addUserNumb, setAddUserNumb] = useState([]);
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [userAddedInCh, setUserAddedInCh] = useState(chUsers.slice(0, 3));
    const [userNumb, setuserNumb] = useState("");

    // Modal

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddUser = () => {

        /////////////////////////////////////////////////////// a finire

        for(let i = 0; i < chUsers.length; i++){

            if( chUsers[i] != addUserNumb){

                // console.log('diverso: ', chUsers[i],  addUserNumb);
                
            }else if(chUsers[i] == addUserNumb){
                
                console.log("uguale");
                
            }
        }
        
        
        if (chUsers.map((elem) => addUserNumb != elem)) {
            return setChUsers(chUsers => [...chUsers, addUserNumb])
            
            console.log("addUserNumb: ", addUserNumb);
        } else if (chUsers.map((elem) => addUserNumb === elem)) {
            console.log("okkkkokok");
        }
        //////////

        const nextHiddenItem = chUsers.find((i) => !userAddedInCh.includes(i));
        if (nextHiddenItem) {
            setUserAddedInCh((prev) => [nextHiddenItem, ...prev]);
        }
    };

    const handleRemoveUser = (item) => {


        chUsers.filter((elem) => {
            if (elem === item) {
                return chUsers.splice(chUsers.indexOf(item), 1)
            }
        })

        setUserAddedInCh((prev) => [...prev.filter((i) => i !== item)]);
    };

    const addUserButton = (
        <Button
            variant="contained"
            onClick={handleAddUser}
            id="homeButtons"
        >
            Add
        </Button>
    );

    const renderItem = ({ item, handleRemoveUser }) => {
        return (

            <ListItem
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        title="Delete"
                        id="homeButtons"
                        onClick={() => handleRemoveUser(item)}
                    >
                        <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                }
            >
                <ListItemText primary={item} />
            </ListItem>
        );
    }

    ///



    useEffect(async () => {

        const userID = localStorage.getItem("chatbox-user")

        const response = await axios.get('http://localhost:8010/channels/userChannels/' + userID)

        console.log("home response: ", response.data);

        setChannelName(response.data)


    }, []);

    const enterChat = (e) => {

        localStorage.removeItem("channel")
        localStorage.setItem("channel", e)

        const ok = localStorage.getItem("channel")

        console.log("enterchat okk", ok);

    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const saveChannel = async () => {


        const newChannelInfo = {
            name: chName,
            owner: [chOwner],
            users: [chUsers]
        }

        console.log("oooo: ", chUsers.length);
        console.log("newChannelInfo: ", newChannelInfo);
        console.log("localstorage user connected: ", localStorage.getItem("chatbox-user"));


        if (chUsers.length !== 0) {

            for (let i = 0; i < chUsers.length; i++) {

                const response = await axios.get(`http://localhost:8010/users/number/` + chUsers[i])


                console.log("chUsersfoooooorrrr: ", response);
            }

            console.log("okkkkeeeeeyyyy");

        } else {
            console.log("nooooookkkkkeeyy");
        }

        // const findUserByNumb = async () => {

        //     // for(let i = 0; i < chUsers.length; i++){

        //     //     return console.log("chUsers[i]: ",chUsers[i]);
        //     // }


        //     const numbers = [chOwner, ]

        //     //   987654321
        //     //   123456789
        //     //   113456789   
        //     //   setuserNumb(response)

        //     console.log(response.data._id);
        //     console.log(numbers);

        // }
        // console.log(findUserByNumb());


        // console.log("findUserByNumb: ", userData);

        handleClose()
    }

   

    const logout = () => {

        history.push("/login")
        localStorage.removeItem("chatbox-user")
    }


    return (

        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    mt: 10,
                    ml: 45,
                    width: 600,
                    height: 428,
                    // backgroundColor: "#68a3d6"
                },
            }}
        >
            {console.log("home state channelName: ", channelName)}
            {console.log("chUsers: ", chUsers)}

            <Paper elevation={24} className="container" id="big-container">
                <Box sx={{ width: 500, ml: 6 }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction id="homeButtons" onClick={handleOpen} label="Add new channel" icon={<AddCircleOutlineOutlinedIcon />} />
                        <BottomNavigationAction id="homeButtons" onClick={logout} label="Logout" icon={<LogoutIcon />} />
                    </BottomNavigation>
                </Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={modalStyle}>
                            <Typography id="transition-modal-title" variant="h6" component="span">
                                New Channel
                            </Typography>
                            <Typography component="span" id="transition-modal-description" sx={{ mt: 2 }}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Name" onChange={(e) => setChName(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="number" className="form-control" placeholder="Your number" onChange={(e) => setChOwner(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="number" className="form-control" placeholder="Add a friend number" onChange={(e) => setAddUserNumb(e.target.value)} />
                                    <button className="btn btn-outline-secondary" id="homeButtons" type="button" onClick={saveChannel}>Create channel</button>
                                </div>
                                {addUserButton}
                                <Box sx={{ mt: 1 }}>
                                    <List>
                                        <TransitionGroup>
                                            {chUsers.map((item) => (
                                                <Collapse key={item}>
                                                    {renderItem({ item, handleRemoveUser })}
                                                </Collapse>
                                            ))}
                                        </TransitionGroup>
                                    </List>
                                </Box>
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>

                <div id="channelList">
                    {channelName.map((elem) =>

                        <div className="list-group" key={elem.name}>
                            {/* <button  type="button" className="list-group-item list-group-item-action" onClick={()=>enterChat(elem._id)} >{elem.name}</button> */}
                            <a href="/chat" className="list-group-item list-group-item-action" onClick={() => enterChat(elem._id)}>{elem.name}</a>

                        </div>
                    )}
                </div>
            </Paper>
        </Box >

    );
}

export default Home;



//  64 Avenue Jean Jaurès


//  93310  Le Pré-Saint-Gervais 