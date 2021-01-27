import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
    ListGroup,
    ListGroupItem,
    Input,
    InputGroup,
    Button,
} from "reactstrap";
import Tag from "../components/Tag"
import { Redirect } from "react-router-dom";



const TagManager = () => {
    const { getToken } = useContext(UserProfileContext);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const { getCurrentUser, isAdmin } = useContext(UserProfileContext);
    //this if statment is here for a reason but can't remember why 
    // useEffect(() => {
    //     if (getCurrentUser === isAdmin) {

    //         getTags();
    //     }
    //     if (getCurrentUser === !isAdmin) {
    //         return (null)
    //     }
    // }, []);


    useEffect(() => {
        getTags();
    }, []);


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
                    setTags(tags);
                })
        );
    };
    const saveNewTag = () => {
        const tagToAdd = { name: newTag };
        getToken().then((token) =>
            fetch("/api/tag", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(tagToAdd),
            }).then(() => {
                setNewTag("");
                getTags();
            })
        );
    };
    if (!isAdmin()) {
        return <Redirect to="/404" />
    } else {
        return (

            <div className="container mt-5">
                <img
                    height="100"
                    src="/quill.png"
                    alt="Quill Logo"
                    className="bg-danger rounded-circle"
                />
                <h1>Tag Management</h1>
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-8 col-md-6">
                        <ListGroup>
                            {tags.map((tag) => (
                                <ListGroupItem key={tag.id}>
                                    <Tag tag={tag} onEdit={getTags} onDelete={getTags} />
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        <div className="my-4">
                            <InputGroup>
                                <Input
                                    onChange={(e) => setNewTag(e.target.value)}
                                    value={newTag}
                                    placeholder="Add a new Tag"
                                />
                                <Button onClick={saveNewTag}>Save</Button>
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>
        );

    };
};
export default TagManager;