import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        
        // loading start
        setLoading(true);
        
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();

        props.setProgress(50);
        // loading end
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    };

    // work of componentDidMount one time run
    useEffect(() => {
        document.title = `${props.category[0].toUpperCase()}${props.category.slice(1)} - NewsMonkey` ;

        updateNews();
    },[]); // eslint-disable-line

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setPage(page+1);
    };

    return (
        <>
            <h1 style={{marginTop : "2.3em"}} className="text-center mb-3">{`Top Headlines On ${props.category[0].toUpperCase()}${props.category.slice(
                1
            )}`}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                element.title &&
                                element.description && (
                                    <div
                                        className="col-md-4 my-3"
                                        key={element.url}
                                    >
                                        <NewsItem
                                            title={element.title.slice(0, 45)}
                                            description={
                                                element.description === null
                                                    ? element.description
                                                    : element.description.slice(
                                                          0,
                                                          88
                                                      )
                                            }
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            publishedAt={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
