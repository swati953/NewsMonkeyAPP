import Background from "./Background";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import news from "../context/News";

export default function NewsItem(props) {
  const context = useContext(news);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    imageUrl: "",
    newsUrl: "",
    author: "",
    date: "",
    source: "",
  });
  const history=useHistory();
  const savePost = async (e) => {
    e.preventDefault();
    if(localStorage.getItem("token"))
    {
      console.log(note);
      addNote(title,description,imageUrl,newsUrl,author,source);
    }
    else
   { alert("You need to login first");
    history.push("/login");}
  };
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card my-3" style={{ width: "18rem" }}>
        <img src={imageUrl} className="card-img-top" alt="..." />
        
        <div className="card-body">
          <h5 className="card-title">
            
            <h5     name="title">

            {title}
            </h5>
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-primary"
              style={{ left: "90%", zIndex: "1" }}
              name="source"
            >
              {source}
            </span>
          </h5>
          <p className="card-text"
              name="description">{description}</p>

          <p className="card-text">
            <small className="text-muted"     name="auhtor">
              By {author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-warning itemcontainer"
              name="newsUrl"    
            >
             Read full article
            </a>
            <button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                fontSize: "1.1rem",
                
              }}
              
              id="save"
              onClick={savePost}
            >
              <i class="far fa-bookmark"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
