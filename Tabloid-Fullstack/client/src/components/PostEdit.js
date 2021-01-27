import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const PostEdit = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const { id } = useParams();
  const history = useHistory();
  const [postToEdit, setPostToEdit] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getToken()
      .then((token) =>
        fetch(`/api/category`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((cat) => setCategories(cat))
      .then((_) => {
        getToken()
          .then((token) =>
            fetch(`/api/post/${id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
          .then((res) => res.json())
          .then((edit) => setPostToEdit(edit.post));
      });
  }, []);

  const handleSubmit = (e) => {
    const newPost = { ...postToEdit };
    newPost[e.target.name] = e.target.value;
    setPostToEdit(newPost);
  };

  const updatePost = (post) => {
    getToken()
      .then((token) =>
        fetch(`/api/post/myposts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(post),
        })
      )
      .then((e) => history.push("/myposts"));
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              {/* <FormGroup>
                <Label for="imageLocation">Header Image URL</Label>
                <Input
                  id="imageLocation"
                  type="url"
                  name="ImageLocation"
                  onChange={(e) => handleSubmit(e)}
                />
              </FormGroup> */}
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  type="title"
                  name="title"
                  value={postToEdit.title}
                  onChange={(e) => handleSubmit(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  id="content"
                  type="textarea"
                  name="content"
                  value={postToEdit.content}
                  onChange={(e) => handleSubmit(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="selectCategory">Category</Label>
                <Input
                  type="select"
                  name="categoryId"
                  id="category"
                  value={postToEdit.categoryId}
                  onChange={(e) => handleSubmit(e)}
                >
                  <option>Select Category ...</option>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="publishDateTime">Publication Date</Label>
                <Input
                  id="publishDateTime"
                  type="date"
                  name="PublishDateTime"
                  onChange={(e) => handleSubmit(e)}
                />
              </FormGroup>
              <Button
                color="danger"
                onClick={(e) => {
                  e.preventDefault();
                  updatePost(postToEdit);
                }}
              >
                SUBMIT
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default PostEdit;
