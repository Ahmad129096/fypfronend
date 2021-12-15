import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import CategoriesItems from '../organism/CategoriesItemsList';
import {NavLink} from 'react-router-dom'

export default function DropDown(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [category,setCategory] = React.useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let token = localStorage.getItem('token');


  let getCategories = () =>{
    axios.get(`http://localhost:5000/api/categories`, {headers:{'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI3YTJiNjg5ZWEyNTRiMGMxYTE0ODYiLCJpYXQiOjE2Mzk0MjQ2OTR9.IaktufTAvVVOhlB9C3_8AbVoDyDMqQgSdRcw2RmmoRQ'}})
    .then(function (response) {
      setCategory(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

React.useEffect(() => {
getCategories();

}, [])

  return (
    <div>
      <Button
      style={{fontFamily: "serif", fontSize: 20,color:'black'}}
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       {props.title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {category?.map((item,i)=>{
          return(
          <NavLink to={`/category/${item.name}`} style={{textDecoration:'none', color: 'black'}}>
              <MenuItem  onClick={handleClose}>{item.name}</MenuItem>
            </NavLink>
          )
        })}
      </Menu>
    </div>
  );
}