import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  ButtonGroup,
  Glyphicon
} from "react-bootstrap";
import _ from "lodash";
import { timestampToDate } from "../utils/ReadableUtils";
import {
  getPostComments,
  voteForComment,
  deleteCommentPost,
  getPostCommentsCount
} from "../actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class CommentList extends Component {
  state = {
    commentCount: 0
  };

  componentDidMount() {
    const { getPostComments, postId } = this.props;
    getPostComments(postId);
    this.props.getPostCommentsCount(postId, data => {
      this.setState({ commentCount: data.count });
    });
  }

  deleteComment(id) {
    const {
      deleteCommentPost,
      getPostComments,
      postId,
      getPostCommentsCount
    } = this.props;

    deleteCommentPost(id, () => {
      getPostComments(postId);
      getPostCommentsCount(postId, data => {
        this.setState({ commentCount: data.count });
      });
      toast.success("Comment Deleted!");
    });
  }


  renderCommentsList() {
    const { comments, postCategory } = this.props;
    if (comments) {

      return _.map(comments, (post, id) => {
        return (
          <div key={id} className="media">
            <div className="pull-left">
              <div className="text-center">
                <h3>{post.voteScore}</h3>
                <div className="btn-toolbar mg-l-20">
                  <Button
                    bsStyle="success"
                    onClick={() => voteForComment(post.id, "upVote")}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />{" "}
                  </Button>
                  <Button
                    bsStyle="danger"
                    onClick={() => voteForComment(post.id, "downVote")}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-thumbs-down" />{" "}
                  </Button>
                </div>
              </div>
            </div>
            <div className="media-body mg-l-20">
              <h4 className="media-heading user_name">
                {post.author} -{" "}
                <span>
                  <i className="glyphicon glyphicon-calendar" />{" "}
                  {timestampToDate(post.timestamp)}{" "}
                </span>
              </h4>
              {post.body}
            </div>
            <div className="pull-right">
              <ButtonGroup vertical>
                <Link
                className="btn btn-primary btn-sm"
                to={`/${postCategory}/${post.parentId}/comments/edit/${post.id}`}
                >
                <Glyphicon glyph="glyphicon glyphicon glyphicon-edit" />
                {"  "}
                Edit
              </Link>
              <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => this.deleteComment(post.id)}
                >
                  <Glyphicon glyph="glyphicon glyphicon-trash" /> Delete
                </Button>
              </ButtonGroup>
            </div>
          </div>
        );
      });
    }
    return <h4> No Comments found for this post! </h4>;
  }

  render() {
    const { commentCount } = this.state;
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <div className="page-header">
              <h3>{commentCount ? commentCount : 0} Comments</h3>
            </div>
            <div className="comments-list">{this.renderCommentsList()}</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const comments = _.filter(state.comments.comments, comment => !comment.deleted);
  return { comments };
}


export default connect(
  mapStateToProps,
  {
    getPostComments,
    voteForComment,
    deleteCommentPost,
    getPostCommentsCount
  }
)(CommentList);
