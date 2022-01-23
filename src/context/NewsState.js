import React from "react";
import { useState } from "react/cjs/react.development";
import News from "./News";

const NewsState = (props) => {
  const host = "http://localhost:5000";
  //taking notes by user
  const notesInitial = [];
  
  const [notes, setNotes] = useState(notesInitial);
  //fetch al notes
  const getNotes = async () => {
    //api call to bring notes on frontend
  const response = await fetch(`${host}/api/news/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
 
    });
    const json=await response.json();
    console.log("all news saved "+json);
    setNotes(json);
};
  //add note
  const addNote = async (title, description,imageUrl,newsUrl,source,author) => {
      //api call to change at backend too
    const response = await fetch(`${host}/api/news/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title, description,imageUrl,newsUrl,author,source}),
      });
     const note=await response.json();
    setNotes(notes.concat(note));
  };

  //delete note
  const deleteNote = async(id) => {
      //API call
      const response = await fetch(`${host}/api/news/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
    });
     const json=await response.json();
    //  console.log(json);
    //add note
    // console.log("deleting the note wth id : " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <News.Provider value={{ notes, addNote, deleteNote,getNotes }}>
      {props.children}{" "}
    </News.Provider>
  );
};
export default NewsState;
