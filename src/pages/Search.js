import React, { useState, useEffect, useMemo } from "react";
import { Button, Divider, Grid } from "@mui/material";
import MiniBar from '../components/organism/MiniBar';
import NavBar from '../components/organism/NavBar';
import HomePageList from '../components/molecules/HomepageOptionList';
import { TextField, Typography } from "@mui/material";
import Select from "../components/atoms/Select";
import DetailCard from '../components/atoms/detailCard'
import axios from "axios";
import jwtDecode from "jwt-decode";
import en from "../../src/locale/eng.json";
import de from "../../src/locale/de.json";


const Search = () => {


    const [products,setProducts] = useState([]);
    const [productx,setProductx] = useState([]);
  const [minPrice,setMinPrice] = useState(0);
  const [maxPrice,setMaxPrice] = useState(0);
  let t = localStorage.getItem('lang') === 'en' ? en : de;
  const [int, setInt] = React.useState(t);

  let token = localStorage.getItem("token") || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI3YTJiNjg5ZWEyNTRiMGMxYTE0ODYiLCJpYXQiOjE2Mzk0MjQ2OTR9.IaktufTAvVVOhlB9C3_8AbVoDyDMqQgSdRcw2RmmoRQ';
  let jwt = token ? jwtDecode(token): '';
  var url = window.location.pathname;
  var category = url.substring(url.lastIndexOf("/") + 1);
  var link = category.replace(/%20/g, " ");
  console.log(link,'linkkk');

  console.log(category);

  let handleMinPrice = (e) =>
  {
    setMinPrice(e.target.value);
  }
  let handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  }


  let getCategoryItems = () => {
    axios.get(`http://localhost:5000/api/products`,{headers: { Authorization: token }})
    .then(function (response) {
      console.log(response);
      setProducts(response.data.data.filter(t=>t.name.toLowerCase().includes(link.toLowerCase())))
    
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  let getCategoryItem = () => {
    axios.get(`http://localhost:5000/api/products`,{headers: { Authorization: token }})
    .then(function (response) {
      console.log(response);
      setProductx(response.data.data.filter(t=>t.description.toLowerCase().includes(link.toLowerCase())))
    
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let handleFilter = () =>{
    
    axios.get('http://localhost:5000/api/products/search/advance?minPrice&maxPrice',
    {params:{minPrice,maxPrice}},{headers: { 'Authorization': token }})
    .then(function (response) {
      console.log(response);
      setProducts(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  useEffect(()=>{
    getCategoryItems();
    getCategoryItem();
  },[])

  useEffect(()=>{

  },[products])



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
         <Grid container>
      <Grid item md={12}>
        <Typography variant="h5">{int.searches}:</Typography>
      </Grid>
      <Grid item md={12}>
          <br/>
      </Grid>
      <Grid item md={12}>
  
        <br/>
        <Typography variant="h6">
          
        {products?.length > 0 ? <div> </div> : <div> {int.no_pet_found}</div>
      }
        </Typography>
      </Grid>

 
      <Grid item md={12}>
      <Grid container>

{productx?.map(function (item, i) {
        return (
          <Grid item lg={4} md={6} sm={6} xs={12} style={{ marginTop: "20px" }}>
          <DetailCard
            type={item.name}
            image={`https://fyptest1.blob.core.windows.net/images/${item.images[0]}`}
            price={item.price}
            desc={item.description}
            id={item._id}
            img={`https://fyptest1.blob.core.windows.net/images/${item?.vendor?.appartment}`}
            rate={item.ratings.value}
           

          />
        </Grid>
        

        );
      })}
      </Grid>

      </Grid>
    </Grid>
         </Grid>
         <Grid item md={1}></Grid>
     </Grid>
      );
}
 
export default Search;