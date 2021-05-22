import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { DispatchContext } from "../../context/app.context";

const initSchema = {
  rating: 1,
  comment: "",
};

const validationSchema = Yup.object({
  rating: Yup.number().min(1).max(5).required(),
  comment: Yup.string().min(10).max(150).required(),
});

const AddReview = ({ id, reloadPage }) => {
  const dispatch = useContext(DispatchContext);

  const handleSubmit = async (formVal) =>
    await axios
      .post(`/api/product/review/${id}`, { payload: formVal })
      .then(() => setTimeout(() => {}, 2000))
      .then(() => reloadPage())
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initSchema}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => (
        <Form onChange={handleChange} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              name="rating"
              value={values.rating}
              onChange={handleChange}
              isInvalid={!!touched.rating && !!errors.rating}
              as="select"
              custom
            >
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 -Very Good</option>
              <option value={5}>5 - Excellent</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.rating}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              value={values.comment}
              onChange={handleChange}
              isInvalid={!!touched.comment && !!errors.comment}
              name="comment"
              as="textarea"
            />
            <Form.Control.Feedback type="invalid">
              {errors.rating}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddReview;
