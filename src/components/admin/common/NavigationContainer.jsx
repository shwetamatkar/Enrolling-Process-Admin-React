import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function NavigationContainer(props) {
  const { items } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.drawer}>
        {/* <div className={classes.toolbar} /> */}
        {/* <Divider /> */}
        <List>
          {items.map(text => (
            <ListItem
              button
              key={text.ref}
              onClick={() => props.scrollTo(text.ref)}
            >
              <ListItemText primary={text.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%"
  },

  drawer: {
    "& > *": {
      margin: theme.spacing(1)
    },
    borderStyle: "solid",
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#d1d1d1"
  },

  toolbar: theme.mixins.toolbar
}));

export default React.memo(NavigationContainer);
