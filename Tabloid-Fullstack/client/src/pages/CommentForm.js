import formatDate from "../utils/dateFormatter";
import { UserProfileContext } from "../providers/UserProfileProvider";
import React, { useEffect, useState, useContext } from "react"
// import { ItemContext } from "./AppDataProvider.js"
import { useHistory, useParams } from "react-router-dom"
// import { Route, withRouter } from 'react-router-dom';
import { Button, Col, Card, CardBody, Form, FormGroup, Label, Input, Row } from "reactstrap"
import { CommentCard } from "./CommentCard"


export const CommentForm = () => {
    const { postId } = useParams();
    // const { getToken } = useContext(UserProfileContext);
    // const [imageLocation, setImageLocation] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    // const [categoryId, setCategoryId] = useState("");
    // const [publishDateTime, setPublicationDate] = useState("");
    const { getToken } = useContext(UserProfileContext);
    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    // const publishDate = useRef(null);
    // const catId = useRef(null);

    // const constructItemObject = () => {
    //     // setIsLoading(true)
    //     // if (itemId) {
    //     //     editItems({
    //     //         id: item.id,
    //     //         itemName: item.itemName,
    //     //         itemLocation: item.itemRoom,
    //     //         itemDescription: item.itemDescription,
    //     //         itemSerialNumber: item.itemSerialNumber,
    //     //         itemNotes: item.itemNotes
    //     //     })
    //     //         .then(() => history.push("/"))
    //     // } else {
    //     const comment = {
    //         subject,
    //         content,
    //     };
    //     getToken().then((token) =>
    //         fetch("/api/post/comment", {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(comment),
    //         }).then((p) => {
    //             // Navigate the user to post detail
    //             history.push(`/explore`);
    //         })
    //     );
    // }

    const submit = () => {
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
                // Navigate the user to post detail
                history.push(`/explore`);
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
                            {/* <FormGroup>
                            <Label for="categoryId">Category Id</Label>
                            <Input
                                id="categoryId"
                                useRef={catId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="publishDateTime">Publication Date</Label>
                            <Input
                                id="publishDateTime"
                                useRef={publishDate}
                                onChange={(e) => setPublicationDate(e.target.value)}
                            />
                        </FormGroup> */}
                        </Form>

                        <Row>
                            <Col></Col>
                            <Button
                                className="mr-4"
                                style={{ width: 150, height: 50 }}
                                color="success"
                                onClick={(e) => {
                                    e.preventDefault();
                                    submit();
                                    history.push(`/post/${postId}`);
                                }}
                            >
                                SUBMIT
                            </Button>
                            <Button
                                style={{ width: 150, height: 50 }}
                                color="danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push(`/explore`);
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



























// const [comment, setNewComment] = useState({})

// const history = useHistory();

// // const { getCommentById, addComment, editComment, getItems } = useContext(ItemContext)

// const { commentId } = useParams()


// const handleControlledInputChange = (event) => {
//     const addedComment = comment
//     addedComment[event.target.name] = event.target.value
//     setNewComment(addedComment)
// }

// useEffect(() => {
//     getComments()
// }, [])

// useEffect(() => {
//     if (commentId) {
//         getCommentById(commentId)
//             .then(comment => {
//                 setNewComment(comment)
//             })
//     } else {
//     }
// }, [getCommentById, commentId])



// const constructCommentObject = () => {
//     // setIsLoading(true)
//     if (commentId) {
//         editComment({
//             id: item.id,
//             itemName: item.itemName,
//             itemLocation: item.itemRoom,
//             itemDescription: item.itemDescription,
//             itemSerialNumber: item.itemSerialNumber,
//             itemNotes: item.itemNotes
//         })
//             .then(() => history.push("/"))
//     } else {
//         addComment({
//             id: item.id,
//             itemName: item.itemName,
//             itemLocation: item.itemRoom,
//             itemDescription: item.itemDescription,
//             itemSerialNumber: item.itemSerialNumber,
//             itemNotes: item.itemNotes
//         })
//             .then(() => history.push("/"))
//     }
// }

// return (
//     <>
//         <h1 className="AddItemHeader">Inventory</h1>
//         <hr className="hr-AddItem" />
//         <Row className="justify-content-md-left">
//             <label style={{ width: 200, height: 5 }} className="LocationTitle">Location</label>
//             <select style={{ width: 400, height: 35 }}
//                 className="RoomInput"
//                 name="itemRoom"
//                 onChange={handleControlledInputChange}
//             // defaultValue={itemId ? item.itemRoom : ""}
//             >
//                 <option selected>{itemId ? item.itemLocation : ""}</option>
//                 <option>AmSurg PAR 1</option>
//                 <option>AmSurg PAR 2</option>
//                 <option>AmSurg PAR 3</option>
//                 <option>Emergency Room PAR 1</option>
//                 <option>Emergency Room PAR 2</option>
//                 <option>ICU PAR 1</option>
//                 <option>ICU PAR 2</option>
//                 <option>Gastroenterology PAR 1</option>
//                 <option>Hematology PAR 1</option>
//                 <option>Hematology PAR 2</option>
//                 <option>Materials Management</option>
//                 <option>Neurology PAR 1</option>
//                 <option>Pharmacy</option>
//                 <option>Store Room 1</option>
//                 <option>Store Room 2</option>
//             </select>
//         </Row>
//         <Row style={{ marginTop: 20 }} className="justify-content-md-left">
//             <form action="/action_page.php">
//                 <label style={{ width: 200, height: 5 }} className="ItemNameTitle">Item Name:  </label>
//                 <input style={{ width: 400, height: 35 }} type="text" className="ItemNameInput" name="itemName" onChange={handleControlledInputChange} placeholder={itemId ? item.itemName : ""} />
//             </form>
//         </Row>

//         <Row style={{ marginTop: 20 }} className="justify-content-md-left">
//             <label style={{ width: 200, height: 5 }} className="DescriptionTitle">Item Description:  </label>
//             <textarea style={{ width: 400, height: 100 }} type="textarea" className="DescriptionInput" name="itemDescription" onChange={handleControlledInputChange} placeholder={itemId ? item.itemDescription : ""} />
//         </Row>

//         <Row style={{ marginTop: 20 }} className="justify-content-md-left">
//             <label style={{ width: 197, height: 5 }} className="ItemSerialTitle">Item Serial Number:  </label>
//             <input style={{ width: 400, height: 35 }} type="text" className="ItemSerialInput" name="itemSerialNumber" onChange={handleControlledInputChange} placeholder={itemId ? item.itemSerialNumber : ""} />
//         </Row>

//         <Row style={{ marginTop: 20 }} className="justify-content-md-left">
//             <label style={{ width: 197, height: 5 }} className="ItemNotesTitle">Item Notes:  </label>
//             <textarea style={{ width: 400, height: 100 }} type="textarea" className="ItemNotesInput" name="itemNotes" onChange={handleControlledInputChange} placeholder={itemId ? item.itemNotes : ""} />
//         </Row>

//         <Row style={{ marginTop: 20 }} className="justify-content-md-left">
//             <Button
//                 style={{ width: 150, marginLeft: 30 }}
//                 variant="success"
//                 onClick={item => {
//                     item.preventDefault()
//                     constructItemObject()
//                     history.push(`/`)
//                 }}
//                 type="button">Save Item
//             </Button>

//             <Button
//                 style={{ width: 150, marginLeft: 30 }}
//                 variant="danger"
//                 className="CancelAddItem"
//                 onClick={() => {
//                     history.push(`/`)
//                 }}
//                 type="submit">Cancel
//             </Button>
//         </Row>
//     </>
// );












