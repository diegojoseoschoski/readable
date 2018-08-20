import React, { Component } from "react";

import { Link } from "react-router-dom";
import { getCategoryColor, timestampToDate } from "../utils/ReadableUtils";
import { connect } from "react-redux";
import {
  Label,
  Button,
  ButtonGroup,
  Glyphicon,
  Grid,
  Row,
  Col,
  ButtonToolbar
} from "react-bootstrap";

import { voteForPost, deletePost, getPostCommentsCount } from "../actions";
import { toast } from "react-toastify";
class Post extends Component {
  state = {
    commentCount: 0
  };

  componentDidMount() {
    this.props.getPostCommentsCount(this.props.post.id, data => {
      this.setState({ commentCount: data.count });
    });
  }

  deletePost(id) {
    this.props.deletePost(id, () => {
      toast.success("Post Deleted!");
    });
  }

  render() {
    const { post, voteForPost } = this.props;

    return (
      <Grid>
        <Row>
          <Col sm={12} md={12}>
            <div className="well border-1">
              <div className="media">
                <Row>
                  <Col sm={12} md={2}>
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
                  </Col>
                  <Col sm={12} md={10}>
                    <div className="media-body mg-l-20">
                      <Row>
                        <Col sm={12} md={12}>
                          <h3 className="media-heading">{post.title}</h3>
                          <ul className="list-inline list-unstyled">
                            <li>
                              <p className="text-left">By {post.author}</p>
                            </li>

                            <li className="pull-right">
                              {" "}
                              <h4>
                                <Label
                                  bsStyle={getCategoryColor(post.category)}
                                >
                                  {post.category}
                                </Label>
                              </h4>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={12}>
                          <Link to={`${post.category}/${post.id}`}>
                            <p>{post.body}</p>
                          </Link>
                          <ul className="list-inline list-unstyled">
                            <li>
                              <span>
                                <i className="glyphicon glyphicon-calendar" />{" "}
                                {timestampToDate(post.timestamp)}
                              </span>
                            </li>
                            <li>|</li>
                            <li>
                              {" "}
                              <span>
                                <i className="glyphicon glyphicon-comment" />{" "}
                                {this.state.commentCount
                                  ? this.state.commentCount
                                  : 0}{" "}
                                comments
                              </span>
                            </li>
                            <li className="pull-right">
                              <div>
                                <ButtonToolbar>
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
                                      onClick={() => this.deletePost(post.id)}
                                    >
                                      <Glyphicon glyph="glyphicon glyphicon-trash" />{" "}
                                      Delete
                                    </Button>
                                  </ButtonGroup>
                                </ButtonToolbar>
                              </div>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
function mapStateToProps(state, ownProps) {
  const { commentCount } = state.comments;
  return { commentCount };
}
export default connect(
  mapStateToProps,
  {
    voteForPost,
    deletePost,
    getPostCommentsCount
  }
)(Post);
