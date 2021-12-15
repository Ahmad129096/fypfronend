import React from 'react';
import { Button, Link } from "@mui/material";
import DropDown from '../atoms/DropDown';
import en from "../../locale/eng.json";
import de from "../../locale/de.json";

const HomePageList = () => {
    let t = localStorage.getItem('lang') === 'en' ? en : de;
    const [int, setInt] = React.useState(t);
    let token = localStorage.getItem("token");
    let list = [
        {title:`${int.categories}`},
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
            }}>{int.wishlist}</Button>
         
        </li>
        <li>
            <Button style={{color:'black'}} onClick={()=>{
                window.location.href = "/services"
            }}>{int.service}</Button>
        </li>
        <li>
            <a style={{textDecoration:'none'}} href="/blog">
                <Button style={{color:'black'}}>{int.blog}</Button>
            </a>
        </li>
     
        <li>
            <Button style={{color:'black'}} onClick={()=>{
                
                window.location.href = token ? "/vendor" : "/login"
            }}>{int.post}</Button>
        </li>
  
    </ul>
            
     );
}
 
export default HomePageList;