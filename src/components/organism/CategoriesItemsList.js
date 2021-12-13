import { Grid,Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import Select from "../atoms/Select";
import DetailCard from '../atoms/detailCard'
import axios from "axios";


const CategoriesItems = () => {

  const [products,setProducts] = useState([]);
  const [minPrice,setMinPrice] = useState(0);
  const [maxPrice,setMaxPrice] = useState(0);

  let token = localStorage.getItem("token");
  var url = window.location.pathname;
  var category = url.substring(url.lastIndexOf("/") + 1);
  var link = category.replace('%20',' ');
  console.log(link);

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
      if(link == 'exclusive_products')
      {
        setProducts(response.data.data.filter(t=>t.category.name === 'Exclusive Products'))
      }
      else
      {
        setProducts(response.data.data.filter(t=>t.category.name === link))
      }
    
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
  },[])

  useEffect(()=>{

  },[products])


  return (
    <Grid container>
      <Grid item md={12}>
        <Typography variant="h4">Deals and Promotions</Typography>
      </Grid>
      <Grid item md={12}>
          <br/>
      </Grid>
      <Grid item md={12}>
        <Typography variant="subtitle1">
          Shop Today’s Deals, Lightning Deals, and limited-time discounts
        </Typography>
        <br/>
        <Typography variant="h6">
          
        {products?.length > 0 ? <div> </div> : <div> No Product found! </div>
      }
        </Typography>
      </Grid>

      <Grid item md={7}>
          <div style={{display:'flex'}}>
        <label style={{marginRight:'20px'}}>Sort by:</label> 
        <Select />

        <TextField
        style={{marginLeft:20}}
        label="Min price"
        value={minPrice}
        onChange={handleMinPrice}
        />

<TextField
        style={{marginLeft:20}}
        label="Max price"
        value={maxPrice}
        onChange={handleMaxPrice}
        />

<TextField
        style={{marginLeft:20}}
        label="Category"
        />
        </div>
        <Button onClick={handleFilter}>
          Apply
        </Button>
      </Grid>
      <Grid item md={5}></Grid>
      <Grid item md={12}>
          <br/>
          <br/>
      </Grid>
      <Grid item md={12}>
      <Grid container>
      {products?.map(function (item, i) {
        return (
          <Grid item lg={4} md={6} sm={6} xs={12} style={{ marginTop: "20px" }}>
          <DetailCard
            type={item.name}
            image={`https://fyptest.blob.core.windows.net/images/${item?.images[0]}`}
            price={item.price}
            desc={item.description}
            id={item._id}
            img={`https://fyptest.blob.core.windows.net/images/${item?.vendor?.appartment}`}
            rate={item.ratings.value}
           

          />
        </Grid>

        );
      })}
      </Grid>

      </Grid>
    </Grid>
  );
};

export default CategoriesItems;
