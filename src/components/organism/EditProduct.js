import React, { useEffect } from "react";
import PropTypes from "prop-types";
import FileUpload from "../organism/fileUpload";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TextField, Button, Avatar } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import axios from "axios";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import en from '../../locale/eng.json';
import de from "../../locale/de.json"


const EditProduct = (props) => {
  let t = localStorage.getItem('lang') === 'en' ? en : de;
  const [int, setInt] = React.useState(t);
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [collection, setCollection] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [image, setImage] = React.useState();
  const [img, setImg] = React.useState();
  const [description, setDescription] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [stock, setStock] = React.useState("");
  const [imageError, setImageError] = React.useState();
  const [price, setPrice] = React.useState("");
  const [open, setOpen] = React.useState(props.open);
  const [cate, setCate] = React.useState("");
  const [btnBool, setBtnBool] = React.useState(false);
  const [subCategories, setSubCategories] = React.useState([])

  let token = localStorage.getItem("token");

  let getSubCategories = () => {
    axios
      .get("http://localhost:5000/api/subcategories", {
        headers: {
          Authorization:
            token,
        },
      })
      .then(function (response) {
        setSubCategories(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setCate(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  let uploadImage = (e) => {
    console.log(e.target.files);
    if (e.target.files) {
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  const handleChangeShortDescription = (event) => {
    setShortDescription(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeSubCategory = (event) => {
    setSubCategory(event.target.value);
  };

  const handleChangeStock = (event) => {
    setStock(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  console.log(props.id);
  useEffect(() => {
    getSubCategories();
    console.log("re rednered", props);

    axios
      .get(`http://localhost:5000/api/products/${props.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        let row = response.data.data;
        setName(row.name);
        setShortDescription(row.shortDescription);
        setDescription(row.description);
        setPrice(row.price);
        setStock(row.stock);
        setCategory(row.category.name);
        setCate(row.productCollection.name);
        setSubCategory(row.subCategory.name);
        
        console.log("asfaasfsafsafas", row.productCollection.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.open]);

  /*  const handleClickOpen = (row) => {
        setOpen(true);
        setName(row.name);
        setShortDescription(row.shortDescription);
        setDescription(row.description);
        setPrice(row.price);
        setStock(row.stock);
        setCategory(row.category.name);
        setCollection(row.productCollection.name);
    
      };
    */

  console.log(cate.id);
  const handleClose = () => {
    props.setOpen(false);
  };

  let handleSubmit = (event) => {
    console.log("submitted");
    let object = {
      name: name,
      chineseName: "trash",
      shortDescription: shortDescription,
      description: description,
      category: category,
      productCollection: cate,
      price: price,
      stock: stock,
      subCategory: subCategory,
      images: img
    };
    console.log(object);

    axios
      .patch(`http://localhost:5000/api/products/${props.id}`, object, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        enqueueSnackbar("Pet updated successfully!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setTimeout(function () {
          window.location.href = "/vendor";
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography paragraph>{int.edit_pet}</Typography>
          <br />
          <div style={{ display: "flex" }}>
            <FormControl fullWidth>
              <InputLabel id="Collection">{cate}</InputLabel>
              <Select
                labelId="Collection"
                id="Collection"
                value={cate}
                label={`${int.collection}`}
                onChange={handleChange}
                key={Math.random() * (1000 - 9 + 1)}
              >
                {props.collection.map(function (item, i) {
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
            <FormControl fullWidth>
              <InputLabel id="Category">{category}</InputLabel>
              <Select
                labelId="Category"
                id="Category"
                value={category.value}
                label={`${int.category}`}
                onChange={handleChangeCategory}
              >
                {props.categories.map(function (item, i) {
                  return (
                    <MenuItem key={i} value={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* <FormControl fullWidth>
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
            <div style={{ display: "flex", marginTop: 20 }}>
              <TextField
                fullWidth
                name="Name"
                id="Name"
                label={`${int.pet_name}`}
                value={name}
                onChange={handleChangeName}
                style={{ marginRight: "10px" }}
              />

              <FormControl fullWidth>
                <InputLabel id="subCategory">{subCategory}</InputLabel>
                <Select
                  labelId="subCategory"
                  id="subCategory"
                  value={subCategory.value}
                  required={true}
                  label={`${int.subcategory}`}
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
                value={description}
                onChange={handleChangeDescription}
              />
            </div>
            <div style={{ display: "flex", marginTop: 20 }}>
              <TextField
                fullWidth
                name="Price"
                id="Price"
                label={`${int.pet_price}`}
                style={{ marginRight: "10px" }}
                value={price}
                onChange={handleChangePrice}
              />

              <TextField
                fullWidth
                name="Collection"
                id="Collection"
                label={`${int.pet_stock}`}
                value={stock}
                onChange={handleChangeStock}
              />
            </div>
            <div style={{ display: "flex", marginTop: 20 }}>
            <div>
                <FileUpload
                  onChange={uploadImage}
                  setUpBtn={setBtnBool}
                  up={img}
                  setUp={setImg}
                  // success={success}
                />
              </div>
            </div>

            <div style={{ marginTop: 30 }}>
              <Button onClick={handleSubmit}> {int.edit_pet} </Button>
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;
