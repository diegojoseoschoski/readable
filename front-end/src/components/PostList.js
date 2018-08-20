import React from "react";
import _ from "lodash";
import Post from "./Post";
import PostCategoriesList from "./PostCategoriesList";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import {
  fetchPosts,
  voteForPost,
  deletePost,
  getCategoryPosts,
  postSortOrder
} from "../actions";

class PostList extends React.Component {
  componentWillMount() {
    if (this.props.match.params.category) {
      const {
        getCategoryPosts,
        match: {
          params: { category }
        }
      } = this.props;
      getCategoryPosts(category.toLowerCase());
    } else {
      this.props.fetchPosts();
    }
  }

  loadPosts() {
    const { posts } = this.props;

    if (posts.length === 0) {
      return (
        <div>
          <h4>No posts found for the category!</h4>
        </div>
      );
    }

    if (posts) {
      const orderedPosts = _.sortBy(posts, this.props.postsOrder).reverse();
      return _.map(orderedPosts, post => <Post key={post.id} post={post} />);
    }
  }

  render() {
    const { postSortOrder } = this.props;
    return (
      <div>
        <Grid>
          <Row>
            <Col sm={12} md={8}>
              <h4>Categories</h4>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              <PostCategoriesList />
            </Col>
          </Row>
          <Row>
            <Col sm={6} md={6} />

            <Col sm={6} md={6}>
              <div className="pull-right">
                <select
                  id="post-filter"
                  className="form-control"
                  onChange={event => postSortOrder(event.target.value)}
                >
                  <option value="voteScore">Top Score</option>
                  <option value="timestamp">Most Recent</option>
                </select>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              {this.loadPosts()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const posts = _.filter(state.posts, post => !post.deleted);
  const { postsOrder } = state;
  return { posts, postsOrder };
}
export default connect(
  mapStateToProps,
  {
    voteForPost,
    deletePost,
    fetchPosts,
    getCategoryPosts,
    postSortOrder
  }
)(PostList);
