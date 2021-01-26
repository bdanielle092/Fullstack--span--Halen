import { UserProfileContext } from "../providers/UserProfileProvider";
import React, { useState, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Col, Card, CardBody, Form, FormGroup, Label, Input, Row } from "reactstrap"

export const CommentForm = () => {
    const { postId } = useParams();
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const { getToken } = useContext(UserProfileContext);
    const history = useHistory();

    const createComment = () => {
        const comment = {
            subject,
            content,
            postId: postId
        };
        getToken().then((token) =>
            fetch("/api/post/addcomment", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            }).then((p) => {
                history.push(`/post/${postId}`);
            })
        );
    };

    const editComment = () => {
        const comment = {
            subject,
            content,
            postId: postId
        };
        getToken().then((token) =>
            fetch("/api/post/addcomment", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            }).then((p) => {
                history.push(`/post/${postId}`);
            })
        );
    };






    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <h1>Add a New Comment</h1>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="title">Subject</Label>
                                <Input
                                    id="title"
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <Row>
                            <Col></Col>
                            <Button
                                className="mr-4"
                                style={{ width: 150, height: 50 }}
                                color="success"
                                onClick={(e) => {
                                    e.preventDefault();
                                    createComment();
                                }}
                            >
                                SUBMIT
                            </Button>
                            <Button
                                style={{ width: 150, height: 50 }}
                                color="danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push(`/post/${postId}`);
                                }}
                            >Cancel
                            </Button>
                            <Col></Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default CommentForm;