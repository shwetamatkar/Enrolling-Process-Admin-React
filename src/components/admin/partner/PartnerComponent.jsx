import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DataTable from "./DataTable";
import paths from "../../../constants/paths";

function Partner(props) {
  const classes = useStyles();

  const headCells = [
    {
      id: "dpnumber",
      numeric: false,
      disablePadding: false,
      label: "DP Number"
    },
    {
      id: "fullName",
      numeric: false,
      disablePadding: false,
      label: "Full Name"
    },
    {
      id: "salesExecutive",
      numeric: false,
      disablePadding: false,
      label: "Sales Executive"
    },
    {
      id: "creationDate",
      numeric: false,
      disablePadding: false,
      label: "Creation Date"
    },
    {
      id: "verificationDate",
      numeric: false,
      disablePadding: false,
      label: "Verification Date"
    },
    {
      id: "profileStatus",
      numeric: false,
      disablePadding: false,
      label: "Profile Status"
    },
    {
      id: "enrollmentStatus",
      numeric: false,
      disablePadding: false,
      label: "Enrollment Status"
    },
    {
      id: "isActive",
      numeric: false,
      disablePadding: false,
      label: "Active/Inactive"
    }
  ];

  const handleRowClick = data => {
    props.data.history.push(paths.ADMIN_REVIEW, data.dpnumber);
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <DataTable
          headCells={headCells}
          rows={props.partners}
          onRowClick={handleRowClick}
        />
      </div>
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

export default Partner;
