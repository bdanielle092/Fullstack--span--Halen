import React, { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CardImg,
} from "reactstrap";

import { UserProfileContext } from "../providers/UserProfileProvider";

const MyPosts = () => {
  const { getToken } = useContext(UserProfileContext);
  const [posts, setPosts] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(false);

  const history = useHistory();

  const getMyPosts = (token) => {
    return fetch(`/api/post/myposts`, {
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
        }).then(() => setPendingDelete(false));
      })
      .then((_) => getToken().then(getMyPosts));
  };

  return (
    <div className="container pt-4">
      {posts.map((post) => {
        return (
          <Card>
            <CardBody>
              <div className="col-lg-3 col-sm-12">
                <Link to={`/post/${post.id}`}>
                  <div
                    className="myPost__img"
                    style={{
                      backgroundImage: `url(${post.imageLocation})`,
                    }}
                  ></div>
                </Link>
              </div>
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
              <Button color="danger" onClick={(e) => setPendingDelete(true)}>
                Delete
              </Button>
            </CardBody>
            <Modal isOpen={pendingDelete}>
              <ModalHeader>Delete {post.title}?</ModalHeader>
              <ModalBody>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </ModalBody>
              <ModalFooter>
                <Button onClick={(e) => setPendingDelete(false)}>
                  No, Cancel
                </Button>
                <Button
                  className="btn btn-outline-danger"
                  onClick={(e) => deletePost(post.id)}
                >
                  Yes, Delete
                </Button>
              </ModalFooter>
            </Modal>
          </Card>
        );
      })}
    </div>
  );
};

export default MyPosts;
