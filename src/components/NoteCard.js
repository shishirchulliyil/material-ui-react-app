import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, makeStyles } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { NoteRounded } from "@material-ui/icons";

const useStyles = makeStyles({
  margin: {
    marginTop: 20,
    marginBottom: 20,
  },
  noteBorder: {
    border: (note) => {
      if (note.category == "work") {
        return "1px solid red";
      } else if (note.category == "todo") {
        return "1px solid purple";
      } else if (note.category == "reminder") {
        return "1px solid green";
      }
    },
  },
  avatar: {
    backgroundColor: (note) => {
      if (note.category == "work") {
        return "red";
      } else if (note.category == "todo") {
        return "purple";
      } else if (note.category == "reminder") {
        return "green";
      }
    },
  },
});

export default function NoteCard({ note, handleDeleteNote }) {
  const classes = useStyles(note);

  return (
    <div>
      <Card className={(classes.margin, classes.noteBorder)} elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {" "}
              {note.category.slice(0, 2).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDeleteNote(note.id)}>
              <DeleteForeverIcon />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
