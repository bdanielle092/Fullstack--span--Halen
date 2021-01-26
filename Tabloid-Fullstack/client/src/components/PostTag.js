import React from "react";
import { Badge } from "reactstrap";

const PostTag = ({ postTag }) => {
    return (
        <div className="float-left">

            {postTag.name}
        </div>
    );
};
export default PostTag;