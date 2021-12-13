import { Grid, TextField, Typography, Divider } from '@mui/material';
import React from 'react';
import MiniBar from '../components/organism/MiniBar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
let Services = () => {
    let arr = [
        {
            buying: 'Buying',
            icon: <ShoppingCartIcon/>
        },
        {
            buying: 'Selling',
            icon: <LocalOfferIcon/>
        },
        {
            buying: 'Account',
            icon: <AccountCircleIcon/>
        },
        {
            buying: 'Refund & Return',
            icon: <KeyboardReturnIcon/>
        },
        {
            buying: 'Shipping',
            icon: <LocalShippingIcon/>
        },
        {
            buying: 'Fee & Billing',
            icon: <LocalAtmIcon/>
        },
    ]
    return(
        <Grid container spacing={3}>

            <Grid item md={12}>
                <MiniBar/>
            </Grid>
            <Grid item md={1}>

            </Grid>
            <Grid item md={10}>
            <label>Customer Service</label>
            <br/>
            <div style={{height:250,backgroundColor:'black',marginTop:20,marginBottom:20}}>
               <br/>
            <div style={{marginTop:30,marginLeft:40,marginRight:40}}>
                <Typography variant="h4" style={{color:'white',marginTop:30}}>
                    How can we help you?
                </Typography>
                <br/>
                <TextField
                fullWidth
                style={{backgroundColor:'white'}}
                label="Search for Help"
                />
            </div>
            </div>
            </Grid>

            <Grid item md={1}>
                </Grid>
                <br/>
                <br/>
                <Grid item md={1} style={{backgroundColor:'#f7f7f7'}}>
            
            </Grid>
            <Grid item md={10} style={{backgroundColor:'#f7f7f7'}}>
            <Typography variant="h4">
                Browse Help Articles
            </Typography>
            <br/>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
            {arr.map((item,i)=>{
                return(
                <div key={i} style={{width:'30%',height:250,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'white',margin:20}}>
                    <div>
                       {item.buying}
                       <br/>
                       <div style={{marginTop:'20px',color:'black',display:'flex',justifyContent:'center'}}> 
                       {item.icon}
                       </div>
                    </div>
                </div>
                )
            })}
            </div>
            </Grid>
            <Grid item md={1} style={{backgroundColor:'#f7f7f7'}}>
            
            </Grid>
            <Grid item md={12} style={{backgroundColor:'#e0e0e0',height:400}}>
            <div style={{display:'flex',justifyContent:'center',marginTop:50}}>
            <div style={{backgroundColor:'white',width:400,height:150}}>
                <Typography variant="h5" style={{textAlign:'center',marginTop:10,marginBottom:10}}>
                    Contact Us
                </Typography>
                <Divider/>
                <Typography variant="subtitle1" style={{textAlign:'center',marginTop:10}}>
                Email: Petchase@gmail.com
                </Typography>
                <Typography variant="subtitle1" style={{textAlign:'center',marginTop:10}}>
                Phone: 0232030230
                </Typography>

                </div>
            </div>
            </Grid>
        </Grid>
    )
}

export default Services;