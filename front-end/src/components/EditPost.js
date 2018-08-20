import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { FormGroup, Button} from "react-bootstrap";
import { connect } from "react-redux";
import { editPost, fetchPost, getCategories } from "../actions";
import {
  renderTextArea,
  renderField,
  renderCategoryField,
  validate
} from "../utils/FormUtils";
import { toast } from "react-toastify";
class EditPost extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.match.params.id);
    this.props.getCategories();
  }

  componentDidMount() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.props.post) {
      const loadInitData = {
        title: this.props.post.title,
        body: this.props.post.body,
        author: this.props.post.author,
        category: this.props.post.category
      };
      this.props.initialize(loadInitData);
    }
  }

  onSubmit(values) {
    const {
      editPost,
      match: {
        params: { id }
      },
      history
    } = this.props;

    editPost(id, values, () => {
      history.push("/");
      toast.success("Post Updated!");
    });
  }

  render() {
    const {
      handleSubmit,
      post,
      match: {
        params: { category }
      }
    } = this.props;

    return !post || post.category !== category ? (
      <h4> Register not found </h4>
    ) : (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Title:" name="title" component={renderField} />
        <Field label="Body:" name="body" component={renderTextArea} />

        <Field
          name="category"
          label="Category:"
          component={field => renderCategoryField(field, this.props)}
        />
        <FormGroup>
          <Field label="Username:" name="author" component={renderField} />
        </FormGroup>
        <Button type="submit" bsStyle="primary">
          Update
        </Button>
        <Link to={"/"} className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id],
    categories: state.categories
  };
}

export default reduxForm({
  validate,
  form: "PostEditForm"
})(
  connect(
    mapStateToProps,
    { editPost, fetchPost, getCategories }
  )(EditPost)
);
