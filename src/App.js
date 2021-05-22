import React from "react";
import Routes from "./Routes";
import Error from "./component/Error";
import Header from "./component/Header";

const App = () => {
  return (
    <>
      <Header />
      <Error />
      <Routes />
    </>
  );
};

export default App;
