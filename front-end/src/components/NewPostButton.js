import React from "react";
import { Link } from "react-router-dom";
import { Glyphicon } from "react-bootstrap";

const NewPostButton = props => {
  return (
    <div>
      <Link to="/posts/new" className="btn btn-success">
        <Glyphicon glyph="glyphicon glyphicon-plus" />
        {"  "}
        New Post
      </Link>
    </div>
  );
};
export default NewPostButton;
