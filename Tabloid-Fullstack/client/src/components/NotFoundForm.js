import React from "react";
import { Link } from "react-router-dom";
import notFound from "../image/404-error-page-not-found.jpg";
import "./NotFound.css";
import { Button } from "reactstrap";

const NotFoundForm = () => {

    return (
        <div >
            <div>
                <img className="photo" src={notFound} alt="404 image" className="centerPhoto" />
                <br></br>

                <Link to="/explore">
                    <Button color="danger">
                        Go To Explore
                    </Button>
                </Link>

            </div>
        </div>

    );
};
export default NotFoundForm;