import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { addToCart } from "../../actions/cartActions";
import Message from "../message";
import './cartScreen.css'
const CartScreen = () => {
  const pid = useParams().id;
  const location = useLocation();
  console.log("location", location);
  // const qty = new URLSearchParams(location.search).get('qty');

  const { search } = useLocation();
  const qty = search ? Number(search.split("=")[1]) : 1;
  console.log("qty", qty);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (pid) {
      dispatch(addToCart(pid, qty));
    }
  }, [dispatch, pid, qty]);
  console.log(cartItems);
  const removeFromCart = (id) => {
    console.log(`remove ${id}`);
  };
  const checkoutHandler = () => {
    console.log(`checkoutHandler `);
  };
  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Empty Cart <Link to="/">Home</Link>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map((item) => {
              return (
                <Row key={item.product}>
                  {/* { JSON.stringify(item)} */}
                  <Col>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col>
                    <Link to={`product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        //calling add to cart
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    $ {item.price}
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      className="danger"
                      onClick={() => removeFromCart(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroupItem>
            <Col  className="text-center">
                <h2>
                    order summery
                </h2>
                
            </Col>
            <Col>subtotal (
                {
                    cartItems.reduce((acc, item) => acc + item.qty, 0)
                }
            ) items</Col>
          </ListGroupItem>
          <ListGroupItem>
            <Col className='font-bold'>
                total $ 
                {
                    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
                }

            </Col>
          </ListGroupItem>
          <listGroupItem>
            <Col md={12} className='text-center'>
            <Button  
                className="btn-block" 
                type="button" 
                disabled={cartItems.length<=0} 
                onClick={checkoutHandler}>
                proceed to checkout
            </Button>
            </Col>
          </listGroupItem>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
