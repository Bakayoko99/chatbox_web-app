
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/homepageStyle.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const Homepage = () => {

  let history = useHistory()

  const loginBtn = () => {
    history.push('/login')
  }
  const signUpBtn = () => {
    history.push('/signUp')
  }

  return (

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          mt: 10,
          ml: 53,
          width: 428,
          height: 428,
        },
      }}
    >
      <Paper elevation={24} className="button-background">


        <div >

          <Button variant="outlined" type="button" className="btn1" style={{ marginBottom: "10px" }} onClick={loginBtn}>Login</Button>

          <br />

          <Button variant="outlined" type="button" onClick={signUpBtn}>Sign In</Button>

        </div>

      </Paper>
    </Box>
  );

}

export default Homepage;
