import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    title: {
      padding: theme.spacing(2),
    },
    page: {
      backgroundColor: "#f9f9f9",
      width: "100%",
      // theme objects method spacing
      // default spacing is 8px, here 3x8=24px
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      backgroundColor: "#f4f4f4",
    },
  };
});

export default function Layout({ children }) {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
      {/* side bar */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        // this classes property is for overriding the existing default drawer properties
        classes={{ paper: classes.drawerPaper }}
      >
        <Typography className={classes.title} color="secondary" variant="h5">
          My Notes App
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {console.log(location.pathname)}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div>{children}</div>
      </div>
    </div>
  );
}
