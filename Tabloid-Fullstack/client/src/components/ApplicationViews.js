import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import PostForm from "./PostForm";
import MyPosts from "./MyPosts";
import PostEdit from "./PostEdit";
import CategoryManager from "../pages/CategoryManager";
import CommentForm from "../pages/CommentForm";
import TagManager from "../pages/TagManager";
import NotFoundForm from "./NotFoundForm";

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <p>Home</p> : <Redirect to="/login" />}
      </Route>
      <Route path="/explore">
        {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
      </Route>
      <Route path="/myposts">
        {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/add">
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/edit/:id">
        {isLoggedIn ? <PostEdit /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/:postId(\d+)">
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
        <NotFoundForm />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
