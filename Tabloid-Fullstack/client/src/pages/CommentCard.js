import React, { useContext } from "react"
// import { DeleteButton } from "./DeleteItem"
import { useHistory } from "react-router-dom"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { Col, Row, Button } from "reactstrap"
import formatDate from "../utils/dateFormatter";

export const CommentCard = ({ post, comment, userProfile }) => {
    const history = useHistory();



    return <>
        <Row >
            <Col></Col>
            <Col md={7} className="text-left mt-5">
                <div><strong className=" font-weight-bold">Subject:</strong>&nbsp; {post.comment ? post.comment.subject : ""} </div>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col md={7} className="text-left mt-3">
                <div><strong className=" font-weight-bold">Comment:</strong>&nbsp;  {post.comment ? post.comment.content : ""}</div>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col md={7} className="text-left mt-3">
                <div><strong className=" font-weight-bold">Author:</strong>&nbsp;  {post.comment ? post.comment.userProfile.displayName : ""}</div>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col md={7} className="text-left mb-5 mt-3">
                <div> <strong className=" font-weight-bold">Posted:</strong>&nbsp;  {post.comment ? formatDate(post.comment.createDateTime) : ""} </div>
            </Col>
            <Col></Col>
        </Row>
    </>

}