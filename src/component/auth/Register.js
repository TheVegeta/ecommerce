import React, { useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { DispatchContext } from "../../context/app.context";

const initValue = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  name: Yup.string().min(3).max(15).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(12).required(),
});

const Register = ({ history }) => {
  const dispatch = useContext(DispatchContext);

  const handleSubmit = async (formVal) =>
    await axios
      .post("/api/user/register", { payload: formVal })
      .then((res) => dispatch({ type: "auth", data: res.data }))
      .then(() => history.push("/"))
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col md="5">
          <p>Register Form</p>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initValue}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, handleChange, touched, errors }) => {
              return (
                <Form onSubmit={handleSubmit} onChange={handleChange}>
                  <Form.Group>
                    <Form.Control
                      placeholder="name"
                      isInvalid={!!touched.name && !!errors.name}
                      name="name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      placeholder="email"
                      isInvalid={!!touched.email && !!errors.email}
                      name="email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      isInvalid={!!touched.password && !!errors.password}
                      placeholder="password"
                      type="password"
                      name="password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit">Submit</Button>{" "}
                  <Button variant="link" as={Link} to="/auth/login">
                    have account ?
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
