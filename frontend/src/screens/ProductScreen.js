import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import {Carousel} from 'react-bootstrap'

const ProductScreen = ({ match }) => {
    const product = products.find(p=> p._id === match.params.id)
    
    
    return (
        <>
            <Link className='btn btn-outline-primary my-3' to='/'>
                Go Back
            </Link> 
        
            <Row>
                <Col md = {6}>
                        <Carousel>
                            {product.image.map(Img => (
                                <Carousel.Item interval={1000}>
                                    <Image 
                                        className="d-block w-100 border"  
                                        fluid 
                                        src={Img} 
                                        alt = {product.name}  
                                    />
                                </Carousel.Item> 
                            ))}
                        </Carousel>     
                </Col>
                <Col md = {3}>
                    <ListGroup variant = 'flush'>
                        <ListGroupItem>
                                <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                                <Rating 
                                value={product.rating} 
                                text={`${product.numReviews} reviews`}
                                />
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4>Price: ${product.price}</h4>
                        </ListGroupItem>
                        <ListGroupItem>
                            <p>Description: {product.description}</p>
                        </ListGroupItem>
                    </ListGroup> 
                </Col>
                <Col md = {3}>
                    
                        <Card>
                            <ListGroup variant = 'flush'>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button 
                                        className='btn-block' 
                                        type='button'
                                        disabled={product.countInStock === 0} >
                                            Add to card
                                    </Button>
                                </ListGroupItem>
                            </ListGroup> 
                        </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
