import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import PostForm from "./PostForm";
import MyPosts from "./MyPosts";
import CategoryManager from "../pages/CategoryManager";
import TagManager from "../pages/TagManager";

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
      <Route path="/post/:postId">
        {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
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
