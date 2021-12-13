import { Grid, Link, Typography } from '@mui/material';
import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const MiniBar = () => {
    let token = localStorage.getItem('token');
    let [name , setName] = React.useState();
    let userId = token ? jwtDecode(token) : ''


    var getUser = () =>{
        axios.get(`http://localhost:5000/api/users/${userId._id}`, {headers:{'Authorization':token}})
        .then(function (response) {
            console.log('hel',response.data.data)   
            setName(response.data.data.name) 
        })
        .catch(function (error) {
          console.log(error);
        });
      }


    React.useEffect(()=>{
        getUser();
       
    },[])
    return ( 
      <Grid container>
          {/*
          <Grid item md={12}>
              <div style={{display:'flex'}}>
              <Typography style={{marginLeft:'30px'}}>
                  Hi !
              </Typography>
              {
                  token ? (
                      <div>&nbsp; &nbsp;  {name} </div>
                  ) : (
                    <Link href="/login" style={{marginLeft:'30px'}}>
                    Sign In/ Sign Up
                    </Link>
                  )
              }
  
              <div style={{position:'absolute',right:50}}>
              <Link href="/login" style={{marginLeft:'30px'}}>
              Logout
              </Link>

              </div>
              </div>
          </Grid>
            */}
      </Grid>
     );
}
 
export default MiniBar;