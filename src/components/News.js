import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    };

    static propTypes = {    
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    };

    handlePrevious = async ()=>{

        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=8c8aebfde56c4fd088bc56e61fa751ba&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

        // loading start
        this.setState({loading: true})

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles , page: this.state.page - 1 , loading:false});
        
    }

    handleNext = async ()=>{

        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=8c8aebfde56c4fd088bc56e61fa751ba&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        // loading start
        this.setState({loading: true})

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles , page: this.state.page + 1 , loading:false});

    }
    
    constructor(){
        // set state here
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults: 0
        }
        
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=8c8aebfde56c4fd088bc56e61fa751ba&pageSize=${this.props.pageSize}`;

        // loading start 
        this.setState({loading: true});
        
        let data = await fetch(url);
        let parsedData = await data.json();

        // loading end
        this.setState({articles: parsedData.articles , totalResults: parsedData.totalResults , loading: false})

    }
    
    render() {
        return (
            <div className="container my-5 pb-5">
                <h1 className="text-center">NewsMonkey - Top News</h1>
                {this.state.loading && <Spinner /> }
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {

                        return element.title && element.description && (<div className="col-md-4 my-3" key={element.url}>
                            <NewsItem  title={element.title.slice(0,45)} description={element.description===null?element.description:element.description.slice(0,88)} imageUrl={element.urlToImage}  newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
                        </div>)
                        })}
                </div>
                
                <div className="d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevious}> 	&larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize) } className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
