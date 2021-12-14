import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { isTemplateHead } from 'typescript';
import jwtDecode from 'jwt-decode';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar() {

  const [search,setSearch] = React.useState();
  const { enqueueSnackbar } = useSnackbar();
  let token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI3YTJiNjg5ZWEyNTRiMGMxYTE0ODYiLCJpYXQiOjE2Mzk0MjQ2OTR9.IaktufTAvVVOhlB9C3_8AbVoDyDMqQgSdRcw2RmmoRQ';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [product,setProduct] = React.useState([]);
  const [searchBool,setSearchBool] = React.useState(false);
  const [category,setCategory] = React.useState([]);
  let userId = jwtDecode(token);

  let productList = [];

  let searchTerm=(e)=>{
    setSearch(e.target.value)
    if(search?.length > 0)
    {
      setSearchBool(true)
    }
    else
    {
      setSearchBool(false);
    }
  }


  let getProducts = () => {
      axios
        .get("http://localhost:5000/api/products", {
          headers: {
            Authorization:
              token,
          },
        })
        .then(function (response) {
          productList = response.data.data;
          setProduct(productList);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
 React.useEffect(()=>{
    getProducts();
  },[])


  console.log('product',product)


  let handleSearch=(e)=>{
    setSearch(e.target.value)

  }

  console.log(search)
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
<div></div>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

     
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar style={{width:'100%', backgroundColor: 'black'}} position="static" onClick={()=>setSearchBool(false)}>
        <Toolbar>
          <a href="/" style={{textDecoration:'none',color:'white'}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            PetChase
          </Typography>
          </a>
          <Search style={{display:'block'}} >
                      <StyledInputBase
                          style={{ width:500 }}
              placeholder="Search Here .."
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchTerm}
              value={search}
            />


          </Search>

          <Button style={{color:'white'}} onClick={()=>{
                window.location.href = `/search/${search}`;
              }} >
            Search 
          </Button>
        
          <Box sx={{ flexGrow: 1 }} />
    
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge  color="error">
                <MailIcon onClick={()=>{
                      userId._id != '61b7a2b689ea254b0c1a1486' ? window.location.href="/message" :
                      enqueueSnackbar('Please login first to view this page!', {
                        variant: 'error',
                        autoHideDuration: 5000
                      });
            }} />
              </Badge>
            </IconButton>

            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge  color="error">
                <AccountCircle onClick={()=>{
              token ? window.location.href="/user" : window.location.href="/login"
            }} />
              </Badge>
            </IconButton>
    
           
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {
              searchBool && product?.filter((val)=>{
                if(search=="")
                {
                  return val.name || val.name;
                }
               else if(val.name.toLowerCase().includes(search.toLowerCase()) )
               {
                 return  val.name;
               }
              })?.map((val,key)=>{
                return(
                  <div style={{marginLeft:160,backgroundColor:'##f0f0f0'}} key={key}>
                   <div><a href={`/search/${val.name}`} >{val.name }</a>
                   </div> 
                   <div>
                    <a href={`/search/${val.description}`} >{val.description }</a>
                    </div> 
                    </div>
                )
              })
            }
    </Box>
  );
}