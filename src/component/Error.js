import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { AppContext, DispatchContext } from "../context/app.context";

const Error = () => {
  const { error } = useContext(AppContext);
  const dispatch = useContext(DispatchContext);

  const { isError, msg, ver } = error;

  const handleClick = () => dispatch({ type: "toggleError" });

  return (
    <Alert
      className="container"
      variant={ver || "danger"}
      show={isError}
      onClose={handleClick}
      dismissible
    >
      {msg || "something went wrong"}
    </Alert>
  );
};

export default Error;
