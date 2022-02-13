import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

let DemoCarousel = (props) =>{
    let {image} = props;
        return (
            <Carousel
            showArrow={true} 
            
            showThumbs={true}>
                {
                    image?.map((t)=>(
                        <div>
                        <img style={{maxHeight:600,padding:5,borderRadius:'30px'}} src={`https://fyp3.blob.core.windows.net/fyp/${t}`} />
    
                    </div>
                    ))
                }
       
    
            </Carousel>
        );
    
}

export default DemoCarousel;