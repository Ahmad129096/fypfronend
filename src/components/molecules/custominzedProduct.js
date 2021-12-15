import { Typography } from "@mui/material";
import React from "react";
import SimpleCard from "../atoms/simpleCard";
import PerfectScrollbar from 'react-perfect-scrollbar'
import axios from 'axios';
import {useHistory, NavLink} from 'react-router-dom'

const CustomizedProduct = () => {

  let token = localStorage.getItem('token');
  const [products,setProducts] = React.useState([]);
  const [topRated,setTopRated] = React.useState([]);
  const history =useHistory()

 
  let getProducts = () =>{
    axios.get('http://localhost:5000/api/products', {headers:{'Authorization':token}})
    .then(function (response) {
      let arr = response.data.data.filter(t=> t.category.name == `Men's Wear`);
      let brr = response.data.data.filter(t=> t.category.name == `Women's Wear`);
      let crr = response.data.data.filter(t=> t.category.name == `Discounts`);
      let drr = response.data.data.filter(t=> t.category.name == `Exclusive Products`);
      let err = response.data.data.filter(t=> t.category.name == `Electronics`);
      let frr = response.data.data.filter(t=> t.category.name == `Deals`);
      let final = [];
      final.push(arr[0]);
      final.push(brr[0]);
      final.push(crr[0]);
      final.push(drr[0]);
      final.push(err[0]);
      final.push(frr[0]);
      console.log(final)
      setProducts(final);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

 
  React.useEffect(()=>{
    getProducts();
 

  },[])

  let redirectToCategory = (name) => {
    history.push(`/category/${name}`) 
    console.log('clicked');
  }

 

  console.log('ogodgog',products[0]?.productCollection?.name)
 
  return (
    <div>
      
   
    <div style={{display:'flex', marginTop: "20px", marginBottom: "20px"}}>
      {products?.map(function (item, i) {
        if(item?.images[0] === undefined)
        {
          <div> </div>
        }
        else
        {
          return (
            <div  onClick={()=>redirectToCategory(item?.category?.name)}  style={{ marginLeft: i==1 ? '0px':'40px', marginTop: "10px"}}>
              <SimpleCard type={item?.category?.name || ''} image={`https://fyptest1.blob.core.windows.net/images/${item?.images[0]}`} />
            </div>
          );
        }
       {console.log(i)}
      })}
    </div>

    </div>
  );
};

export default CustomizedProduct;
