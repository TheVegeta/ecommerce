import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { AppContext, DispatchContext } from "../context/app.context";

const Header = ({ location }) => {
  const { isAdmin, isLogin, cart } = useContext(AppContext);

  const dispatch = useContext(DispatchContext);

  const handleLogout = () => dispatch({ type: "logout" });

  const getLogIn = (
    <Nav.Item>
      <Nav.Link
        as={Link}
        active={
          location.pathname === "/auth/login"
            ? true
            : location.pathname === "/auth/register"
            ? true
            : false
        }
        to="/auth/login"
      >
        Login
      </Nav.Link>
    </Nav.Item>
  );

  const userNav = (
    <>
      <NavDropdown title="Userinfo" className="text-capitalize">
        <NavDropdown.Item as={Link} to="/checkouts">
          checkOuts
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Item>
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      </Nav.Item>
    </>
  );

  const adminNav = (
    <>
      <NavDropdown title="admin" className="text-capitalize">
        <NavDropdown.Item as={Link} to="/admin/payments">
          payments
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/admin/addproduct">
          add product
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/admin/products">
          manage products
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Item>
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      </Nav.Item>
    </>
  );

  return (
    <>
      <Navbar className="container" bg="white" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              active={location.pathname === "/cart" ? true : false}
              as={Link}
              to="/cart"
            >
              Cart ({cart.length})
            </Nav.Link>
            {isAdmin ? adminNav : isLogin ? userNav : getLogIn}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(Header);
