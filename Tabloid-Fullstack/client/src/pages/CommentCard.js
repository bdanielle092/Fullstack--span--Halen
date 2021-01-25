import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom";
import { Col, Row, Button } from "reactstrap"
import formatDate from "../utils/dateFormatter";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CommentCard = ({ comments }) => {
    const history = useHistory();
    const [user, setUsers] = useState([]);
    const [returnedComment, setReturnedComment] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    // useEffect(() => {
    //     getComment();
    // }, []);

    // useEffect(() => {
    //     getUser();
    // }, []);

    // const getComment = () => {
    //     getToken().then((token) =>
    //         fetch(`/api/comment`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //             .then((res) => res.json())
    //             .then((comments) => {
    //                 setReturnedComment(comments);
    //             })
    //     );
    // };

    // const getUser = () => {
    //     getToken().then((token) =>
    //         fetch(`/api/comment`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //             .then((res) => res.json())
    //             .then((users) => {
    //                 setUsers(users);
    //             })
    //     );
    // };


    // const DeleteCommentButton = () => {
    //     if (returnedComment.UserProfileId === user.id) {
    //         return <>
    //             <Button
    //                 style={{ width: 150, height: 50 }}
    //                 color="danger"
    //             // onClick={(e) => {
    //             //     history.push(`/post/${postId}`);
    //             // }}
    //             >Delete Comment
    //             </Button>
    //         </>
    //     }
    //     else {
    //         return <>
    //             ""
    //         </>;
    //     }
    // }

    return <>
        <Col>
            <Row >

                <Col md={7} className="text-left mt-5">
                    <div className="mt-2"><strong className="font-weight-bold">Subject:</strong>&nbsp; {comments.subject} </div>
                    <div className="mt-2"><strong className="font-weight-bold">Comment:</strong>&nbsp;   {comments.content}</div>
                    <div className="mt-2"><strong className="font-weight-bold">Author:</strong>&nbsp; {comments.userProfile.displayName}</div>
                    <div className="mt-2"> <strong className="font-weight-bold">Posted:</strong>&nbsp;  {formatDate(comments.createDateTime)} </div>
                </Col>
                <Col>
                    <Button
                        className="mt-5"
                        style={{ width: 150, height: 75 }}
                        color="danger"
                    // onClick={(e) => {
                    //     history.push(`/post/${postId}`);
                    // }}
                    >Delete Comment
                </Button>
                </Col>
            </Row>
        </Col>

    </>
}