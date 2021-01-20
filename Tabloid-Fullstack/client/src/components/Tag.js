import userEvent from "@testing-library/user-event";
import React, { useState, useContext, useEffect } from "react";
import { Button, Input, InputGroup, ButtonGroup, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const Tag = ({ tag }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);
    const [tagEdits, setTagEdits] = useState("");

    const showEdit = () => {
        setIsEditing(true);
        setTagEdits(tag.name);
    };
    const hideEdit = () => {
        setIsEditing(false);
        setTagEdits("");
    };


    return (
        <div className="justify-content-between row">
            {/* If user is editing */}
            {isEditing ? (
                <Form className="w-100">
                    <InputGroup>
                        <Input size="sm" onChange={(e) => setTagEdits(e.target.value)}
                            value={tagEdits} />
                        <ButtonGroup size="sm">
                            <Button onClick={showEdit}>Save</Button>
                            <Button outline color="danger" onClick={hideEdit}>
                                Cancel
                        </Button>
                        </ButtonGroup>
                    </InputGroup>
                </Form>
            ) : (
                    // If user is not editing
                    <>
                        <div className="p-1">{tag.name}</div>
                        <ButtonGroup size="sm">
                            <Button className="btn btn-primary" onClick={showEdit}>
                                Edit
                    </Button>
                            <Button
                                className="btn btn-danger"
                                onClick={(e) => setPendingDelete(true)}
                            >
                                Delete
                    </Button>
                        </ButtonGroup>
                    </>
                )}
            <Modal isOpen={pendingDelete}>
                <ModalHeader>Delete {tag.name}?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete {tag.name} tag? This action cannot be
          undone.
        </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button onClick={(e) => setPendingDelete(true)} className="btn btn-outline-danger">Yes, Delete</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default Tag;