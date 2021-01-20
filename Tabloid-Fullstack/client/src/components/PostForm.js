import React, { useState, useContext } from "react";
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

const PostForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const [imageLocation, setImageLocation] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [publicationDate, setPublicationDate] = useState("");

  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  const submit = (e) => {
    const post = {
      imageLocation,
      title,
      content,
      categoryId,
      publicationDate,
    };

    getToken().then((token) =>
      fetch("/api/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }).then((p) => {
        // Navigate the user to post detail
        history.push(`/explore`);
      })
    );
  };
  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="imageLocation">Header Image URL</Label>
                <Input
                  id="imageLocation"
                  onChange={(e) => setImageLocation(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" onChange={(e) => setTitle(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  id="content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="categoryId">Category Id</Label>
                <Input
                  id="categoryId"
                  onChange={(e) => setCategoryId(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="publicationDate">Publication Date</Label>
                <Input
                  id="publicationDate"
                  onChange={(e) => setPublicationDate(e.target.value)}
                />
              </FormGroup>
            </Form>
            <Button color="danger" onClick={submit}>
              SUBMIT POST
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PostForm;
