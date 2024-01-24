import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  static defaultProps = {
    country: "in",
    pageSize: 8,
    cateegory: "general",
  };
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  updateNews = async () => {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(20)

    let parsedData = await data.json();
    this.props.setProgress(40)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  };
  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    //const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb0def6d8d0d49b6aa0cca51a395ce6d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
 
    let data = await fetch( `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    );
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  // prevPage = async () => {
  //   this.updateNews()
  //   this.setState({ page: this.state.page - 1})
  // };

  // nextPage = async () => {
  //   this.updateNews()
  //   this.setState({ page: this.state.page + 1})

  // };

  render() {
    return (
      <>
        <h1 className="text-center">
          {" "}
          NewsEasy - Headlines in{" "}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        { this.state.loading && <Spinner/>}
        <br></br>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults &&  this.state.articles.length < this.state.totalResults} // Replace with a condition based on your data source
          loader={ <Spinner />}
        >
          <div className="contaner">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col md-4 my-4" style = {{justifyContent:'spaceAround',
                  display: 'flex'}} key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 40) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 60)
                          : ""
                      }
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="btn-group btn-group-lg d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.prevPage}
          >
            &larr; Previous
          </button>

          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextPage}>
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
