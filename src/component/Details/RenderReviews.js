import axios from "axios";
import React, { useContext } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

import { AppContext, DispatchContext } from "../../context/app.context";

const RenderReviews = ({ reloadPage, productId, review }) => {
  const { user } = useContext(AppContext);
  const { email } = user;

  const dispatch = useContext(DispatchContext);

  const handleDelete = async () =>
    await axios
      .delete(`/api/product/review/${productId}/${review._id}`)
      .then(() => reloadPage())
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );

  return (
    <ListGroup.Item>
      <Card.Body>
        <Card.Text className="my-1">user: {review.user}</Card.Text>
        <Card.Text className="my-1">Rating: {review.rating}</Card.Text>
        <Card.Text className="my-1">Review: {review.comment}</Card.Text>
        {email === review.email ? (
          <Button onClick={handleDelete} className="my-1" variant="danger">
            delete
          </Button>
        ) : undefined}
      </Card.Body>
    </ListGroup.Item>
  );
};

export default RenderReviews;
