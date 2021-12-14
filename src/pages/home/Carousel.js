import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel} from 'react-bootstrap'
import cat from '../../assets/cat1.jpg'
import kit from '../../assets/1.jpg'
import kit1 from '../../assets/catdog.jpg'
import puppy from '../../assets/puppy.jpg'

let DemoCarousel = () =>{

        return (
            <Carousel fade style={{ height: 640, width: 900, margin: 'auto', alignContent:'center'}} >
            <Carousel.Item >
              <img
                className="d-block "
                src={cat}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item >
              <img
                className="d-block "
                src={kit}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item >
              <img
                className="d-block"
                src={kit1}
                alt="Third slide"
              />
          
            </Carousel.Item>
            <Carousel.Item >
              <img
                className="d-block "
                src={puppy}
                alt="Third slide"
              />
          
            </Carousel.Item>

          </Carousel>
          
        );
    
}

export default DemoCarousel;


// src="https://fyptest1.blob.core.windows.net/images/photo-1524024973431-2ad916746881.jfif"

// src="https://fyptest1.blob.core.windows.net/images/download.jpg"

// src="https://fyptest1.blob.core.windows.net/images/1.2.jpg"