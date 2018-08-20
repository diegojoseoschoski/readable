import React, { Component } from "react";
import PostList from "./PostList";
import EditPost from "./EditPost";
import NewPost from "./NewPost";
import PostDetails from "./PostDetails";
import NewComment from "./NewComment";
import EditComment from "./EditComment";
import NotFoundPage from "./NotFoundPage";
import NavBar from "./Navigation";
import { Grid } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Grid>
            <Switch>
              <Route path="/" exact component={PostList} />
              <Route path="/posts/new" exact component={NewPost} />
              <Route
                path="/:category"
                exact
                component={props => <PostList {...props} />}
              />
              <Route
                path="/:category/edit/:id"
                children={props => <EditPost {...props} />}
              />
              <Route path="/:category/:id" exact component={PostDetails} />
              <Route
                path="/:category/:id/comments/new"
                component={NewComment}
              />
              <Route
                path="/:category/:postId/comments/edit/:id"
                component={props => <EditComment {...props} />}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Grid>
          <ToastContainer autoClose={5000} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
