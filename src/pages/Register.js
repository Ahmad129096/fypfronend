import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useHistory, NavLink} from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright ©️ '}
      <NavLink color="inherit" to="https://mui.com/">
        Petchase
      </NavLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function SignUp() {

  const [phone,setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState();
  const [vName,setVName] = React.useState('');
  const history = useHistory();
  let mobregex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

  const handleVName=(e)=>{
    setVName(e.target.value.replace(/[0-9]/g, ''));
  }
  // const validateemail = (e)=>
  // {
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if(re.test(email)){
  //       //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
  //       if(email.indexOf("@thedomain.com", email.length - "@thedomain.com".length) !== -1){
  //           //VALID
  //           console.log("VALID");
  //       }
  //   }

  // }
  const handlePhone=(e)=>{
    if(mobregex.test(e.target.value))
    {
      console.log('your email is vaid')
      setPhoneError(true);
    }
    else
    {
      console.log('your email is invaid')
      setPhoneError(false);
    }
    setPhone(e.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let obj ={
      name: vName,
      username: data.get('userName'),
      email: data.get('email'),
      password: data.get('password'),
      phoneNumber: phone
    }
    
    axios.post('http://localhost:5000/api/users', obj)
    .then(function (response) {
      console.log(response.data.data)
      localStorage.setItem('token',`${response.data.data.token}`);
      history.push("/")
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required={true}
                  fullWidth
                  id="name"
                  value={vName}
                  onChange={handleVName}
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required={true}
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  fullWidth
                  id="phone"
                  label="phone"
                  name="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={handlePhone}
                />
              </Grid>
              {phoneError == false ? <div style={{color:'red',marginTop:10,marginLeft:20}}>Incorrect Mobile Number.</div>:<div></div>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
           
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}