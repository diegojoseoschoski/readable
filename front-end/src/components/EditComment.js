import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchCommentPost, editPostComment } from "../actions";
import { renderField } from "../utils/FormUtils";
import { toast } from "react-toastify";

class EditComment extends Component {

  componentWillMount() {
    this.props.fetchCommentPost(this.props.match.params.id);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    if (this.props.comment) {
      const initData = {
        body: this.props.comment.body,
        author: this.props.comment.author
      };
      this.props.initialize(initData);
    }
  }

  onSubmit(values) {
    const { category, postId, id } = this.props.match.params;
    this.props.editPostComment(id, values, () => {
      this.props.history.push(`/${category}/${postId}`);
      toast.success("Comment Updated!");
    });
  }

  render() {
    const {
      handleSubmit,
      match: {
        params: { category, postId }
      }
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Username:" name="author" component={renderField} />
        <Field label="Comment:" name="body" component={renderField} />
        <Button type="submit" bsStyle="primary">
          Update
        </Button>
        <Link to={`/${category}/${postId}`} className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.author) {
    errors.author = "Name is mandatory!";
  }

  if (!values.body) {
    errors.body = "Comment is mandatory!";
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return { comment: state.comments.comments[ownProps.match.params.id] };
}

export default reduxForm({
  validate,
  form: "UpdateCommentForm"
})(
  connect(
    mapStateToProps,
    {
      fetchCommentPost,
      editPostComment
    }
  )(EditComment)
);
