import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

let DemoCarousel = () =>{

        return (
            <Carousel
            autoPlay={true}
            showArrow={true} 
            showThumbs={false}>
                <div>
                    <img style={{maxHeight:600,padding:5,borderRadius:'30px'}} src="https://fyptest.blob.core.windows.net/images/photo-1524024973431-2ad916746881.jfif" />

                </div>
                <div>
                    <img style={{maxHeight:600,padding:5,borderRadius:'30px'}} src="https://fyptest.blob.core.windows.net/images/download.jpg" />

                </div>
                <div>
                    <img style={{maxHeight:600,padding:5,borderRadius:'30px'}} src="https://fyptest.blob.core.windows.net/images/1.2.jpg" />

                </div>
            </Carousel>
        );
    
}

export default DemoCarousel;