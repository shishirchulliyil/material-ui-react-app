import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log("retrieving notes");
    fetch("http://localhost:8080/notes")
      .then((res) => {
        if (!res) {
          console.log("no response received");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setNotes(data);
      });
  }, []);

  const handleDeleteNote = async (id) => {
    await fetch("http://localhost:8080/notes/" + id, {
      method: "DELETE",
    })
      .then(() => console.log("note deleted with id ", id))
      .catch((err) => console.log("error deleting note with id ", id));

    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  return (
    <Container>
      <Grid
        container
        spacing={3}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
            <NoteCard note={note} handleDeleteNote={handleDeleteNote} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
