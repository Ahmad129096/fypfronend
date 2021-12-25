import * as React from "react";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DeleteIcon from '@mui/icons-material/Delete';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useSnackbar } from 'notistack';
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TextField, Button, Avatar } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Table from '@mui/material/Table';
import EditIcon from '@mui/icons-material/Edit';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from "@mui/material/Select";
import axios from "axios";
import EditProduct from "../components/organism/EditProduct";
import FilesDropzone from "../components/organism/filesDropZone";
import FileUpload from "../components/organism/fileUpload";
import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import { IoIosAddCircle,IoIosListBox } from "react-icons/io";
import {BiCategory} from 'react-icons/bi'
import {ImUsers} from 'react-icons/im'
import { fontWeight } from "@mui/system";
const drawerWidth = 240;

function AdminPage(props) {
  const { jindow } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collection, setCollection] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [users,setUsers] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [active, setActive] = React.useState('add')

  let admintoken = localStorage.getItem('admintoken');
  const [category, setCategory] = React.useState('');
  const [subCategory,setSubCategory] = React.useState('');
  const [name , setName] = React.useState('');
  const [shortDescription , setShortDescription] = React.useState('');
  const [description , setDescription] = React.useState('');
  const [stock , setStock] = React.useState('');
  const [price , setPrice] = React.useState('');
  const [productBoolean,setProductBoolean] = React.useState(true);
  const [listProductBoolean, setListProductBoolean] = React.useState(false);
  const [listCategoriesBoolean, setListCategoriesBoolean] = React.useState(false);
  const [listUserBoolean, setListUserBoolean] = React.useState(false);
  const [newsBoolean, setNewsBoolean] = React.useState(false);
  const [newsBooleanList, setNewsBooleanList] = React.useState(false);
  const [ordersBoolean, setOrdersBoolean] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editProduct,setEditProduct] = React.useState([]);
  const [image,setImage] = React.useState();
  const [img, setImg] = React.useState();
  const [listNews,setListNews] = React.useState([]);
  const [news, setNews] = React.useState('');
  const [newsDescription,setNewsDescription] = React.useState();
  const [newsCover,setNewsCover] = React.useState();
  const { enqueueSnackbar } = useSnackbar();
  const [listOrders,setListOrders] = React.useState();
  const history = useHistory();
  

  let [adName , setAdName] = React.useState();
  let adminId = admintoken ? jwtDecode(admintoken) : ''


  var getAdmin = () =>{
     
      axios.get(`http://localhost:5000/api/admin/${adminId._id}`, {headers:{'Authorization':admintoken}})
      .then(function (response) {
          console.log('hel',response.data.data)   
          setAdName(response.data.data.name) 
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  React.useEffect(()=>{
      getAdmin();
      if(!admintoken)
      {
       (()=>{
         history.push("/adminlogin")
       })();
      }
     
  },[])

  let handleChangeNews = (e) =>{
    setNews(e.target.value)
  }

  let handleChangeNewsDescription = (e) =>{
    setNewsDescription(e.target.value)
  }



  let uploadState = (e) => {
    setImg(e)
  }

  let uploadImage = (e) => {
    console.log(e.target.files);
  }


  let handleClickOpen = () =>{
      setOpen(true);
  }






  let handleProduct = () => {
    setActive('add')
      setProductBoolean(true);
      setListProductBoolean(false);
      setListCategoriesBoolean(false);
      setListUserBoolean(false);
      setNewsBoolean(false);
      setOrdersBoolean(false)
      setNewsBooleanList(false);
  }

  let handleListProduct = () => {
    setActive('pets')
    setProductBoolean(false);
    setListProductBoolean(true);
    setListCategoriesBoolean(false);
    setListUserBoolean(false);
    setNewsBoolean(false);
    setNewsBooleanList(false);
    setOrdersBoolean(false)
}


let handleListCategories = () => {
  setActive('cat')
    setProductBoolean(false);
    setListProductBoolean(false);
    setListCategoriesBoolean(true);
    setListUserBoolean(false);
    setNewsBoolean(false);
    setNewsBooleanList(false);
    setOrdersBoolean(false)
}


let handleListUser = () => {
  setActive('users')
    setProductBoolean(false);
    setListProductBoolean(false);
    setListCategoriesBoolean(false);
    setListUserBoolean(true);
    setNewsBoolean(false);
    setOrdersBoolean(false)
    setNewsBooleanList(false);
}

let handleNews = () => {
    setProductBoolean(false);
    setListProductBoolean(false);
    setListCategoriesBoolean(false);
    setListUserBoolean(false);
    setNewsBoolean(true);
    setOrdersBoolean(false)
    setNewsBooleanList(false);
}

let handleNewsList = () => {
  setProductBoolean(false);
  setListProductBoolean(false);
  setListCategoriesBoolean(false);
  setListUserBoolean(false);
  setNewsBoolean(false);
  setOrdersBoolean(false)
  setNewsBooleanList(true);
}


let handleOrders = () => {
    setProductBoolean(false);
    setListProductBoolean(false);
    setListCategoriesBoolean(false);
    setListUserBoolean(false);
    setNewsBoolean(false);
    setOrdersBoolean(true)
    setNewsBooleanList(false);
}

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [cate, setCate] = React.useState("");

  const handleChange = (event) => {
    setCate(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  let handleChangeSubCategory = (event) => {
    setSubCategory(event.target.value);
  }

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeShortDescription = (event) => {
    setShortDescription(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeStock = (event) => {
    setStock(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  let deleteProduct = (id) => {
    axios
    .delete(`http://localhost:5000/api/products/${id}`,  {
      headers: {
        'Authorization': admintoken,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      enqueueSnackbar('Pet deleted successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/admin")
      }, 2000);

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let deleteUser = (id) => {
    axios
    .delete(`http://localhost:5000/api/users/${id}`,  {
      headers: {
        'Authorization': admintoken,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      enqueueSnackbar('User deleted successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/admin")
      }, 2000);

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  let deleteNews = (id) => {
    axios
    .delete(`http://localhost:5000/api/news/${id}`,  {
      headers: {
        'Authorization': admintoken,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      enqueueSnackbar('News deleted successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/admin")
      }, 2000);

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  let deleteCategory = (id) => {
    axios
    .delete(`http://localhost:5000/api/categories/${id}`,  {
      headers: {
        'Authorization': admintoken,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      enqueueSnackbar('Category deleted successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });

      setTimeout(function() {
        history.push("/admin")
      }, 2000);

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  let handleSubmit = (event) =>{
      console.log('submitted');
    if(cate)
    {
      let obj = {
        name: cate,
      }
      axios
      .post("http://localhost:5000/api/collections", obj,  {
        headers: {
          'Authorization': admintoken,
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        enqueueSnackbar('Pet added successfully!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        setTimeout(function() {
          history.push("/admin")
        }, 2000);

      })
      .catch(function (error) {
        console.log(error);
      });
    }
   
  
  }

  let addCategory =()=>{

    if(category)
    {
      let obj = {
        name: category,
      }
      axios
      .post("http://localhost:5000/api/categories", obj,  {
        headers: {
          'Authorization': admintoken,
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        enqueueSnackbar('Pet added successfully!', {
          variant: 'success',
          autoHideDuration: 2000
        });
   
        setTimeout(function() {
          history.push("/admin")
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  let addSubCategory =()=>{
   
    
    if(subCategory)
    {
      let obj = {
        name: subCategory,
      }
      axios
      .post("http://localhost:5000/api/subcategories", obj,  {
        headers: {
          'Authorization': admintoken,
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        enqueueSnackbar('Pet added successfully!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        setTimeout(function() {
          history.push("/admin")
        }, 2000);
    
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }



  let getNews = () => {
    axios
      .get("http://localhost:5000/api/news", {
        headers: {
          Authorization:
            admintoken,
        },
      })
      .then(function (response) {
        setListNews(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  let getOrders = () => {
    axios
      .get("http://localhost:5000/api/orders", {
        headers: {
          Authorization:
            admintoken,
        },
      })
      .then(function (response) {
        setListOrders(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  console.log('lsit all orders',listOrders)

  let getUsers = () => {
    axios
      .get("http://localhost:5000/api/users", {
        headers: {
          Authorization:
            admintoken,
        },
      })
      .then(function (response) {
        setUsers(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  let getCollections = () => {
    axios
      .get("http://localhost:5000/api/collections", {
        headers: {
          Authorization:
          admintoken,
        },
      })
      .then(function (response) {
        setCollection(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

console.log(collection);
  let getCategories = () => {
    axios
      .get("http://localhost:5000/api/categories", {
        headers: {
          Authorization:
            admintoken
        },
      })
      .then(function (response) {
        setCategories(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let getProducts = () => {
    axios
      .get("http://localhost:5000/api/products", {
        headers: {
          Authorization:
            admintoken,
        },
      })
      .then(function (response) {
        setProducts(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  let getSubCategories = () => {
    axios
      .get("http://localhost:5000/api/subcategories", {
        headers: {
          Authorization:
            admintoken,
        },
      })
      .then(function (response) {
        setSubCategories(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getCollections();
    getCategories();
    getSubCategories();
    getProducts();
    getUsers();
    getNews();
    getOrders();
  }, []);



  let submitNews =()=>{
    let obj ={
      title: news,
      description: newsDescription,
      cover: newsCover[0],
      author: "Anonymous"
    }
    axios
    .post("http://localhost:5000/api/news",obj, {
      headers: {
        Authorization:
          admintoken,
      },
    })
    .then(function (response) {
      enqueueSnackbar('News added successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/admin")
      }, 2000);
 
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  const activeStyle = {
    color: "red"
  }

 console.log(editProduct)
  const drawer = (
    <div style={{fontFamily:'sans-serif',background: '#16a085',color:'white'}}>
    <div style={{marginLeft:70,marginTop:50}}>
    <Avatar style={{width:100, height:100}} />
    <Typography style={{marginLeft:5,marginTop:20}}>
      {adName}
    </Typography>
    </div>
      <Toolbar />
      <Divider />
      <List onClick={handleProduct}>
        
          <ListItem style={{cursor:'pointer'}}>
            {active === 'add' ? 
            <ListItemIcon style={activeStyle}>
              <IoIosAddCircle/> 
             Add Pets
            </ListItemIcon> : 
            <ListItemIcon>
              <IoIosAddCircle/> 
             Add Pets
            </ListItemIcon>}
            <ListItemText  />
          </ListItem>
      </List  >
          <List  onClick={handleListProduct}>
          <ListItem style={{cursor:'pointer'}}  >
            {active === 'pets' ? <ListItemIcon style={activeStyle}>
              <IoIosListBox/>
             List Pets
            </ListItemIcon> : <ListItemIcon>
            <IoIosListBox/>
             List Pets
            </ListItemIcon>}
            <ListItemText  />
          </ListItem>
      </List >
          <List onClick={handleListCategories}>
          <ListItem style={{cursor:'pointer'}} >
            {active === 'cat' ? <ListItemIcon style={activeStyle} >
              <BiCategory/>
             List Categories
            </ListItemIcon> : <ListItemIcon>
              <BiCategory/>
             List Categories
            </ListItemIcon>}
            <ListItemText  />
          </ListItem>
      </List>
          <List onClick={handleListUser}>
          <ListItem style={{cursor:'pointer'}} >
            {active === 'users' ? <ListItemIcon style={activeStyle}>
              <ImUsers/>
             List Users
            </ListItemIcon> : 
            <ListItemIcon>
              <ImUsers/>
             List Users
            </ListItemIcon>}
            <ListItemText />
          </ListItem>
      </List>
      <Divider />
      {/* <List onClick={handleNews}>
          <ListItem>
            <ListItemIcon>
              Add Ads
            </ListItemIcon>
            <ListItemText  />
          </ListItem>
      
      </List>
      <List onClick={handleNewsList}>
          <ListItem>
            <ListItemIcon>
              List Ads
            </ListItemIcon>
            <ListItemText  />
          </ListItem>
      
      </List> */}
  
    </div>
  );

  const container =
    jindow !== undefined ? () => jindow().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
    
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:'#16a085'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <div style={{display:'flex',width:'80%',justifyContent:'flex-end',color:'white'}}>
          <Button style={{color:'white'}} onClick={()=>{
              localStorage.clear();
              history.push("/adminlogin")
            }}>
              Logout
            </Button>
          </div>
         
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {
        productBoolean && (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

  
        <Typography paragraph>Add a Pet Information</Typography>

    
      


        { /* <FormControl fullWidth>
            <InputLabel id="subCategory">Sub Category</InputLabel>
            <Select
              labelId="subCategory"
              id="subCategory"
              value={cate}
              label="Sub Category"
              onChange={handleChange}
            >
              {collection.map(function (item, i) {
                return (
                  <MenuItem key={i} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            </FormControl> */}
        
        <form>

  
        <div style={{ display: "flex", marginTop: 20 }}>
          <TextField
            fullWidth
            name="Collection"
            id="Collection"
            label="Collection"
            value={cate}
            onChange={handleChange}
          />
        </div>
        <div style={{marginTop:30}}>
        <Button style={{color:'black',border:'1px solid black', backgroundColor: '#16a085', color: 'white'}} variant="outlined" onClick={handleSubmit}> ADD Collection </Button>
        </div>
        <div style={{ display: "flex", marginTop: 20 }}>
          <TextField
            fullWidth
            name="Category"
            id="Category"
            label="Pet"
            value={category}
            onChange={handleChangeCategory}
          />


        </div>
        <div style={{marginTop:30}}>
        <Button style={{color:'black',border:'1px solid black', backgroundColor: '#16a085', color: 'white'}} variant="outlined" onClick={addCategory}> ADD Pet </Button>
        </div>
        <div style={{ display: "flex", marginTop: 20 }}>
          <TextField
            fullWidth
            name="subCategory"
            id="subCategory"
            label="Breed"
            value={subCategory}
            onChange={handleChangeSubCategory}
          />


        </div>
        <div style={{marginTop:30}}>
        <Button style={{color:'black',border:'1px solid black', backgroundColor: '#16a085', color: 'white'}} variant="outlined" onClick={addSubCategory}> ADD Breed </Button>
        </div>
      
        </form>
     
      </Box>
           )}
    
    { listProductBoolean   && (
          <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow style={{background: '#16a085'}}>
            <TableCell style={{color: 'white'}}>Pet Name</TableCell>
            {/* <TableCell>Owner</TableCell> */}
            <TableCell align="right" style={{color: 'white'}}>Edit</TableCell>
            <TableCell align="right" style={{color: 'white'}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#94e3a6' }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {/* {users.map((user)=>(
                
              
                  <TableCell component="th" scope="row">
                  {user.email}
                  {console.log("These are the pets adn ids",row)}
                </TableCell>
                
              ))} */}
              
              <TableCell align="right" ><EditIcon style={{color:'green'}} onClick={()=>handleClickOpen()}/> 
              {open ? <EditProduct id={row._id} open={open} collection={collection} categories={categories} setOpen={setOpen} /> : null }
              </TableCell>
              <TableCell align="right"><DeleteIcon style={{color:'red'}} onClick={()=>deleteProduct(row._id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         </Box>
    )}

{ listCategoriesBoolean   && (
     <Box
     component="main"
     sx={{
       flexGrow: 1,
       p: 3,
       width: { sm: `calc(100% - ${drawerWidth}px)` },
     }}
   >
     <Toolbar />
     <TableContainer component={Paper}>
 <Table sx={{ minWidth: 650 }} aria-label="simple table">
   <TableHead>
     <TableRow style={{background: '#16a085'}}>
       <TableCell style={{color: 'white'}}>Category Name</TableCell>
       <TableCell align="right" style={{color: 'white'}}>Edit</TableCell>
       <TableCell align="right" style={{color: 'white'}}>Delete</TableCell>
     </TableRow>
   </TableHead>
   <TableBody>
     {categories.map((row) => (
       <TableRow
         key={row.name}
         sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#94e3a6' }}
       >
         <TableCell component="th" scope="row">
           {row.name}
         </TableCell>
         <TableCell align="right"><EditIcon style={{color:'green'}} /> </TableCell>
         <TableCell align="right"><DeleteIcon style={{color:'red'}} onClick={()=>deleteCategory(row._id)}/></TableCell>
       </TableRow>
     ))}
   </TableBody>
 </Table>
</TableContainer>
    </Box>
        )}
{ newsBoolean   && (
     <Box
     component="main"
     sx={{
       flexGrow: 1,
       p: 3,
       width: { sm: `calc(100% - ${drawerWidth}px)` },
     }}
   >
     <Toolbar />
     <TableContainer component={Paper}>
       <div style={{margin:20}}>
     <div style={{ display: "flex", marginTop: 20 }}>
          <TextField
            fullWidth
            name="News"
            id="News"
            label="News Title"
            value={news}
            onChange={handleChangeNews}
            
          />
        </div>
        <div style={{ display: "flex", marginTop: 20 }}>
        <TextField
            fullWidth
            name="newsDescription"
            id="newsDescription"
            label="News Description"
            value={newsDescription}
            onChange={handleChangeNewsDescription}
          />
        </div>
        <div style={{ display: "flex", marginTop: 20 }}>
    
    <div>
      <FileUpload
        up={img}
        setUp={setNewsCover}
        temp={newsCover}
       // success={success}
      />
 </div>
</div>
<Button style={{color:'black',border:'1px solid black',marginTop:10}} variant="outlined" onClick={submitNews}>Add Ad</Button>
</div>
</TableContainer>
    </Box>
        )}

{ newsBooleanList   && (
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>News Title</TableCell>
        <TableCell align="right">Delete</TableCell>
        
      </TableRow>
    </TableHead>
    <TableBody>
      {listNews.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#94e3a6' }}
        >
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell align="right"><DeleteIcon style={{color:'red'}} onClick={()=>deleteNews(row._id)}/></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
 </TableContainer>
     </Box>
         )}

{ ordersBoolean   && (
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      {console.log(listOrders)}
      <Toolbar />
      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
      <TableCell align="left">UserID</TableCell>
        <TableCell align="left">User Name</TableCell>
        
        <TableCell align="left">OrderID</TableCell>

        
        <TableCell>Bill</TableCell>
     
        
      </TableRow>
    </TableHead>
    <TableBody>
      {listOrders.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#94e3a6' }}
        >
          <TableCell component="th" scope="row">
            {row.user._id}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.user.name}
          </TableCell>
          <TableCell component="th" scope="row">
            {row._id}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.amount}
          </TableCell>
    
        </TableRow>
      ))}
    </TableBody>
  </Table>
 </TableContainer>
     </Box>
         )}

 
 

{ listUserBoolean   && (
     <Box
     component="main"
     sx={{
       flexGrow: 1,
       p: 3,
       width: { sm: `calc(100% - ${drawerWidth}px)` },
     }}
   >
     <Toolbar />
     <TableContainer component={Paper}>
 <Table sx={{ minWidth: 650 }} aria-label="simple table">
   <TableHead>
     <TableRow style={{background: '#16a085'}}>
       <TableCell style={{color: 'white'}}>User Name</TableCell>
       <TableCell style={{color: 'white'}}>User Email</TableCell>
       <TableCell align="right" style={{color: 'white'}}>Delete</TableCell>
     </TableRow>
   </TableHead>
   <TableBody>
     {users.map((row) => (
       <TableRow
         key={row.name}
         sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#94e3a6' }}
       >
         <TableCell component="th" scope="row">
           {row.name}
         </TableCell>
         <TableCell component="th" scope="row">
           {row.email}
         </TableCell>
         <TableCell align="right"><DeleteIcon style={{color:'red'}} onClick={()=>deleteUser(row._id)}/></TableCell>
       </TableRow>
     ))}
   </TableBody>
 </Table>
</TableContainer>
    </Box>
        )}



    
    </Box>
  );
}

AdminPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  jindow: PropTypes.func,
};

export default AdminPage;
