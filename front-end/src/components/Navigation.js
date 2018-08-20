import React from "react";
import { Link } from "react-router-dom";
import { Navbar} from "react-bootstrap";

const Navigation = props => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand >
          <Link to="/">Readable</Link>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
};

export default Navigation;
