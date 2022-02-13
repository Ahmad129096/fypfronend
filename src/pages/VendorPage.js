import React from "react";
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
import { TextField, Button, Avatar, Grid } from "@mui/material";
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
import SimpleMap, { MapContainer } from "../components/organism/Map";
import axios from "axios";
import EditProduct from "../components/organism/EditProduct";
import FilesDropzone from "../components/organism/filesDropZone";
import FileUpload from "../components/organism/fileUpload";
import jwtDecode from "jwt-decode";
import { useHistory, NavLink} from 'react-router-dom'
import en from "../locale/eng.json";
import de from "../locale/de.json";
const drawerWidth = 240;

function VendorPage(props) {
  const { jindow } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collection, setCollection] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [users,setUsers] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);

  const [category, setCategory] = React.useState('');
  const [subCategory,setSubCategory] = React.useState('');
  const [name , setName] = React.useState('');
  const [shortDescription , setShortDescription] = React.useState('');
  const [description , setDescription] = React.useState('');
  const [stock , setStock] = React.useState('');
  const [price , setPrice] = React.useState('');
  const [productBoolean,setProductBoolean] = React.useState(false);
  const [listProductBoolean, setListProductBoolean] = React.useState(false);
  const [listCategoriesBoolean, setListCategoriesBoolean] = React.useState(false);
  const [listUserBoolean, setListUserBoolean] = React.useState(false);
  const [newsBoolean, setNewsBoolean] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [newsBooleanList, setNewsBooleanList] = React.useState(false);
  const [ordersBoolean, setOrdersBoolean] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editProduct,setEditProduct] = React.useState([]);
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [image,setImage] = React.useState();
  const [img, setImg] = React.useState();
  const [listNews,setListNews] = React.useState([]);
  const [news, setNews] = React.useState('');
  const [newsDescription,setNewsDescription] = React.useState();
  const [newsCover,setNewsCover] = React.useState();
  const { enqueueSnackbar } = useSnackbar();
  const [listOrders,setListOrders] = React.useState();
  const [infoBool,setInfoBool] = React.useState(true);
  const [vName,setVName] = React.useState('');
  const [phone,setPhone] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [collectionError,setCollectionError] = React.useState();
  const [categoryError,setCategoryError] = React.useState();
  const [productError,setProductError] = React.useState();
  const [subCategoryError,setSubCategoryError] = React.useState();
  const [phoneError, setPhoneError] = React.useState();
  const [descriptionError,setDescriptionError] = React.useState();
  const [priceError,setPriceError] = React.useState();
  const [stockError,setStockError] = React.useState();
  const [imageError,setImageError] = React.useState();
  const [active, setActive] = React.useState('info')
  const history = useHistory()
  let [btnBool, setBtnBool] = React.useState();
  let t = localStorage.getItem('lang') === 'en' ? en : de;
  const [int, setInt] = React.useState(t);


  let mobregex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
  const [delivery,setDelivery] = React.useState('');
  let [vendorImage, setVendorImage] = React.useState();


  const handleVName=(e)=>{
    setVName(e.target.value.replace(/[0-9]/g, ''));
  }

  const handlePhone=(e)=>{
    if(mobregex.test(e.target.value))
    {
      console.log('your email is vaid')
      setPhoneError(true);
    }
    else
    {
      console.log('your email is invaid')
      setPhoneError(false);
    }
    setPhone(e.target.value);
  }


  let handleChangeNews = (e) =>{
    setNews(e.target.value)
  }

  let handleChangeNewsDescription = (e) =>{
    setNewsDescription(e.target.value)
  }

  let handleDelivery = (e) =>{
    setDelivery(e.target.value)
  }


  let uploadState = (e) => {
    setImg(e)
  }

  let uploadImage = (e) => {
    console.log(e.target.files);
    if(e.target.files)
    {
      setImageError(false)
    }
    else
    {
      setImageError(true)
    }
  }




  let vendorToken = localStorage.getItem('token');
  let decode = jwtDecode(vendorToken);
  console.log(decode);
  let handleClickOpen = () =>{
      setOpen(true);
  }


  let getVendor = () =>{
    axios.get(`http://localhost:5000/api/users/${decode._id}`, {headers:{'Authorization':vendorToken}})
    .then(function (response) {
      setEmail(response.data.data.email);
      setVName(response.data.data.name);
      setPhone(response.data.data.phoneNumber);
      setDelivery(response.data.data.cardExpire);
      setVendorImage(response.data.data.appartment);
      setDelivery(response.data.data.city);

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  console.log(vendorImage)
  let saveInfo = (e) =>{
    if(phoneError)
    {
    let obj = {
      name: vName,
      phoneNumber: phone,
      city: delivery
    }
    axios.patch(`http://localhost:5000/api/users/${decode._id}`, obj, {headers:{'Authorization':vendorToken}})
    .then(function (response) {
      enqueueSnackbar('Information updated successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/vendor")
      }, 2000);

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  else
  {
    enqueueSnackbar('Mobile number is incorrect!', {
      variant: 'error',
      autoHideDuration: 2000
    });
  }
e.preventDefault();
  }



  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      axios.patch(`http://localhost:5000/api/users/${decode._id}`,{location},
      {headers: {
        'Authorization': vendorToken,
        'Content-Type': 'application/json',
      }})
      .then((res)=>{
        console.log('updated location');
      })
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }
  

  
  let handleInfo = () => {
    setActive('info');
    setInfoBool(true);
    setProductBoolean(false);
    setListProductBoolean(false);
    setListCategoriesBoolean(false);
    setListUserBoolean(false);
    setNewsBoolean(false);
    setOrdersBoolean(false)
    setNewsBooleanList(false);
}


  let handleProduct = () => {
    setActive('add')
    setInfoBool(false);
      setProductBoolean(true);
      setListProductBoolean(false);
      setListCategoriesBoolean(false);
      setListUserBoolean(false);
      setNewsBoolean(false);
      setOrdersBoolean(false)
      setNewsBooleanList(false);
  }

  let handleListProduct = () => {
    setActive('list')
    setInfoBool(false);
    setProductBoolean(false);
    setListProductBoolean(true);
    setListCategoriesBoolean(false);
    setListUserBoolean(false);
    setNewsBoolean(false);
    setNewsBooleanList(false);
    setOrdersBoolean(false)
}


let handleListCategories = () => {
  setActive("cat")
  setInfoBool(false);
    setProductBoolean(false);
    setListProductBoolean(false);
    setListCategoriesBoolean(true);
    setListUserBoolean(false);
    setNewsBoolean(false);
    setNewsBooleanList(false);
    setOrdersBoolean(false)
}


let handleListUser = () => {
  setInfoBool(false);
    setProductBoolean(false);
    setListProductBoolean(false);
    setListCategoriesBoolean(false);
    setListUserBoolean(true);
    setNewsBoolean(false);
    setOrdersBoolean(false)
    setNewsBooleanList(false);
}

let handleNews = () => {
  setInfoBool(false);
    setProductBoolean(false);
    setListProductBoolean(false);
    setListCategoriesBoolean(false);
    setListUserBoolean(false);
    setNewsBoolean(true);
    setOrdersBoolean(false)
    setNewsBooleanList(false);
}

let handleNewsList = () => {
  setInfoBool(false);
  setProductBoolean(false);
  setListProductBoolean(false);
  setListCategoriesBoolean(false);
  setListUserBoolean(false);
  setNewsBoolean(false);
  setOrdersBoolean(false)
  setNewsBooleanList(true);
}


let handleOrders = () => {
  setInfoBool(false);
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

  const handleChangeSubCategory = (event) => {
    setSubCategory(event.target.value);
  };

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

  console.log(window.location)

  let deleteProduct = (id) => {

    axios
    .delete(`http://localhost:5000/api/products/${id}`,  {
      headers: {
        'Authorization': vendorToken,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      enqueueSnackbar('Pet deleted successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/vendor")
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
        'Authorization': vendorToken,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      enqueueSnackbar('User deleted successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/vendor")
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
        'Authorization': vendorToken,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      enqueueSnackbar('Category deleted successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/vendor")
      }, 2000);

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  let handleSubmit = (event) =>{

    if( name && description )
    {
      console.log('submitted');
      let object = {
          name: name,
          chineseName: 'trash',
          shortDescription: shortDescription,
          description: description,
          category: category,
          productCollection: cate,
          price: price,
          stock: stock,
          subCategory:subCategory,
          cover: 'Image cover',
          specs: ['empty','empty'],
          images: img,
          vendor: decode._id 


      }
      console.log(object);

      axios
      .post("http://localhost:5000/api/products", object,  {
        headers: {
          'Authorization': vendorToken,
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        enqueueSnackbar('Pet added successfully!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        setTimeout(function() {
          history.push("/vendor")
        }, 2000);
  
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else
    {
      enqueueSnackbar('Fill Mandatory Fields!', {
        variant: 'danger',
        autoHideDuration: 2000
      });
    }
     
      event.preventDefault();

  }


  let getNews = () => {
    axios
      .get("http://localhost:5000/api/news", {
        headers: {
          Authorization:
            vendorToken,
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
            vendorToken,
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
            vendorToken,
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
          vendorToken,
        },
      })
      .then(function (response) {
        setCollection(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  let handleStatus = (e,id) =>{
    let obj ={
      status: e.target.value
    }
    axios.patch(`http://localhost:5000/api/orders/${id}`, obj, {headers:{'Authorization':vendorToken}})
    .then(function (response) {
      enqueueSnackbar('Order status updated successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/vendor")
      }, 2000);
     } )
  }

console.log(collection);
  let getCategories = () => {
    axios
      .get("http://localhost:5000/api/categories", {
        headers: {
          Authorization:
            vendorToken
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
            vendorToken,
        },
      })
      .then(function (response) {
        setProducts(response.data.data.filter(d=> d?.user?._id == decode._id));
        console.log("these are pets",response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log("these are pets",products, decode._id)
  console.log(products,'thissis')

  let savePicture = () =>{
    console.log('saving image')
    let obj = {
      appartment: vendorImage[0]
    }
    axios.patch(`http://localhost:5000/api/users/${decode._id}`, obj, {headers:{'Authorization':vendorToken}})
    .then(function (response) {
     console.log('information updated');
     history.push("/vendor")

    })
    .catch(function (error) {
      console.log(error);
    });

  }


  let getSubCategories = () => {
    axios
      .get("http://localhost:5000/api/subcategories", {
        headers: {
          Authorization:
            vendorToken,
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

    if(!vendorToken)
    {
     (()=>{
      history.push("/login")
     })();
    }
    getCollections();
    getCategories();
    getSubCategories();
    getProducts();
    getUsers();
    getNews();
    getOrders();
    getVendor();
    
  }, []);



  let submitNews =()=>{
    if(news && newsDescription && newsCover)
    {
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
          vendorToken,
      },
    })
    .then(function (response) {
      enqueueSnackbar('News added successfully!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        history.push("/vendor")
      }, 2000);

    })
    .catch(function (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        autoHideDuration: 2000
      });
    });
  }
    else
    {
      enqueueSnackbar('Fill Mandatory Fields!', {
        variant: 'error',
        autoHideDuration: 2000
      });
    }
  }
  const activeStyle = {
    color: "red"
  }

 console.log(editProduct)
  const drawer = (
    <div>
    <div style={{marginLeft:50,marginTop:50}}>
    <Avatar src={`https://fyp3.blob.core.windows.net/fyp/${vendorImage}`} style={{width:100, height:100}} />
    <div style={{display:'flex',justifyContent:'start',marginTop:10,marginLeft:5}} >
    {vName}
</div>
    </div>
      <Toolbar />
      <Divider />
      <List onClick={handleInfo} >
      <ListItem style={{cursor:'pointer'}} >
            {active === 'info' ? 
            <ListItemIcon style={activeStyle}>
             {int.update_info}
            </ListItemIcon> : 
            <ListItemIcon>
              {int.update_info}
            </ListItemIcon>}
            <ListItemText  />
          </ListItem>
      </List>
      <List onClick={handleProduct} >
      <ListItem  style={{cursor:'pointer'}}>
            {active === 'add' ? 
            <ListItemIcon style={activeStyle}>
             {int.add_pet}
            </ListItemIcon> : 
            <ListItemIcon>
              {int.add_pet}
            </ListItemIcon>}
            <ListItemText  />
          </ListItem>
      </List>
          <List onClick={handleListProduct}>
          <ListItem style={{cursor:'pointer'}} >
            {active === 'list' ? 
            <ListItemIcon style={activeStyle}>
           {int.list_pet}
            </ListItemIcon> : 
            <ListItemIcon>
             {int.list_pet}
            </ListItemIcon>}
            <ListItemText  />
          </ListItem>
      </List>
        
      <Divider />

    
      {/* <List onClick={handleNewsList}>
          <ListItem>
            <ListItemIcon>
              List News
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
          backgroundColor: 'black'
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
          <Typography style={{width:500}} variant="h6" noWrap component="div">
          {int.vendor_dashboard}
          </Typography>
          <div style={{display:'flex',width:'100%',justifyContent:'flex-end',color:'white'}}>
            <Button  style={{color:'white'}}  onClick={()=>{
              
              history.push("/")
            }}>
             {int.home}
            </Button>
            <Button style={{color:'white'}} onClick={()=>{
              localStorage.clear();
              history.push("/")
            }}>
              {int.logout}
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

  
        <Typography paragraph>Add a Pet</Typography>
        <br />
        <div style={{ display: "flex" }}>
      


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


        </div>
        
        <form onSubmit={handleSubmit}>
          
        <FormControl fullWidth>
            <InputLabel id="Collection">{int.collection}</InputLabel>
            <Select
              labelId="Collection"
              id="Collection"
              value={cate}
              label={`${int.collection}`}
              onChange={handleChange}
              required={true}
            >
              {collection.map(function (item, i) {
                return (
                  <MenuItem key={i} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
     

        <div style={{ display: "flex", marginTop: 20 }}>
      
        <FormControl fullWidth >
            <InputLabel id="Category">{int.category}</InputLabel>
            <Select
              labelId="Category"
              id="Category"
              value={category}
              required={true}
              label={`${int.category}`}
              onChange={handleChangeCategory}
            >
              {categories.map(function (item, i) {
                return (
                  <MenuItem key={i} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          </div>

        <div style={{ display: "flex", marginTop: 20 }}>
          <TextField
            fullWidth
            name="Name"
            id="Name"
            label={`${int.pet_name}`}
            required={true}
            value={name}
            onChange={handleChangeName}
            style={{ marginRight: "10px" }}
          />

<FormControl fullWidth >
            <InputLabel id="subCategory">{int.subCategory}</InputLabel>
            <Select
              labelId="subCategory"
              id="subCategory"
              value={subCategory}
              required={true}
              label={`${int.subCategory}`}
              onChange={handleChangeSubCategory}
            >
              {subCategories.map(function (item, i) {
                return (
                  <MenuItem key={i} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div style={{ display: "flex", marginTop: 20 }}>
          <TextField
            fullWidth
            name="Description"
            id="Description"
            label={`${int.pet_description}`}
            required={true}
            value={description}
            onChange={handleChangeDescription}
          />
        </div>
      
        <div style={{ display: "flex", marginTop: 20 }}>
          <TextField
            fullWidth
            name="Price"
            id="Price"
            label={`${int.collection} (PKR)`}
            style={{ marginRight: "10px" }}
            type="number"
            value={price}
            required={true}
            onChange={handleChangePrice}
          />

          <TextField
            fullWidth
            name="Collection"
            id="Collection"
            type="number"
            label={`${int.pet_stock}`}
            value={stock}
            required={true}
            onChange={handleChangeStock}
          />
        </div>
    
        <div style={{ display: "flex", marginTop: 20 }}>
    
                        <div>
                          <FileUpload
                            onChange={uploadImage}
                            file={image}
                            btn={btnBool}
                            setUpBtn={setBtnBool}
                            up={img}
                            setUp={setImg}
                            temp={image}
                           // success={success}
                          />
                     </div>

        {console.log(img)}
        </div>
      

        <div style={{marginTop:30}}>
        <Button disabled={btnBool} style={{color:'black',border:'1px solid black'}} variant="outlined" type="submit"> {int.add_pet} </Button>
        </div>

        </form>
     
      </Box>
           )}

{ infoBool   && (
          <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Grid container>
          <Grid item md={6} xs={12}>
        <div style={{marginTop:'50px',display:'flex',borderRadius:'9px',padding:10,border:'#44adbd'}}>
        <img style={{margin:'0px auto',maxHeight:600,maxWidth:500,borderRadius:20}}
         src={vendorImage === undefined || '' ? 'https://fyp3.blob.core.windows.net/fyp/photo-1524024973431-2ad916746881.jfif' : 
         `https://fyp3.blob.core.windows.net/fyp/${vendorImage}`}/>
        </div>
            
    <div style={{display:'flex'}}>
      <div style={{margin:'0px auto'}}>
      <FileUpload 
        up={vendorImage}
        setUpBtn={setBtnBool}
        setUp={setVendorImage}
        temp={vendorImage}
        savePicture={savePicture}
       // success={success}
      />
      </div>
 </div>
        </Grid>
          <Grid item md={6} xs={12}>
        <div style={{marginTop:'60px',marginLeft:'30px',marginRight:'30px'}}>
          <form onSubmit={saveInfo}>
        <div style={{ display: "flex", marginTop: 30 }}>
        <TextField
            style={{cursor:'not-allowed !important'}}
            disabled={true}
            fullWidth
            name="Email"
            id="Email"
            label={`${int.email}`}
            value={email}
          />
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
        <TextField
            fullWidth
            name="Name"
            id="Name"
            label={`${int.name}`}
            required={true}
            value={vName}
            onChange={handleVName}
          />
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
        <TextField
            fullWidth
            name="Mobile"  
            required={true }
            id="phone"
            label={`${int.phone}`}
            type="number"
            value={phone}
            onChange={handlePhone}
          />
        </div>
        {phoneError == false ? <div style={{color:'red',marginTop:10}}>Incorrect Mobile Number.</div>:<div></div>}
        <div style={{ display: "flex", marginTop: 30 }}>
        <TextField
            fullWidth
            name="Delivery"
            id="Delivery"
            label="City"
            value={delivery}
            onChange={handleDelivery}
          />
        </div> 
        <div style={{ display: "flex", marginTop: 30 }}>
        <Button type="submit" style={{backgroundColor:'black',color:'white',width:'100px'}} >Save</Button>
        </div>
        </form>
        </div>
        </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6}>
       
            </Grid>
            <Grid item md={6} style={{marginTop:20}}>
            <div style={{display:'flex',marginBottom:20}}>
  <button onClick={getLocation}>Get Location</button>
   <p>{status}</p>
  {lat && <p>Latitude: {lat}</p>}
  {lng && <p>Longitude: {lng}</p>}
        </div>
            <SimpleMap lat={lat} lng={lng}/>
            </Grid>
          </Grid>
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
        <TableHead>
          <TableRow>
            <TableCell>{int.pet_name}</TableCell>
            <TableCell align="right">{int.edit}</TableCell>
            <TableCell align="right">{int.delete}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right"><EditIcon  onClick={()=>handleClickOpen()}/> 
              {open ? <EditProduct id={row._id} open={open} collection={collection} subCategory={subCategory} categories={categories} setOpen={setOpen} /> : null }
              </TableCell>
              <TableCell align="right"><DeleteIcon onClick={()=>deleteProduct(row._id)}/></TableCell>
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
     <TableRow>
       <TableCell>{int.user_name}</TableCell>
       <TableCell align="right">Delete</TableCell>
     </TableRow>
   </TableHead>
   <TableBody>
     {users.map((row) => (
       <TableRow
         key={row.name}
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
       >
         <TableCell component="th" scope="row">
           {row.name}
         </TableCell>
         <TableCell align="right"><DeleteIcon onClick={()=>deleteUser(row._id)}/></TableCell>
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
       <form onSubmit={submitNews}>
     <div style={{ display: "flex", marginTop: 20 }}>
          <TextField
            fullWidth
            name="News"
            id="News"
            label={`${int.news_title}`}
            value={news}
            required={true}
            onChange={handleChangeNews}
            
            
          />
          
        </div>
        <div style={{ display: "flex", marginTop: 20 }}>
        <TextField
            fullWidth
            name="newsDescription"
            id="newsDescription"
            label={`${int.news_description}`}
            value={newsDescription}
            required={true}
            onChange={handleChangeNewsDescription}

          />
        </div>
   
        <div style={{ display: "flex", marginTop: 20 }}>
    
    <div>
      <FileUpload
        up={newsCover}
        setUpBtn={setBtnBool}
        setUp={setNewsCover}
        temp={newsCover}
       // success={success}
      />
 </div>
</div>
<Button variant="outlined"  style={{marginTop:10}} type="submit">Add News</Button>
</form>
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
        <TableCell>{int.news_title}</TableCell>
        
      </TableRow>
    </TableHead>
    <TableBody>
      {listNews.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
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
        <TableCell>Delivery</TableCell>
     
        
      </TableRow>
    </TableHead>
    <TableBody>
      {listOrders.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
          <TableCell component="th" scope="row">
            <select onChange={(e)=>handleStatus(e,row._id)} >
              <option value={row?.status}>{row.status == "Unpaid" ? "Dispatched": row.status || 'Dispatched'} </option>
              <option value="Delivered">Delivered</option>
            </select>
          </TableCell>
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
      <TableRow>
        <TableCell>{int.category_name}</TableCell>
        <TableCell align="right">{int.edit}</TableCell>
        <TableCell align="right">{int.delete}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {categories.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right"><EditIcon /> </TableCell>
          <TableCell align="right"><DeleteIcon onClick={()=>deleteCategory(row._id)}/></TableCell>
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
     <TableRow>
       <TableCell>User Name</TableCell>
       <TableCell align="right">Delete</TableCell>
     </TableRow>
   </TableHead>
   <TableBody>
     {users.map((row) => (
       <TableRow
         key={row.name}
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
       >
         <TableCell component="th" scope="row">
           {row.name}
         </TableCell>
         <TableCell align="right"><DeleteIcon onClick={()=>deleteUser(row._id)}/></TableCell>
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

VendorPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  jindow: PropTypes.func,
};

export default VendorPage;
