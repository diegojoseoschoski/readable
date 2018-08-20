import React, { Component } from "react";
import CommentList from "./CommentList";
import PostReadOnly from "./PostReadOnly";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { fetchPost, deletePost, getPostCommentsCount } from "../actions";

class PostDetails extends Component {
  state = {
    commentCount: 0
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    this.props.getPostCommentsCount(id, data => {
      this.setState({ commentCount: data.count });
    });
  }

  loadPostsDetails() {
      const { post, history,
        match: {
                params: {
                    category
                }
            }} = this.props;


      if (!post || post.category !== category) {
          return <h4> Post not found </h4>
      }
      return post && (
        <div>
          <PostReadOnly post={post} history={history} />
          <div>
            <Link to={`/${post.category}/${post.id}/comments/new`}>
              <Button bsStyle="primary">Add comment</Button>
            </Link>

            <CommentList postCategory={post.category} postId={post.id} />
          </div>
        </div>
      )
  }
  render() {
    return (
      <div>
        {this.loadPostsDetails()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { post: state.posts[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  {
    fetchPost,
    deletePost,
    getPostCommentsCount
  }
)(PostDetails);
