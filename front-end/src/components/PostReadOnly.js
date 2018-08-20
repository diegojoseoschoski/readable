import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCategoryColor, timestampToDate } from "../utils/ReadableUtils";
import { Label, Button, ButtonGroup, Glyphicon } from "react-bootstrap";
import { voteForPost, deletePost } from "../actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class PostReadOnly extends Component {
  deletePost() {
    const { post, history } = this.props;
    this.props.deletePost(post.id, () => {
      history.push("/");
      toast.success("Post Deleted!");
    });
  }
  render() {
    const { post, voteForPost} = this.props;
    return (
      <div className="well">
        <h2 className="media-heading">{post.title}</h2>
        <ul className="list-inline list-unstyled">
          <li>
            <p className="text-left">By {post.author}</p>
          </li>
          <li>| </li>
          <li>
            <span>
              <i className="glyphicon glyphicon-calendar" />{" "}
              {timestampToDate(post.timestamp)}{" "}
            </span>
          </li>
          <li>|</li>
          <li>
            Category:{" "}
            <span>
              <Label bsStyle={getCategoryColor(post.category)}>
                {post.category}
              </Label>
            </span>
          </li>
          <li />
        </ul>

        <div className="media">
          <div className="pull-left" href="#">
            <div className="text-center">
              <h3>{post.voteScore}</h3>
              <div className="btn-toolbar mg-l-20">
                <Button
                  bsStyle="success"
                  onClick={() => voteForPost(post.id, "upVote")}
                >
                  <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />{" "}
                </Button>
                <Button
                  bsStyle="danger"
                  onClick={() => voteForPost(post.id, "downVote")}
                >
                  <Glyphicon glyph="glyphicon glyphicon-thumbs-down" />{" "}
                </Button>
              </div>
            </div>
          </div>
          <div className="media-body mg-l-20">
            <p>{post.body}</p>
          </div>
        </div>
        <div className="pull-right">
          <ButtonGroup>
            <Link
              className="btn btn-primary btn-sm"
              to={`/${post.category}/edit/${post.id}`}
            >
              <Glyphicon glyph="glyphicon glyphicon glyphicon-edit" />
              {"  "}
              Edit
            </Link>
            <Button
              className="btn btn-danger btn-sm"
              onClick={this.deletePost.bind(this)}
            >
              <Glyphicon glyph="glyphicon glyphicon-trash" /> Delete
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    deletePost,
    voteForPost
  }
)(PostReadOnly);
