import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import PostForm from "./PostForm";
import CategoryManager from "../pages/CategoryManager";
<<<<<<< HEAD
import CommentForm from "../pages/CommentForm";
=======
import TagManager from "../pages/TagManager";
import NotFoundForm from "./NotFoundForm";
>>>>>>> main

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);
  const { isAdmin } = useContext(UserProfileContext);



  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <p>Home</p> : <Redirect to="/login" />}
      </Route>
      <Route path="/explore">
        {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
      </Route>
<<<<<<< HEAD
      <Route path="/post/:postId(\d+)">
=======
      <Route path="/post/add">
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/:postId">
>>>>>>> main
        {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/addcomment/:postId(\d+)">
        {isLoggedIn ? <CommentForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/categories">
        {isLoggedIn ? <CategoryManager /> : <Redirect to="/login" />}
      </Route>
      <Route path="/tags">
        {isLoggedIn ? <TagManager /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/404">
        <h1>Not Found</h1>
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
