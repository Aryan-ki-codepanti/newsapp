import React from "react";
// 8c8aebfde56c4fd088bc56e61fa751ba
const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } =
        props;
    return (
        <div>
            <div className="card">
                <div className="d-flex justify-content-end">
                    <span
                        className=" badge rounded-pill bg-danger"
                        style={{ left: "88%", zIndex: "1" }}
                    >
                        {source}
                    </span>
                </div>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text">
                        <small className="text-muted">
                            By {author ? author : "Unknown"} on{" "}
                            {!publishedAt
                                ? ""
                                : new Date(publishedAt).toGMTString()}{" "}
                        </small>
                    </p>
                    <a
                        href={newsUrl}
                        target="_blank"
                        className="btn btn-dark btn-sm"
                        rel="noreferrer"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
