import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import Loader from "../Loader";

import { DispatchContext } from "../../context/app.context";

const EditIcons = (
  <Button variant="outline-primary">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-pencil-square"
      viewBox="0 0 16 16"
    >
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
      <path
        fillRule="evenodd"
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
      />
    </svg>
  </Button>
);

const DeleteIcons = (
  <Button variant="outline-danger">
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
);

const RenderProducts = ({ history, getItems, no, product }) => {
  const dispatch = useContext(DispatchContext);

  const { _id, name, image } = product;

  const handleDelete = async () =>
    await axios
      .delete(`/api/admin/products?id=${_id}`)
      .then(() => getItems())
      .catch((err) =>
        dispatch({ type: "axiosError", data: err.response.data })
      );

  const handleEdite = () => history.push(`/admin/products/${_id}`);

  return (
    <tr>
      <td>{no}</td>
      <td>
        <img src={image} alt={name} width="60px" className="img-fluid" />
      </td>
      <td>{name}</td>
      <td>
        <span className="mx-2" onClick={handleEdite}>
          {EditIcons}
        </span>
        <span className="mx-2" onClick={handleDelete}>
          {DeleteIcons}
        </span>
      </td>
    </tr>
  );
};

const ManageProduct = ({ history }) => {
  const [products, setProducts] = useState([]);

  const getItems = () =>
    axios
      .get("/api/admin/products")
      .then((res) => setProducts(res.data.products));

  useEffect(() => {
    getItems();
  }, []);

  if (products.length === 0) return <Loader />;

  return (
    <Container>
      <Table striped bordered hover className="text-capitalize text-center">
        <thead>
          <tr>
            <th>no</th>
            <th>image</th>
            <th>name</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((x, i) => (
            <RenderProducts
              history={history}
              key={x._id}
              no={i + 1}
              product={x}
              getItems={getItems}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageProduct;
