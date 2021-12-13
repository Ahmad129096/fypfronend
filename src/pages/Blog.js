import React, { useEffect } from 'react';
import { Button, Divider, Grid } from "@mui/material";
import MiniBar from '../components/organism/MiniBar';
import NavBar from '../components/organism/NavBar';
import CategoriesItems from '../components/organism/CategoriesItemsList';
import HomePageList from '../components/molecules/HomepageOptionList';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SimpleCard from '../components/atoms/simpleCard';

const BlogPage = () => {

    let [news,setNews] = React.useState([]);
    let admintoken = localStorage.getItem('adminToken');

    let getNews = () => {
        axios
          .get("http://localhost:5000/api/news", {
            headers: {
              Authorization:
                admintoken,
            },
          })
          .then(function (response) {
            setNews(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
    useEffect(()=>{
        getNews();
    },[])

    console.log('yaroo ',news)

    return (
     <Grid container>
         <Grid item md={12}>
             <MiniBar/>
             <NavBar/>
         </Grid>
          {/*  Categories Buttons   */}
      <Grid item md={1}></Grid>

<Grid item md={10}>
  <HomePageList />

  <Divider />
</Grid>

<Grid item md={1}></Grid>
         <Grid item md={12}>
             <br/>
             <br/>
         </Grid>
         <Grid item md={1}></Grid>
         <Grid item md={10}>
        <Typography variant="h5">
        Latest Blogs:
        </Typography>
        <br/>

         {news.map(function (item, i) {
        return (
          <div key={i} style={{ marginTop: "10px" }}>
             <Card >
      <CardMedia
        component="img"
        height="200"
        image={`https://fyptest.blob.core.windows.net/images/${item.cover}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
    </Card>

          </div>
        );
      })}
        
         </Grid>
         <Grid item md={1}></Grid>
     </Grid>
      );
}
 
export default BlogPage;