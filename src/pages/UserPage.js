import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { TableCell,TableBody,TableRow,TableContainer,Paper,Table,TableHead } from "@mui/material";
import { TextField } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FileUpload from "../components/organism/fileUpload";
import jwtDecode from "jwt-decode";
import {browserHistory} from "react-router";
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const drawerWidth = 240;

function UserPage(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { jindow } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [img, setImg] = React.useState();
  const [email,setEmail] = React.useState('');
  const [name,setName] = React.useState('');
  const [phone,setPhone] = React.useState('');
  const [listOrders,setListOrders] = React.useState();
  const [newsCover,setNewsCover] = React.useState('');
  

  let token = localStorage.getItem('token');
  let decode = jwtDecode(token);

  const handleName=(e)=>{
    setName(e.target.value);
  }

  const handlePhone=(e)=>{
    setPhone(e.target.value);
  }


  const history = useHistory();

  let saveInfo = () =>{
    let obj = {
      name: name,
      phoneNumber: phone
    }
    axios.patch(`http://localhost:5000/api/users/${decode._id}`, obj, {headers:{'Authorization':token}})
    .then(function (response) {
      enqueueSnackbar('Information updated successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        window.location.href = '/user';
      }, 2000);

    })
    .catch(function (error) {
      console.log(error);
    });

  }
  
  let getOrders = () => {
    axios
      .get("http://localhost:5000/api/orders", {
        headers: {
          Authorization:
            token,
        },
      })
      .then(function (response) {
        console.log(decode._id, '===')
        let arr = response.data.data.filter(ar => ar.user._id == decode._id)
        console.log(arr);
        setListOrders(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  let savePicture = () =>{
    console.log('saving image')
    let obj = {
      appartment: newsCover[0]
    }
    axios.patch(`http://localhost:5000/api/users/${decode._id}`, obj, {headers:{'Authorization':token}})
    .then(function (response) {
     console.log('information updated');
     history.push('/user')

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  let getUser = () =>{
    axios.get(`http://localhost:5000/api/users/${decode._id}`, {headers:{'Authorization':token}})
    .then(function (response) {
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setPhone(response.data.data.phoneNumber);
      setNewsCover(response.data.data.appartment);

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let handleStatus = (e,id) =>{
    let obj ={
      status: e.target.value
    }
    axios.patch(`http://localhost:5000/api/orders/${id}`, obj, {headers:{'Authorization':token}})
    .then(function (response) {
      enqueueSnackbar('Order status updated successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        window.location.href = '/user';
      }, 2000);
     } )
  }

React.useEffect(() => {
 getUser();
 getOrders();

}, [])
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log(newsCover)
  const container =
    jindow !== undefined ? () => jindow().document.body : undefined;

  return (
    <>
      <Grid container spacing={3}>
   
    <Grid item md={12}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{backgroundColor:'black'}}
        sx={{
          width:'100%',
     
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
       
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{width:300}} variant="h6" noWrap component="div">
          Dashboard
          </Typography>
          <div style={{display:'flex',width:'100%',justifyContent:'flex-end',color:'white'}}>
            <Button  style={{color:'white'}}  onClick={()=>{
              window.location.href="/"
            }}>
              Home
            </Button>
            <Button style={{color:'white'}} onClick={()=>{
              localStorage.clear();
              window.location.href="/login"
            }}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
     
     
    
      </Box>

    
    </Box>
    <br/>
    <br/>
    </Grid>

      <Grid item md={6} xs={12}>
        <div style={{marginTop:'50px',display:'flex',borderRadius:'9px',padding:10,border:'#44adbd'}}>
        <img style={{margin:'0px auto',maxHeight:600,maxWidth:500,borderRadius:20}}
         src={newsCover === undefined || '' ? 'https://fyptest.blob.core.windows.net/images/photo-1524024973431-2ad916746881.jfif' : 
         `https://fyptest.blob.core.windows.net/images/${newsCover}`}/>
        </div>
            
    <div style={{display:'flex'}}>
      <div style={{margin:'0px auto'}}>
      <FileUpload 
        up={newsCover}
        setUp={setNewsCover}
        temp={newsCover}
        savePicture={savePicture}
       // success={success}
      />
      </div>
 </div>
        </Grid>
        <Grid item md={6} xs={12}>
        <div style={{marginTop:'60px',marginLeft:'30px',marginRight:'30px'}}>
        <div style={{ display: "flex", marginTop: 30 }}>
        <TextField
            style={{cursor:'not-allowed !important'}}
            disabled={true}
            fullWidth
            name="Email"
            id="Email"
            label="Email"
            value={email}
          />
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
        <TextField
            fullWidth
            name="Name"
            id="Name"
            label="Name"
            value={name}
            onChange={handleName}
          />
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
        <TextField
            fullWidth
            name="phone"
            id="phone"
            label="phone"
            value={phone}
            onChange={handlePhone}
          />
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
        <Button onClick={saveInfo} style={{backgroundColor:'black',color:'white',width:'100px'}} >Save</Button>
        </div>
        </div>
        </Grid>
     <Grid item md={12} xs={12}>
      <Divider/>
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width:'100%',
      }}
    >
      {console.log(listOrders)}
      <Toolbar />
    
     </Box>
    

     </Grid>
    </Grid>

    </>
  );
}

UserPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default UserPage;
