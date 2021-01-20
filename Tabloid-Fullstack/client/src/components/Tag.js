import React, { useState, useContext, useEffect } from "react";
import { Button, Input, InputGroup, ButtonGroup, Form } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider"

const Tag = ({ tag, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);
    const [tagEdits, setTagEdits] = useState("");
    const { getToken } = useContext(UserProfileContext);

    const showEdit = () => {
        setIsEditing(true);
        setTagEdits(tag.name);
    };
    const hideEdit = () => {
        setIsEditing(false);
        setTagEdits("");
    };

    const saveEdit = () => {
        const tagToEdit = { id: tag.id, name: tagEdits }
        getToken().then((token) =>
            fetch(`/api/tag/${tag.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(tagToEdit),
            }).then(() => {
                setIsEditing(false);
                onEdit();
            })
        );
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
                            <Button onClick={saveEdit}>Save</Button>
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

        </div>
    );
};
export default Tag;