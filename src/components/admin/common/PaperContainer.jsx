import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import constants from "../../../constants/constants";

function PaperContainer(props) {
  const { title, status, children, refProp } = props;
  const { statusColor } = constants;
  const classes = useStyles();
  let textStatusColor = statusColor.pending;
  switch (status) {
    case "PENDING": {
      textStatusColor = statusColor.pending;
      break;
    }
    case "SUBMITTED": {
      textStatusColor = statusColor.submitted;
      break;
    }
    case "REJECTED": {
      textStatusColor = statusColor.rejected;
      break;
    }
    case "APPROVED": {
      textStatusColor = statusColor.approved;
      break;
    }
    default: {
      textStatusColor = statusColor.pending;
      break;
    }
  }

  return (
    <div className={classes.root} ref={refProp}>
      <Paper className={classes.paper}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Typography
            align={"right"}
            style={{ color: textStatusColor, fontWeight: "500" }}
          >
            {status}
          </Typography>
        </div>
        {children}
      </Paper>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    },
    padding: theme.spacing(1)
  },
  title: {
    fontWeight: "bold"
  },
  paper: {
    padding: theme.spacing(3)
  }
}));

export default React.memo(PaperContainer);
