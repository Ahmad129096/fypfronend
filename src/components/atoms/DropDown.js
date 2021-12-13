import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import CategoriesItems from '../organism/CategoriesItemsList';

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
    axios.get(`http://localhost:5000/api/categories`, {headers:{'Authorization':token}})
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
          <a href={`/category/${item.name}`} style={{textDecoration:'none'}}>
              <MenuItem  onClick={handleClose}>{item.name}</MenuItem>
            </a>
          )
        })}
      </Menu>
    </div>
  );
}