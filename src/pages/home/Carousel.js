import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel} from 'react-bootstrap'
import cat from '../../assets/cat1.jpg'
import kit from '../../assets/1.jpg'
import kit1 from '../../assets/catdog.jpg'
import puppy from '../../assets/puppy.jpg'
// /import './crousel.css'

let DemoCarousel = () =>{

        return (
            <Carousel fade style={{margin: 'auto',height: 640,
            width: 900}} >
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


// src="https://fyp3.blob.core.windows.net/fyp/photo-1524024973431-2ad916746881.jfif"

// src="https://fyp3.blob.core.windows.net/fyp/download.jpg"

// src="https://fyp3.blob.core.windows.net/fyp/1.2.jpg"