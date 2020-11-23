import React from 'react'
import {Carousel} from 'react-bootstrap'

const CarouselBox = () => {
    return (
        <Carousel className="carousel my-3">
                <Carousel.Item className='Item' interval={1000}>
                    <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1591019479261-1a103585c559?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt="First slide"
                    />
                
                </Carousel.Item>
                <Carousel.Item className='Item'>
                    <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item className='Item'>
                    <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1594966642034-bbf0029a7488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt="Third slide"
                    />
                </Carousel.Item>
        </Carousel>

    )
}

export default CarouselBox


