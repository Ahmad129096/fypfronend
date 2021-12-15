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