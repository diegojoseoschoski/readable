import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createPost, getCategories } from "../actions";
import {
  renderTextArea,
  renderField,
  renderCategoryField,
  validate
} from "../utils/FormUtils";
import { toast } from "react-toastify";

class NewPost extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
      toast.success("New Post Created!");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Title:" name="title" component={renderField} />
        <Field label="Body:" name="body" component={renderTextArea} />
        <Field
          name="category"
          label="Category:"
          component={field => renderCategoryField(field, this.props)}
        />
        <Field label="Username:" name="author" component={renderField} />

        <Button type="submit" bsStyle="primary">
          Save
        </Button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default reduxForm({
  validate,
  form: "CreatePostForm"
})(
  connect(
    mapStateToProps,
    {
      createPost,
      getCategories
    }
  )(NewPost)
);
