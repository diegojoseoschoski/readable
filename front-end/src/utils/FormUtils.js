import _ from "lodash";
import { FormGroup, FormControl } from "react-bootstrap";
import React from "react";
import { capitalize } from "../utils/ReadableUtils";

export function renderCategoryField(field, props) {
  const { categories } = props;
  const {
    meta: { touched, error }
  } = field;
  const className = touched && error ? "error" : null;

  return (
    <FormGroup validationState={className}>
      <label>{field.label}</label>
      <select {...field.input} className="form-control">
        <option value="" className="disabled">
          Select Category
        </option>
        {_.map(categories, category => (
          <option key={category.name} value={category.name}>
            {capitalize(category.name)}
          </option>
        ))}
      </select>
      <div className="text-help">
        {field.meta.touched ? field.meta.error : ""}
      </div>
    </FormGroup>
  );
}

export function renderTextArea(field) {
  const {
    meta: { touched, error }
  } = field;
  const className = touched && error ? "error" : null;

  return (
    <FormGroup validationState={className}>
      <label>{field.label}</label>
      <FormControl componentClass="textarea" {...field.input} />

      <div className="text-help">{touched ? error : ""}</div>
    </FormGroup>
  );
}

export function renderField(field) {
  const {
    meta: { touched, error }
  } = field;
  const className = touched && error ? "error" : null;

  return (
    <FormGroup validationState={className}>
      <label>{field.label}</label>
      <FormControl type="text" {...field.input} />
      <div className="text-help">{touched ? error : ""}</div>
    </FormGroup>
  );
}

export function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Title is mandatory!";
  }

  if (!values.author) {
    errors.author = "Name is mandatory!";
  }
  if (!values.category) {
    errors.body = "Category is mandatory!";
  }

  if (!values.body) {
    errors.body = "Content is mandatory!";
  }

  return errors;
}
