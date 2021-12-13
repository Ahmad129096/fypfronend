import React from 'react';
import { Button, Divider, Grid } from "@mui/material";
import MiniBar from '../components/organism/MiniBar';
import NavBar from '../components/organism/NavBar';
import CategoriesItems from '../components/organism/CategoriesItemsList';
import HomePageList from '../components/molecules/HomepageOptionList';

const CategoryPage = () => {
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
            <CategoriesItems />
         </Grid>
         <Grid item md={1}></Grid>
     </Grid>
      );
}
 
export default CategoryPage;