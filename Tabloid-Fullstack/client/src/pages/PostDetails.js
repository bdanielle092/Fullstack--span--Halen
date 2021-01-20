import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Jumbotron } from "reactstrap";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import { Button } from "reactstrap"
import PostReactions from "../components/PostReactions";
import formatDate from "../utils/dateFormatter";
import "./PostDetails.css";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [reactionCounts, setReactionCounts] = useState([]);
  const history = useHistory();


  useEffect(() => {
    fetch(`/api/post/${postId}`)
      .then((res) => {
        if (res.status === 404) {
          toast.error("This isn't the post you're looking for");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setPost(data.post);
        setReactionCounts(data.reactionCounts);
      });
  }, [postId]);

  if (!post) return null;

  const comment = () => {
    if (post.comment === null) {
      return <>
        <Row >
          <Col className="ml-3 mt-5">
            <div><strong className=" font-weight-bold">There are no comments.</strong></div>
          </Col>
        </Row>
      </>
    }
    else {
      return <>
        <Row >
          <Col></Col>
          <Col md={7} className="text-left mt-5">
            <div><strong className=" font-weight-bold">Subject:</strong>&nbsp; {post.comment ? post.comment.subject : ""} </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={7} className="text-left mt-3">
            <div><strong className=" font-weight-bold">Comment:</strong>&nbsp;  {post.comment ? post.comment.content : ""}</div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={7} className="text-left mt-3">
            <div><strong className=" font-weight-bold">Author:</strong>&nbsp;  {post.comment ? post.comment.userProfile.displayName : ""}</div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={7} className="text-left mb-5 mt-3">
            <div> <strong className=" font-weight-bold">Posted:</strong>&nbsp;  {post.comment ? formatDate(post.comment.createDateTime) : ""} </div>
          </Col>
          <Col></Col>
        </Row>
      </>
    }
  }


  return (
    <div>
      <Jumbotron
        className="post-details__jumbo"
        style={{ backgroundImage: `url('${post.imageLocation}')` }}
      ></Jumbotron>
      <div className="container">
        <h1>{post.title}</h1>
        <h5 className="text-danger">{post.category.name}</h5>
        <div className="row">
          <div className="col">
            <img
              src={post.userProfile.imageLocation}
              alt={post.userProfile.displayName}
              className="post-details__avatar rounded-circle"
            />
            <p className="d-inline-block">{post.userProfile.displayName}</p>
          </div>
          <div className="col">
            <p>{formatDate(post.publishDateTime)}</p>
          </div>
        </div>
        <div className="text-justify post-details__content">{post.content}</div>
        <div className="my-4">
          <PostReactions postReactions={reactionCounts} />
        </div>
        <br />
      </div>
      <Row className="mt-5 ml-2">
        <Col>
          <h3>Comments</h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="ml-4">
          <Button color="success"


          >Add New Comment
          </Button>
        </Col>
        <Col>
        </Col>
      </Row>
      {comment()}

    </div >
  );
};

export default PostDetails;