import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { DispatchContext } from "../../context/app.context";

import Loader from "../Loader";
import { RenderItems } from "../Payments";

const CheckIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-check"
    viewBox="0 0 16 16"
  >
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
  </svg>
);

const RenderTable = ({ getPayments, no, info }) => {
  const [show, setShow] = useState(false);

  const dispatch = useContext(DispatchContext);

  const toggleShow = () => setShow(!show);

  const { _id, createdAt, amount, isDeliverd } = info;

  const handleClick = async () =>
    await axios
      .post(`/api/admin/payments?id=${_id}`)
      .then(() => getPayments())
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );

  return (
    <>
      <tr>
        <td>{no}</td>
        <td>{_id}</td>
        <td>{createdAt}</td>
        <td>{amount} Rs</td>
        <td>
          <span>
            <Button
              onClick={handleClick}
              variant="outline-primary"
              disabled={isDeliverd}
            >
              {CheckIcon}
            </Button>
          </span>
        </td>
        <td>
          <Button onClick={toggleShow} variant="outline-primary">
            show
          </Button>
        </td>
      </tr>
      <Modal size="lg" show={show} onHide={toggleShow}>
        <Modal.Header closeButton>Item Details</Modal.Header>
        <Modal.Body>
          <Table striped bordered hover className="text-capitalize text-center">
            <thead>
              <tr>
                <th>no</th>
                <th>image</th>
                <th>name</th>
                <th>qty</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {info.items.map((x, i) => (
                <RenderItems key={i} no={i + 1} items={x} />
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

const Payments = () => {
  const [payments, setPayments] = useState(null);

  const dispatch = useContext(DispatchContext);

  const getPayments = () => {
    if (setPayments !== null) {
      setPayments(null);
    }

    return axios
      .get("/api/admin/payments")
      .then((res) => setPayments(res.data.payments))
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );
  };

  useEffect(() => {
    axios
      .get("/api/admin/payments")
      .then((res) => setPayments(res.data.payments))
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );
  }, [dispatch]);

  if (payments === null) return <Loader />;

  if (payments.length === 0)
    return (
      <Container
        style={{ height: "80vh" }}
        className="d-flex justify-content-center align-items-center text-capitalize lead"
      >
        there is no payments yet
      </Container>
    );

  return (
    <Container>
      <Table striped bordered hover className="text-capitalize text-center">
        <thead>
          <tr>
            <th>no</th>
            <th>id</th>
            <th>date</th>
            <th>amount</th>
            <th>Delived</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((x, i) => (
            <RenderTable
              getPayments={getPayments}
              key={x._id}
              no={i + 1}
              info={x}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Payments;
