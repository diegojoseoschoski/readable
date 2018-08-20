import React, { Component } from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <Grid>
      <Row>
        <Col>
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">
              <Link to="/">
                <Button bsStyle="primary">
                  {" "}
                  <span className="glyphicon glyphicon-home" /> Go Back
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default NotFoundPage;
