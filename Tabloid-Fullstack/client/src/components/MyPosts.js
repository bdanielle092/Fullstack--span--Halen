import React, { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap";

import { UserProfileContext } from "../providers/UserProfileProvider";

const MyPosts = (probs) => {
  const { getToken } = useContext(UserProfileContext);
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  const getMyPosts = (token) => {
    return fetch(`/api/post/myposts/foo/bar`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json().then((p) => setPosts(p)));
  };

  useEffect(() => {
    getToken().then((token) => {
      return getMyPosts(token);
    });
  }, []);

  const deletePost = (id) => {
    getToken()
      .then((token) => {
        return fetch(`/api/post/myposts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((_) => getToken().then(getMyPosts));
  };

  return (
    <div className="container pt-4">
      {posts.map((post) => {
        return (
          <Card>
            <CardBody>
              <h3>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h3>
              <h5>{post.category.name}</h5>
              <p>{post.publishDateTime}</p>
              <p>{post.content}</p>
              <Button
                color="danger"
                onClick={(e) => history.push(`/post/edit/${post.id}`)}
              >
                Edit
              </Button>
              <Button color="danger" onClick={(e) => deletePost(post.id)}>
                Delete
              </Button>
            </CardBody>
            {/* <Modal isOpen={deletePost}>
              <ModalHeader>Delete {post.title}?</ModalHeader>
              <ModalBody>
                Are you sure you want to delete this post? This action
                cannot be undone.
              </ModalBody>
              <ModalFooter>
                <Button onClick={(e) => deletePost(false)}>No, Cancel</Button>
                <Button className="btn btn-outline-danger" onClick={deletePost}>
                  Yes, Delete
                </Button>
              </ModalFooter>
            </Modal> */}
          </Card>
        );
      })}
    </div>
  );
};

export default MyPosts;
