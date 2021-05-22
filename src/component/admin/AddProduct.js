import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { DispatchContext } from "../../context/app.context";

const catagory = ["posters", "books", "accessories"];

const formSchema = {
  name: "",
  info: "",
  price: "",
  qty: "",
  catagory: "accessories",
  image: "",
};

const AddProduct = ({ history }) => {
  const [img, setImg] = useState(null);
  const dispatch = useContext(DispatchContext);

  const formValidation = Yup.object().shape({
    name: Yup.string().min(5).max(25).required(),
    info: Yup.string().min(10).max(350).required(),
    price: Yup.number().min(1).required(),
    qty: Yup.number().min(4).required(),
    catagory: Yup.string()
      .oneOf([...catagory])
      .required(),
    image: Yup.mixed()
      .test(() => {
        if (img) {
          if (img.type === "image/png" || img.type === "image/jpeg")
            return true;
        }
        return false;
      })
      .required(),
  });

  const handleSubmit = (formVal) => {
    const { name, info, price, qty, catagory } = formVal;

    const data = new FormData();
    data.append("name", name);
    data.append("info", info);
    data.append("price", price);
    data.append("qty", qty);
    data.append("catagory", catagory);
    data.append("image", img);

    axios
      .post("/api/admin/products", data)
      .then(() => {
        history.push("/");
      })
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );
  };

  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-center">
        <Col md="4">
          <Formik
            onSubmit={handleSubmit}
            initialValues={formSchema}
            validationSchema={formValidation}
          >
            {({ handleSubmit, handleChange, touched, errors }) => (
              <Form onChange={handleChange} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    isInvalid={!!touched.name && !!errors.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    isInvalid={!!touched.info && !!errors.info}
                    onChange={handleChange}
                    name="info"
                    placeholder="info"
                    as="textarea"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.info}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    isInvalid={!!touched.catagory && !!errors.catagory}
                    onChange={handleChange}
                    custom
                    as="select"
                    name="catagory"
                  >
                    <option value="accessories">accessories</option>
                    <option value="books">books</option>
                    <option value="posters">posters</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.File
                    isInvalid={!!touched.image && !!errors.image}
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                    }}
                    name="image"
                    custom
                    label={img ? img.name : "select file"}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    isInvalid={!!touched.price && !!errors.price}
                    onChange={handleChange}
                    name="price"
                    placeholder="price"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    isInvalid={!!touched.qty && !!errors.qty}
                    onChange={handleChange}
                    name="qty"
                    placeholder="qty"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.qty}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">submit</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
