import React from 'react'
import products from '../products'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import CarouselBox from './CarouselBox'

const HomeScreen = () => {
    return (
        <>
            < CarouselBox/>
                <h3><i className="fas fa-heart"></i> Popular  Products</h3>
                    <Row>
                        {products.map( product => (
                            <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                            </Col>
                        ))}
                    </Row>   
        </>
    )
}

export default HomeScreen

