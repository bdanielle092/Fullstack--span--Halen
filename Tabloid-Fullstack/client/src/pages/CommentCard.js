import React, { useContext, useState } from "react";
import {
    Col, Row, Button,
    ButtonGroup,
    Form,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import formatDate from "../utils/dateFormatter";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CommentCard = ({ comment, removeComment }) => {
    const { getToken, getCurrentUser } = useContext(UserProfileContext);
    const [pendingDelete, setPendingDelete] = useState(false);

    const deleteComment = () => {
        const deletingComment = { id: comment.id }
        getToken().then((token) =>
            fetch(`/api/comment/${comment.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(deletingComment)
            }).then(() => {
                removeComment(comment.id);
            })
        )
    }

    const DeleteComment = () => {
        const user = getCurrentUser()
        if (user.id === comment.userProfileId) {
            return <Button
                className="mt-5 mr-3 px-1"
                color="danger"
                onClick={() => {
                    setPendingDelete(true)
                }}
            >Delete Comment
                    </Button>
        }
        else {
            return null;
        }
    }

    const EditButton = () => {
        const user = getCurrentUser()
        if (user.id === comment.userProfileId) {
            return <Button
                className="mt-5  mr-3 px-1"
                color="info"

            >Edit Comment
                    </Button>
        }
        else {
            return null;
        }
    }

    return <>
        <Col>
            <Row >
                <Col></Col>
                <Col md={3} className="text-left mt-5">
                    <div className="mt-2"><strong className="font-weight-bold">Subject:</strong>&nbsp; {comment.subject} </div>
                    <div className="mt-2"><strong className="font-weight-bold">Comment:</strong>&nbsp;   {comment.content}</div>
                    <div className="mt-2"><strong className="font-weight-bold">Author:</strong>&nbsp; {comment.userProfile.displayName}</div>
                    <div className="mt-2"> <strong className="font-weight-bold">Posted:</strong>&nbsp;  {formatDate(comment.createDateTime)} </div>
                </Col>
                <Col>
                    <EditButton />
                    <DeleteComment />
                </Col>
                <Col></Col>
            </Row>
        </Col>

        {/* DELETE CONFIRM MODAL */}
        <Modal isOpen={pendingDelete}>
            <ModalHeader>Delete {comment.subject}?</ModalHeader>
            <ModalBody>
                Are you sure you want to delete this category? This action cannot be
                undone.
        </ModalBody>
            <ModalFooter>
                <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                <Button className="btn btn-outline-danger" onClick={deleteComment}>Yes, Delete</Button>
            </ModalFooter>
        </Modal>
    </>
}