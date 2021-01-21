import React from "react"
import { Col, Row, Jumbotron } from "reactstrap"
import formatDate from "../utils/dateFormatter";

export const CommentCard = ({ comments }) => {

    return <>
        <Row >
            <Col></Col>
            <Col md={7} className="text-left mt-5">
                <div><strong className=" font-weight-bold">Subject:</strong>&nbsp; {comments.subject} </div>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col md={7} className="text-left mt-1">
                <div><strong className=" font-weight-bold">Comment:</strong>&nbsp;   {comments.content}</div>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col md={7} className="text-left mt-1">
                <div><strong className=" font-weight-bold">Author:</strong>&nbsp; {comments.userProfile.displayName}</div>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col md={7} className="text-left mt-1">
                <div> <strong className=" font-weight-bold">Posted:</strong>&nbsp;  {formatDate(comments.createDateTime)} </div>
            </Col>
            <Col></Col>
        </Row>
    </>
}