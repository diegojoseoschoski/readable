import _ from "lodash";
import React, { Component } from "react";
import NewPostButton from "./NewPostButton";
import { Button, ButtonToolbar, Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories, getCategoryPosts, fetchPosts } from "../actions";

import { getCategoryColor } from "../utils/ReadableUtils";

class PostCategoriesList extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  loadCategories() {
    const { categories, getCategoryPosts } = this.props;
    if (categories) {
      return _.map(categories, category => {
        return (
          <Link
            to={`/${category.path}`}
            key={category.name}
            onClick={() => getCategoryPosts(category.path)}
          >
            <Button bsStyle={getCategoryColor(category.name)}>
              {category.name}
            </Button>
          </Link>
        );
      });
    }
    return <div>Loading Categories</div>;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={12} md={6}>
            <ButtonToolbar>
              <Link to="/">
                <Button key="all" bsStyle="primary">
                  All
                </Button>
              </Link>
              {this.loadCategories()}
            </ButtonToolbar>
          </Col>
          <Col sm={12} md={6}>
            <div className="pull-right">
              <NewPostButton />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(
  mapStateToProps,
  {
    getCategories,
    fetchPosts,
    getCategoryPosts
  }
)(PostCategoriesList);
