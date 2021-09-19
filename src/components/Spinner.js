import React from "react";
import loading from "../spinner.gif";

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center my-5 py-5">
            <img src={loading} alt="loading" />
        </div>
    );
};

export default Spinner;
