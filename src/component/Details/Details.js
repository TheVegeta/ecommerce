import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { AppContext, DispatchContext } from "../../context/app.context";
import Loader from "../Loader";

import AddReview from "./AddReview";
import RenderReviews from "./RenderReviews";

const Details = ({ match, history }) => {
  const [info, setInfo] = useState(null);
  const [cartQty, setCartQty] = useState(1);

  const { isLogin } = useContext(AppContext);
  const dispatch = useContext(DispatchContext);

  const id = match.params.id;

  useEffect(() => {
    axios
      .get(`/api/product?id=${id}`)
      .then((res) => setInfo(res.data.product))
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );
  }, [id, dispatch]);

  const reloadPage = async () => {
    await setInfo(null);

    await axios
      .get(`/api/product?id=${id}`)
      .then((res) => setInfo(res.data.product))
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );
  };

  if (info === null) return <Loader />;

  const { _id, name, image, price, info: details, qty, review } = info;

  const handleChange = (e) => setCartQty(e.target.value);

  const handleSubmit = async () => {
    await dispatch({
      type: "addToCart",
      item: { _id, name, image, price, cartQty: parseFloat(cartQty), qty },
    });
    history.push("/cart");
  };

  return (
    <Container>
      <Row>
        <Col md="5">
          <Card.Img loading="lazy" src={image} />
        </Col>
        <Col md="4">
          <ListGroup variant="flush">
            <ListGroup.Item>{name}</ListGroup.Item>
            <ListGroup.Item>Price: {price} Rs</ListGroup.Item>
            <ListGroup.Item as="p">
              Details: <span>{details}</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md="3">
          <ListGroup className="text-center">
            <ListGroup.Item>Price: {price} Rs</ListGroup.Item>
            <ListGroup.Item>
              Status:{" "}
              <span className={qty === 0 ? "text-danger" : undefined}>
                {qty === 0 ? "unavailable" : "available"}
              </span>
            </ListGroup.Item>
            {qty === 0 ? undefined : (
              <ListGroup.Item className="px-5">
                <Form.Control custom as="select" onChange={handleChange}>
                  {[...Array(qty)].map((e, i) => {
                    return <option key={i + 1}>{i + 1}</option>;
                  })}
                </Form.Control>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                onClick={handleSubmit}
                disabled={qty === 0 ? true : false}
                className="w-100"
              >
                Add to cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center my-5">
        <Col md="6">
          <Container>
            <Card.Title>Reviews</Card.Title>
            {review.length !== 0 ? (
              review.map((x) => (
                <ListGroup key={x._id} className="my-3">
                  <RenderReviews
                    review={x}
                    reloadPage={reloadPage}
                    productId={_id}
                  />
                </ListGroup>
              ))
            ) : (
              <Alert variant="primary text-capitalize">No Reviews</Alert>
            )}
          </Container>
        </Col>

        <Col md="6">
          <Container>
            <Card.Title>Add Review</Card.Title>
            {isLogin ? (
              <AddReview id={id} reloadPage={reloadPage} />
            ) : (
              <Alert variant="primary text-capitalize">
                Login to add review
              </Alert>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
