import React from 'react';
import { Card, Row,Col, Image, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import products from '../../products';
import Rating from '../rating';
const ProductSceen = () => {
    console.log();
    const pid = useParams().id
    const  product  = products.find(p=>p._id == pid);
    console.log(product);

    return ( 
        <> 
        <Link to="/" className='p-3'>
        <span>
            <i className="fa fa-arrow-left p-2 mb-2" aria-hidden="true"></i>
        </span>
            
           <span>
                Back to products
           </span> 
        </Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating 
                            value={product.rating} 
                            text={`Avarage: ${product.rating} from ${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>${product.price}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {product.description}
                    </ListGroup.Item>
                </ListGroup>
            
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Order</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <button className="btn btn-primary" 
                                disabled={product.countInStock<=0}>Add to Cart</button>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <>{product.countInStock>0?'': 'Out of Stock'}</>
                        </ListGroup.Item>


                    </ListGroup>


                </Card>
            </Col>
        </Row>
 

        </>
     );
}
 
export default ProductSceen;