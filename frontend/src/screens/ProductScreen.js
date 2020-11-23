import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


// we destructure inside the function {history,match} it is  :  props.history / props.match

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { 
        success: successProductReview, 
        error: errorProductReview 
    } = productReviewCreate
    


    useEffect(() => {
     if(successProductReview) {
         alert('Review Submitted')
         setRating(0)
         setComment('')
         dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
     }

     dispatch(listProductDetails(match.params.id))
    },[dispatch, match, successProductReview])
    
    const submitHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandlerforReview = (e) => {
        e.preventDefault ()
        dispatch(createProductReview(match.params.id, { 
            rating,
            comment
        }))
    }

    return (
        <>
            <Link className='btn btn-outline-primary my-3' to='/'>
                Go Back
            </Link> 
            {loading ?  <Loader/> : error ? ( 
            <Message variant='danger'>{error}</Message> 
            ) : (
            <>
            <Meta title={product.name}/>
                <Row>
                <Col md = {6}>
                     
                    <Image 
                        className="d-block w-100 border"  
                        fluid 
                        src={product.image} 
                        alt = {product.name}  
                    />
                            
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
            <Row className="review">
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p className='create'>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Review</h2>
                            {errorProductReview && ( 
                            <Message variant='danger'>{errorProductReview}</Message> 
                            )}
                            {userInfo ? (
                                <Form onSubmit={submitHandlerforReview}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control 
                                        as="select" 
                                        value={rating} 
                                        onChange={(e) => setRating(e.target.value)} >
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent </option>
                                        </Form.Control>
                                    </Form.Group>
                                
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                        as='textarea'
                                        row='3'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button
                                    
                                        type='submit'
                                        variant='primary'
                                    >
                                        Submit
                                    </Button>
                                </Form>
                           ) : (
                            <Message>
                              Please <Link to='/login'>sign in</Link> to write a review{' '}
                            </Message>
                          )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
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

