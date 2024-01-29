import React, { useState, useEffect} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const  News = (props)=>{
  
  const capitalizeFirstLetter =(str)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);


  
//     const updateNews = async ()=> {
//         props.setProgress(10);
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
//         setLoading(true)
//         let data = await fetch(url);
//         props.setProgress(30);
//         let parsedData = await data.json()
//         props.setProgress(70);
//         setArticles(parsedData.articles)
//         setTotalResults(parsedData.totalResults)
//         setLoading(false)
//         props.setProgress(100);
//     }


  
  const updateNews = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(20)

    let parsedData = await data.json();
    props.setProgress(40)
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  };
 

useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - NewsEasy`
  updateNews();
  // eslint-disable-next-line
}, []);


//     useEffect(() => {
//         document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
//         updateNews(); 
//         // eslint-disable-next-line
//     }, [])


  const fetchMoreData = async () => {
    
    const url =(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    );
    setPage(page+1)
    let data = await fetch( url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  




    //const fetchMoreData = async () => {   
      //         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      //         setPage(page+1) 
      //         let data = await fetch(url);
      //         let parsedData = await data.json()
      //         setArticles(articles.concat(parsedData.articles))
      //         setTotalResults(parsedData.totalResults)
      //       };
       
  };
  // const prevPage = async () => {
  //   updateNews()
  //   setPage(page-1)
  // };

  // nextPage = async () => {
  //   updateNews()
  //   setPage(page+1)
  // };

  
    return (
      <>
      
        <h1 className="text-center  " style={{margin :"35px 0px",marginTop : "90px"}}>
          
          NewsEasy - Headlines in{" "}
          {capitalizeFirstLetter(props.category)}
        </h1>
        { loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults &&  articles.length < totalResults} // Replace with a condition based on your data source
          loader={ <Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
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

          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextPage}>
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  cateegory: "general",
};
export default News;


