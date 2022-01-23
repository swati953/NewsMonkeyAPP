import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import news from "../context/News";

import NewsItem from "./NewsItem";
import Savednewsitem from "./Savednewsitem";

const Savednews = () => {
  let history = useHistory();
  const context = useContext(news);
  const { notes, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history.push("/login");
    }
  }, []);
  console.log(notes);
  return (
    <>
      <h2 className="text-center my-5" style={{color:"white"}}>News-Monkey - Your Saved News</h2>

      <div className="container">
        <div className="row">
          {notes.map((note) => {
            return (
              <div className="col-md-4" key={note._id}>
              <Savednewsitem
                
                _id={note._id}
                title={note.title ? note.title.slice(0, 45) : ""}
                description={
                  note.description ? note.description.slice(0, 88) : ""
                }
                imageUrl={
                  note.imageUrl
                    ? note.imageUrl
                    : "https://www.xda-developers.com/files/2021/06/Windows-11-option-7.jpg"
                }
                newsUrl={note.newsUrl}
                author={note.author ? note.author : "Unknown"}
                date={note.publishedAt}
                source={note.source}
              />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Savednews;
