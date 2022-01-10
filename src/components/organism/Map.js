import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AnyReactComponent = ({ text }) => <div>
  <ShoppingCartIcon/>
  </div>;

let SimpleMap = (props) => {

  React.useLayoutEffect(()=>{

  },[props])


  let obj = {
    center: {
      lat: props.lng || 31.460557,
      lng: props.lng || 74.376806
    },
    zoom: 10
  };



    console.log('this is good',props.lat,props.lng)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys='AIzaSyCf4hHyHI2kD1nOPc97RhlkkNwIpY35DQQ'
          defaultCenter={obj.center}
          defaultZoom={obj.zoom}
        >
          <AnyReactComponent
            lat={props.lat ? props.lat : 59.955413}
            lng={props.lng ? props.lng : 30.337844}

          />
          
        </GoogleMapReact>
      </div>
    );
  }


export default SimpleMap;