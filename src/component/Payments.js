import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";

import Loader from "./Loader";
import { DispatchContext } from "../context/app.context";

export const RenderItems = ({ no, items }) => {
  const { name, cartQty, image, price } = items;

  return (
    <tr>
      <td>{no}</td>
      <td>
        <img src={image} width="60px" className="img-fluid" alt={name} />
      </td>
      <td>{name}</td>
      <td>{cartQty}</td>
      <td>{price}</td>
    </tr>
  );
};

const RenderTable = ({ no, info }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  const { _id, createdAt, amount, isDeliverd } = info;

  return (
    <>
      <tr>
        <td>{no}</td>
        <td>{_id}</td>
        <td>{createdAt}</td>
        <td>{amount} Rs</td>
        <td>{isDeliverd ? "yes" : "no"}</td>
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
  const [checkOutInfo, setCheckOutInfo] = useState(null);

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    axios
      .get("/api/payment")
      .then((res) => setCheckOutInfo(res.data.paymentInfo))
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );
  }, [dispatch]);

  if (checkOutInfo === null) return <Loader />;

  if (checkOutInfo.length === 0)
    return (
      <>
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
              className="bi bi-wallet2"
              viewBox="0 0 16 16"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
            </svg>
            <h6 className="mt-4">your didn't buy anything yet</h6>
          </>
        </Container>
      </>
    );

  return (
    <Container>
      <Table
        responsive
        striped
        bordered
        hover
        className="text-capitalize text-center"
      >
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
          {checkOutInfo.map((x, i) => (
            <RenderTable key={x._id} no={i + 1} info={x} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Payments;
