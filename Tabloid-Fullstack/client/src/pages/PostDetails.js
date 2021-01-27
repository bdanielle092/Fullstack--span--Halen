import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Jumbotron, Input, CardBody } from "reactstrap";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import { Button } from "reactstrap"
import PostReactions from "../components/PostReactions";
import formatDate from "../utils/dateFormatter";
import "./PostDetails.css";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { CommentCard } from "./CommentCard"
import userEvent from "@testing-library/user-event";



const PostDetails = () => {
  const { getCurrentUser, isAdmin } = useContext(UserProfileContext);
  const { getToken } = useContext(UserProfileContext);
  const user = getCurrentUser();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [reactionCounts, setReactionCounts] = useState([]);
  const history = useHistory();
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [comment, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/comment/${postId}`)
      .then((res) => res.json())
      .then((comment) => {
        setComments(comment);
      });
  }, []);


  const removeComment = (id) => {
    const filteredComments = comment.filter(c => c.id !== id);
    setComments(filteredComments);
  }

  const getTags = () => {
    getToken().then((token) =>
      fetch(`/api/tag`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((tags) => {
          setTagsList(tags);
        })
    );
  };
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
        getTags();
        setPost(data.post);
        setReactionCounts(data.reactionCounts);
        setTags(data.post.postTags);
      });
  }, [postId, tagsList]);

  if (!post) return null;


  //Dropdown of all tags NOT already assigned to post
  const PostTags = (_) => {
    const tagsOnPost = tags.map((tag) => tag.tag);
    return tagsList.filter((tag) => {
      return !tagsOnPost.find((t) => t.id === tag.id)
    });

  };
  //Check if current user is author of post 
  const verifyUser = (_) => {
    if (user.id === post.userProfileId) {
      return true;
    }
    return false;
  }
  //Save for selected tag
  const handleChange = (e) => {
    setTagId(e.target.value);
  }
  const savePostTag = (token) => {
    return fetch(`/api/posttag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tagId: tagId, postId: postId }),

    });
  };
  //Delete a tag
  const deleteTag = (tag) => {
    return getToken().then((token) => {
      fetch(`/api/posttag/${tag.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((_) => {
          getTags();
        })
    })
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
        <br />
        {verifyUser() ? (
          <>
            {/* Check if user is admin to see the dropdown of tags */}

            <Input type="select" onChange={(e) => handleChange(e)}>
              <option value="0">Select a tag..</option>
              {PostTags().map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {" "}
                  {tag.name}{" "}
                </option>
              ))}
            </Input>
            <br />
            <Button
              onClick={(e) => {
                getToken().then(savePostTag).then(getTags);
              }}
            >
              Save Tag
            </Button>{" "}
          </>
          //If not admin, return nothing
        ) : (
            ""
          )}
        <div>
          Tags:{" "}
          {/* Check if user is admin to delete tag */}
          {verifyUser()
            ? tags.map((tag) => {
              return (
                <>
                  <Button
                    onClick={(e) => deleteTag(tag).then(getTags)}
                  >
                    {tag.tag.name}
                  </Button>{" "}
                </>
              );
            })
            // If user is not admin
            : tags.map((tag) => `${tag.tag.name} `)}
        </div>
      </div>

      <Row className="mt-5 ml-2">
        <Col>
          <h3>Comments</h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="ml-4">
          <Button color="success"
            onClick={() => {
              history.push(`/post/addcomment/${postId}`)
            }}
          >Add New Comment
            </Button>
        </Col>
        <Col>
        </Col>
      </Row>
      {
        comment.map(comment => {
          return <CommentCard key={comment.id} comment={comment} removeComment={removeComment} />
        })
      }
    </div >
  );
};

export default PostDetails;