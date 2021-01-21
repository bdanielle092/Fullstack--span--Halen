import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";

import { UserProfileContext } from "../providers/UserProfileProvider";

const MyPosts = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [posts, setPosts] = useState([]);

  const history = useHistory();
};

export default MyPosts;
