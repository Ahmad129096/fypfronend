import React from 'react';
import { Button, Link } from "@mui/material";
import DropDown from '../atoms/DropDown';

const HomePageList = () => {
    let token = localStorage.getItem("token");
    let list = [
        {title:'Categories'},
        {title:'Ready to ship'},
        {title:'Wishlist'},
        {title:'Services & Help'},
        {title:'Blogs'},
    ]
    return ( 
       
        <ul style={{display:'flex',listStyle:'none',alignItems:'center',
        justifyContent:'center',backgroundColor:"#a3a19d",width:'100%'}}>
        <li style={{color:'black'}}>
          <DropDown  title={list[0].title} />
        </li>
     
        <li>
        <Button style={{color:'black'}} onClick={()=>{
                window.location.href = "/wishlist"
            }}>Wishlist</Button>
         
        </li>
        <li>
            <Button style={{color:'black'}} onClick={()=>{
                window.location.href = "/services"
            }}>Services & Help</Button>
        </li>
        <li>
            <a style={{textDecoration:'none'}} href="/blog">
                <Button style={{color:'black'}}>Blogs</Button>
            </a>
        </li>
     
        <li>
            <Button style={{color:'black'}} onClick={()=>{
                
                window.location.href = token ? "/vendor" : "/login"
            }}>Post your pet</Button>
        </li>
  
    </ul>
            
     );
}
 
export default HomePageList;