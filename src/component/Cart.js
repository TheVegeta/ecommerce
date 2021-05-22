import React, { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import { AppContext, DispatchContext } from "../context/app.context";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import axios from "axios";

const stripeKey = process.env.REACT_APP_STRIPEKEY;

const RenderCart = ({ product }) => {
  const { _id, name, price, qty, cartQty, image } = product;

  const dispatch = useContext(DispatchContext);

  const handleChange = (e) =>
    dispatch({
      type: "updateCartQty",
      _id,
      cartQty: parseFloat(e.target.value),
    });

  const handleDelet = () => dispatch({ type: "deletCart", _id });

  return (
    <ListGroup.Item>
      <Row>
        <Col className="my-1 my-md-0" md="2">
          <img className="img-fluid" src={image} alt={name} />
        </Col>
        <Col className="my-1 my-md-0" md="3">
          {name}
        </Col>
        <Col className="my-1 my-md-0" md="2">
          {price} Rs
        </Col>
        <Col className="my-1 my-md-0" md="3">
          <Form.Control
            as="select"
            custom
            value={cartQty}
            onChange={handleChange}
          >
            {[...Array(qty)].map((e, i) => {
              return <option key={i + 1}>{i + 1}</option>;
            })}
          </Form.Control>
        </Col>
        <Col md="2">
          <Button onClick={handleDelet} variant="outline-primary border-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const Cart = ({ history }) => {
  const { isLogin, user, cart } = useContext(AppContext);
  const dispatch = useContext(DispatchContext);

  const total = cart
    .reduce((total, val) => total + val.price * val.cartQty, 0)
    .toFixed(2);

  if (cart.length === 0)
    return (
      <Container
        style={{ height: "80vh" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <h6 className="mt-4">your cart is empty</h6>
        </>
      </Container>
    );

  const handleBuy = (token) => {
    if (!isLogin) return history.push("/auth/login");

    axios
      .post("/api/payment", { payload: { token, items: cart } })
      .then((res) => dispatch({ type: "checkOut" }))
      .then(() => history.push("/"))
      .catch((err) =>
        dispatch({
          type: "coustomeError",
          msg: `somthing is wrong in the processing payment. here is your token id: ${token.id}, contect us with email to resolve the issue`,
        })
      );
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="8">
          <ListGroup>
            {cart.map((x) => (
              <RenderCart key={x._id} product={x} />
            ))}
          </ListGroup>
        </Col>
        <Col md="4">
          <ListGroup className="text-center">
            <ListGroup.Item>Total: {total} Rs</ListGroup.Item>
            <ListGroup.Item>
              {isLogin ? (
                <StripeCheckout
                  email={user.email}
                  token={handleBuy}
                  stripeKey={stripeKey}
                  currency="INR"
                  shippingAddress
                  amount={total * 100}
                >
                  <Button>Buy</Button>
                </StripeCheckout>
              ) : (
                <Button onClick={handleBuy}>Buy</Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
