import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todo");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }
    if (title && details && category) {
      // console.log(title, details, category);
      // posting to DB using JSON Server
      const note = { title, details, category };
      fetch("http://localhost:8080/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      })
        .then(() => {
          console.log("note added");
          history.push("/");
        })
        .catch((err) => console.log("error posting note"));
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>

      {/* creating a form */}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          variant="outlined"
          label="Note Title"
          color="secondary"
          required
          fullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (title != "") {
              setTitleError(false);
            }
          }}
          error={titleError}
        />
        <TextField
          className={classes.field}
          label="Details"
          multiline
          rows={5}
          variant="outlined"
          color="secondary"
          required
          fullWidth
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
            if (details != "") {
              setDetailsError(false);
            }
          }}
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel component="legend">Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="todo" control={<Radio />} label="To Do" />
            <FormControlLabel
              value="reminder"
              control={<Radio />}
              label="Reminder"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          endIcon={<KeyboardArrowRightOutlinedIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
