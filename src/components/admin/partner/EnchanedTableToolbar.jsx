import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FilterListIcon from "@material-ui/icons/FilterList";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { CSVLink } from "react-csv";

const headers = [
  { label: "DP Number", key: "dpnumber" },
  { label: "Full Name", key: "fullName" },
  { label: "Sales Executive", key: "salesExecutive" },
  { label: "Creation Date", key: "creationDate" },
  { label: "Verification Date", key: "verificationDate" },
  { label: "Profile Status", key: "profileStatus" },
  { label: "Enrollment Status", key: "enrollmentStatus" },
  { label: "Active/Inactive", key: "isActive" }
];

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        {props.title}
      </Typography>

      <CSVLink
        data={props.exportData}
        headers={headers}
        filename={"posp_applications.csv"}
        style={{ textDecoration: "none" }}
      >
        <Button variant="contained" disableElevation>
          Export
        </Button>
      </CSVLink>
      {/* <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip> */}
    </Toolbar>
  );
};

const useToolbarStyles = makeStyles({
  title: {
    flex: "1 1 100%"
  }
});

export default EnhancedTableToolbar;
