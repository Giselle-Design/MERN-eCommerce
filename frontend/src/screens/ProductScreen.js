import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Carousel} from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'

// we destructure inside the function {history,match} it is  :  props.history / props.match

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    
    

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    },[dispatch, match])
    
    const submitHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    return (
        <>
            <Link className='btn btn-outline-primary my-3' to='/'>
                Go Back
            </Link> 
            {loading ?  <Loader/> : error ? <Message variant='danger'>{error}</Message> :
            (
                <Row>
                <Col md = {6}>
                        <Carousel>
                                <Carousel.Item interval={1000}>
                                    <Image 
                                        className="d-block w-100 border"  
                                        fluid 
                                        src={product.image} 
                                        alt = {product.name}  
                                    />
                                </Carousel.Item> 
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

                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control 
                                                        as="select" 
                                                        value={qty} 
                                                        onChange={(e)=> setQty(e.target.value)}>
                                                             {[...Array(product.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                        </option>
                                                                ))}
                                                     </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}
                                <ListGroupItem>
                                    <Button 
                                        onClick={submitHandler}
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
            )}
        </>
    )
}

export default ProductScreen



//Note:
// we can use this method to convert number to array.
// [...Array(4).keys()] => [0,1,2,3]
//above we have [...Array(product.countInStock).keys()] here product.countInStock is a number for each object in the data base 
//so we can convert those number to array then loop through it.

