import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import { AppContext, DispatchContext } from "../../context/app.context";
import Loader from "../Loader";

const catagory = ["posters", "books", "accessories"];

const EditPeoduct = ({ history, match }) => {
  const dispatch = useContext(DispatchContext);

  const { token } = useContext(AppContext);

  const [data, setData] = useState();
  const [img, setImg] = useState(null);

  const id = match.params.id;

  useEffect(() => {
    axios.get(`/api/product?id=${id}`).then((res) => {
      setData(res.data.product);
    });
  }, [id, dispatch]);

  const formSchema = data;

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
        if (formSchema && formSchema.image) {
          return true;
        } else if (img) {
          if (img.type === "image/png" || img.type === "image/jpeg")
            return true;
        }
        return false;
      })
      .required(),
  });

  const handleSubmit = async (formVal) => {
    const { name, info, price, qty, catagory } = formVal;

    let newImage = data.image;

    if (img !== null) {
      const data = new FormData();
      data.append("key", process.env.REACT_APP_IMGBB);
      data.append("image", img);

      delete axios.defaults.headers.common["Authorization"];

      await axios({
        method: "POST",
        url: "https://api.imgbb.com/1/upload",
        data: data,
        headers: {},
      })
        .then(
          (res) =>
            (newImage = res.data.data.medium.url || res.data.data.image.url)
        )
        .catch((err) =>
          dispatch({ type: "axiosError", data: err.response.data })
        );
    }

    axios.defaults.headers.common["Authorization"] = token;

    return axios
      .post("/api/admin/products/update", {
        payload: {
          id: data._id,
          name,
          info,
          price,
          qty,
          catagory,
          image: newImage,
        },
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );
  };

  if (data === undefined) {
    return <Loader />;
  }

  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-center">
        <Col md="4">
          <Formik
            onSubmit={handleSubmit}
            initialValues={formSchema}
            validationSchema={formValidation}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => {
              return (
                <Form onChange={handleChange} onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Control
                      isInvalid={!!touched.name && !!errors.name}
                      onChange={handleChange}
                      value={values.name}
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
                      value={values.info}
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
                      value={values.catagory}
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
                      label={img ? img.name : formSchema.name}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      isInvalid={!!touched.price && !!errors.price}
                      onChange={handleChange}
                      value={values.price}
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
                      value={values.qty}
                      name="qty"
                      placeholder="qty"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.qty}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit">submit</Button>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPeoduct;
