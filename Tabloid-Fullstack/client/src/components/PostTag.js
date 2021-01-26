import React from "react";
import { Badge } from "reactstrap";

const PostTags = ({ postTags }) => {
    return (
        <div className="float-left">
            {postTags.map((postTag) => (
                <div key={postTag.id} className="d-inline-block mx-2">
                    {postTag.name}
                </div>
            ))}
        </div>
    );
};
export default PostTags;