import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import CarouselBox from './CarouselBox'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'


const HomeScreen = ({match}) => {
    
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
      dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])

  

    return (
        <>
            <Meta/>
            {!keyword ? < CarouselBox/> : <Link to='/' className= 'btn btn-primary go'>Go Back</Link>}
                <h3><i className="fas fa-heart"></i> Popular  Products</h3>
                {loading ? (
                <Loader />
                ): error ? (
                <Message variant='danger'>{error}</Message>
                 ) : (
            <>
                <Row>
                    {products.map( product => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                        <Product product={product} />
                        </Col>
                    ))}
                </Row> 
                <Paginate 
                    pages={pages} 
                    page={page} 
                    keyword={keyword ? keyword : ''} 
                />
            </>
            )}    
        </>
    )
}

export default HomeScreen

