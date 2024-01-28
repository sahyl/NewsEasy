import React from "react";

const Newsitem = (props)=>{
  
    let { title, description, imgUrl, newsUrl, author, date, source } =
      props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: "0",
            }}
          >
            <span className=" badge rounded-pill bg-danger" >{source} </span>
          </div>

          <img
            src={
              !imgUrl
                ? "https://www.livemint.com/lm-img/img/2024/01/12/1600x900/Atal_setu_real_estate_mumbai_1705021072508_1705021072642.jpg"
                : imgUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className=" text-muted">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
