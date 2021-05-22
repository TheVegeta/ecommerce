import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

import Loader from "./Loader";
import { DispatchContext } from "../context/app.context";

const RenderProduct = ({ history, product }) => {
  const { _id, image, name, price } = product;

  const handleClick = () => history.push(`/product/${_id}`);

  return (
    <Col md="4">
      <Card className="my-3 shadow" onClick={handleClick}>
        <Card.Img loading="lazy" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Title>{price} Rs</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Home = ({ history }) => {
  const [products, setProducts] = useState([]);

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    axios
      .get("/api/product")
      .then((res) => setProducts(res.data.products))
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );
  }, [dispatch]);

  if (products === []) return <Loader />;

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <RenderProduct
            key={product._id}
            product={product}
            history={history}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
