import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const Redirect = ({ history }) => {
  useEffect(() => {
    history.push("/auth/login");
  }, [history]);

  return <></>;
};

export default withRouter(Redirect);
