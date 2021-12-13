import React from 'react';
import { Button, Divider, Grid } from "@mui/material";
import MiniBar from '../components/organism/MiniBar';
import NavBar from '../components/organism/NavBar';
import HomePageList from '../components/molecules/HomepageOptionList';
import ShippingItems from '../components/molecules/shippingItems';


const Shipping = () => {
    return ( 
        <Grid container>
        <Grid item md={12}>
            <MiniBar/>
            <NavBar/>
        </Grid>
         {/*  Categories Buttons   */}
     <Grid item md={1}></Grid>

<Grid item md={10}>
 <HomePageList />

 <Divider />
</Grid>

<Grid item md={1}></Grid>
        <Grid item md={12}>
            <br/>
            <br/>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={10}>
          <ShippingItems/>
        </Grid>
        <Grid item md={1}></Grid>
    </Grid>
     );
}
 
export default Shipping;