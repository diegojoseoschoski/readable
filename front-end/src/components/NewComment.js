import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  createPostComment,
  getPostComments,
  getPostCommentsCount
} from "../actions";
import { renderField } from "../utils/FormUtils";
import { toast } from "react-toastify";

class NewComment extends Component {
  onSubmit(values) {
    const { category, id } = this.props.match.params;
    this.props.createPostComment(values, id, () => {
      this.props.history.push(`/${category}/${id}`);
      toast.success("New Comment Created!");
    });
  }

  render() {
    const {
      handleSubmit,
      match: {
        params: { category, id }
      }
    } = this.props;

    return (
      <div>
        <div className="well">
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            className="clearfix"
          >
            <div className="col-md-12 form-group">
              <Field label="Username: " name="author" component={renderField} />
            </div>

            <div className="col-md-12 form-group">
              <Field label="Comment:" name="body" component={renderField} />
            </div>

            <div className="col-md-12 form-group text-right">
              <Button type="submit" bsStyle="primary">
                Save
              </Button>
              <Link to={`/${category}/${id}`} className="btn btn-danger">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
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

export default reduxForm({
  validate,
  form: "CreateCommentForm"
})(
  connect(
    null,
    {
      createPostComment,
      getPostComments,
      getPostCommentsCount
    }
  )(NewComment)
);
