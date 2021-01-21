import React, { useContext } from "react"
// import { DeleteButton } from "./DeleteItem"
import { useHistory } from "react-router-dom"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { Col, Row, Button } from "reactstrap"
import formatDate from "../utils/dateFormatter";

export const CommentCard = ({ comments }) => {
    const history = useHistory();

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
            <Col md={7} className="text-left mt-3">
                <div><strong className=" font-weight-bold">Comment:</strong>&nbsp;   {comments.content}</div>
            </Col>
            <Col></Col>
        </Row>
        {/* {comments.userProfile.content} */}

        <Row>
            <Col></Col>
            <Col md={7} className="text-left mt-3">
                <div><strong className=" font-weight-bold">Author:</strong>&nbsp; </div>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col md={7} className="text-left mb-5 mt-3">
                <div> <strong className=" font-weight-bold">Posted:</strong>&nbsp;  {formatDate(comments.createDateTime)} </div>
            </Col>
            <Col></Col>
        </Row>
    </>

}