import React from "react";
import Explore from "../pages/Explore";

const NotFoundForm = () => {

    return (
        <div className="card">
            <div className="card-content">
                <picture>
                    <img src="../image/404-error-page-not-found.jpg" alt="404 image" />
                </picture>
                <link to="../pages/Explore.js">
                    <h1>Go Home</h1>
                </link>
            </div>
        </div>

    );
};
export default NotFoundForm;