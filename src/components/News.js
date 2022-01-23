import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static deafultProps={
    country:'in',
    pageSize:8,
    category:'general',
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

  }
  capitalizeTitle=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title=`NewsMonkey-${this.capitalizeTitle(this.props.category)}`;
    console.log("i am constructor from  Newscomponent");
  }
async updateNews(){
  this.props.setProgress(10);
  let url =
  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=10`;
  // 29f580992fbe45b58344353e1ef3f71f
  this.setState({loading:true}); 
let data = await fetch(url);
this.props.setProgress(50);
let parsedData = await data.json();
this.props.setProgress(70);
this.setState({
  articles: parsedData.articles,
  totalResults: parsedData.totalResults,
  loading:false
});
this.props.setProgress(100);
}
  async componentDidMount() {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=29f580992fbe45b58344353e1ef3f71f&page=1&pagesize=${this.props.pageSize}`;
    //   this.setState({loading:true}); 
    // let data = await fetch(url);
    // let parsedData = await data.json();
    
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading:false
    // });
    this.updateNews();
  }
  handleNextClick = async () => {
    console.log("Next");
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=29f580992fbe45b58344353e1ef3f71f&page=${
    //     this.state.page + 1
    //   }&pagesize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading:false
    //   });
    // }

    this.setState({
      page:this.state.page+1
    })
    this.updateNews();
  };
  handlePrevClick = async () => {
    console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=29f580992fbe45b58344353e1ef3f71f&page=${
    //   this.state.page - 1
    // }&pagesize=${this.props.pageSize}`;

    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    // });
    this.setState({
      page:this.state.page-1
    })
    this.updateNews();
  };
  fetchMoreData = async()=>
  { 
    this.setState({page:this.state.page+1})
    let url =
  ` `;
  this.setState({loading:true}); 
let data = await fetch(url);
let parsedData = await data.json();

this.setState({
  articles: this.state.articles.concat(parsedData.articles),
  totalResults: parsedData.totalResults,
  loading:false
  })
}

  render() {
    return (
      // <div className="container my-3">
      //   <h2 className="text-center my-5">News-Monkey Top {this.capitalizeTitle(this.props.category)} Headlines</h2>
      //   {this.state.loading && <Spinner/>}
      //   <div className="row">
      //     {!this.state.loading && this.state.articles.map((element) => {
      //       return (
      //         <div className="col-md-4" key={element.url}>
      //           <NewsItem
      //             title={element.title ? element.title.slice(0, 45) : ""}
      //             description={
      //               element.description ? element.description.slice(0, 88) : ""
      //             }
      //             imageUrl={
      //               element.urlToImage
      //                 ? element.urlToImage
      //                 : "https://www.xda-developers.com/files/2021/06/Windows-11-option-7.jpg"
      //             }
      //             newsUrl={element.url}
      //             author={element.author? element.author : "Unknown"}
      //             date={element.publishedAt}
      //             source={element.source.name}
      //           />
      //         </div>
      //       );
      //     })}
      //     <div className="conatiner d-flex justify-content-between">
      //       <button
      //         disabled={this.state.page <= 1}
      //         type="button"
      //         className="btn btn-dark"
      //         onClick={this.handlePrevClick}
      //       >
      //         &larr;previous
      //       </button>
      //       <button
      //       disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
      //         type="button"
      //         className="btn btn-dark next"
      //         onClick={this.handleNextClick}
      //       >
      //         Next&rarr;
      //       </button>
      //     </div>
      //   </div>
      // </div>
      <>
        <h2 className="text-center my-5" style={{color:"white"}}>News-Monkey Top {this.capitalizeTitle(this.props.category)} Headlines</h2>
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !==this.state.totalResults}
        loader={<Spinner/>}>
        {this.state.loading && <Spinner/>}
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }   
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://www.xda-developers.com/files/2021/06/Windows-11-option-7.jpg"
                  }
                  newsUrl={element.url}
                  author={element.author? element.author : "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
