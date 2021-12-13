import { Button, Divider, Grid } from "@mui/material";
import React, { useState , useEffect} from "react";
import HomePageList from "../../components/molecules/HomepageOptionList";
import CustomizedProduct from "../../components/molecules/custominzedProduct";
import SideList from "../../components/molecules/sideList";
import Footer from "../../components/organism/Footer";
import MiniBar from "../../components/organism/MiniBar";
import NavBar from "../../components/organism/NavBar";
import coverImage from "../../assets/images/cover.jpg"
import HomeListItems from "../../components/organism/HomeListItems";
import ProductPage from "../ProductPage";
import axios from "axios";
import DemoCarousel from "./Carousel";


const HomeScreen = () => {
  const [homeBool, setHomeBool] = useState(true);
  const [productBool, setProductBool] = useState(false);

  let [prod,setProd] = React.useState([]);
  let token = localStorage.getItem('token');

  let getProducts = () => {
      axios
        .get("http://localhost:5000/api/products", {
          headers: {
            Authorization:
              token,
          },
        })
        .then(function (response) {
          setProd(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
  useEffect(()=>{
    getProducts();
  },[])

  console.log(prod)


  return (
   
    <Grid container>
       {homeBool && ( 
         <>

      <Grid container>
      <Grid item md={12}>
        <MiniBar />
      </Grid>

      <Grid item md={12} xs={12} sm={12}>
      <NavBar />
      </Grid>

    {  /*  Categories Buttons   */}
      <Grid item md={1}></Grid>

      <Grid item md={10}>
        <HomePageList />

        <Divider />
      </Grid>

      <Grid item md={1}></Grid>

     { /* Below Image and SideList  */}

      <Grid item md={1}></Grid>

      <Grid item md={10}>
       <div style={{marginRight:20,marginTop:15}}>
       <DemoCarousel
/>
       </div>
      </Grid>
  
      <Grid item md={1}></Grid>
      <Grid item md={1}></Grid>
      <Grid item md={10} style={{marginTop:20}}> 

      </Grid>
      <Grid item md={1}></Grid>
      <Grid item md={1}></Grid>

      <Grid item md={1}></Grid>
      <Grid item md={10}><Divider/></Grid>
      <Grid item md={1}></Grid>
  {    /*Customized Product Section */}

<Grid container>
<Grid item md={1}></Grid>

<Grid item md={10}>
 <CustomizedProduct/>
</Grid>

<Grid item md={1}></Grid>
</Grid>

{/* Categories List Items */}
<Grid item md={12}>
<Grid container style={{backgroundColor:'#f2f2f2'}}>
  <Grid item md={1} lg={1} sm={1} xs={1}></Grid>
<Grid item lg={10} md={10} sm={12} xs={12}>
  <HomeListItems />
 </Grid>
 <Grid item  md={1} lg={1} sm={1} xs={1}></Grid>
</Grid>
</Grid>


 </Grid>
</>
 )}
 { productBool && (
   <Grid container>
     <ProductPage/>
     </Grid>
 )}
      <Footer />
    </Grid>
     

  );
};

export default HomeScreen;
