import React from "react";
import SimpleCard from "../atoms/simpleCard";
import axios from 'axios';

const SideList = () => {

  let token = localStorage.getItem('token');
  const [products,setProducts] = React.useState([]);
  const [topRated,setTopRated] = React.useState([]);
  const [product, setProduct] = React.useState([])
  let productTwo = []
  let getProducts = () =>{
    axios.get('http://localhost:5000/api/products', {headers:{'Authorization':token}})
    .then(function (response) {
      if(response.data.data.length > 3)
      {
        for(let i=0 ; i< response.data.data.length-3  ; ++i)
        {
          response.data.data.pop();
         
        }

        productTwo[0] = response.data.data[0];
        productTwo[1] = response.data.data[1];
        setProduct(...product,productTwo)
      }
      setProducts(response.data.data);
   
     var result = response.data.data.filter(function(event) {
      return  event.productCollection.name == 'Top Rated'; 

  });

  console.log(result);
  console.log(productTwo);

      setTopRated(response.data.data.filter(product=> product.productCollection.name === 'Top Rated'))
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  React.useEffect(()=>{
    getProducts();

  },[])

  let arr = products.filter((product)=> product?.productCollection?.name == 'Tling' || 'Top Price');
  arr.pop();

  

  console.log(products,'toptoptpotoptpo')

/*  let array = [
    {
      type: "Construction Machinery",
      image:
        "https://vlogmakelaarsstorage.blob.core.windows.net/test/66a44799-8e0a-43e6-a69b-fc599c2e2412.png?sv=2018-03-28&ss=b&srt=sco&sp=racwdl&st=2021-10-28T19%3A54%3A25Z&se=2021-10-28T20%3A09%3A25Z&spr=https%2Chttp&sig=suYMPNpOKeuyX4kTU485N434fVIpyJN5C3ncanPoynE%3D",
    },
    {
      type: "Bike",
      image:
        "https://vlogmakelaarsstorage.blob.core.windows.net/test/66a44799-8e0a-43e6-a69b-fc599c2e2412.png?sv=2018-03-28&ss=b&srt=sco&sp=racwdl&st=2021-10-28T19%3A54%3A25Z&se=2021-10-28T20%3A09%3A25Z&spr=https%2Chttp&sig=suYMPNpOKeuyX4kTU485N434fVIpyJN5C3ncanPoynE%3D",
    },
    {
      type: "Heavy Machinery",
      image:
        "https://vlogmakelaarsstorage.blob.core.windows.net/test/66a44799-8e0a-43e6-a69b-fc599c2e2412.png?sv=2018-03-28&ss=b&srt=sco&sp=racwdl&st=2021-10-28T19%3A54%3A25Z&se=2021-10-28T20%3A09%3A25Z&spr=https%2Chttp&sig=suYMPNpOKeuyX4kTU485N434fVIpyJN5C3ncanPoynE%3D",
    },
  ];*/
  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      {product.map(function (item, i) {
        return (
          <div key={i} style={{ marginTop: "10px" }}>
         <SimpleCard type={item?.category?.name || ''} image={`https://fyptest.blob.core.windows.net/images/${item.images[0]}`} />
          </div>
        );
      })}
    </div>
  );
};

export default SideList;
