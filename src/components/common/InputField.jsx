import React from "react";
import TextField from "@material-ui/core/TextField";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { MenuItem } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const onInputCheck = (e, validity, props) => {
  if (validity.fetchCity) {
    if (e.target.value.length === validity.fetchCity) {
      props.getPinCodeMaster(e.target.value);
    }
  }

  if (validity.maxLength) {
    if (e.target.value.length > 0) {
      return (e.target.value = Math.max(0, parseInt(e.target.value))
        .toString()
        .slice(0, validity.maxLength));
    }
  }
};

function InputField(props) {
  const { item, formRules, formData } = props;

  const classes = useStyles();

  let FieldType = null;

  switch (item.type) {
    case "text": {
      FieldType = (
        <TextField
          key={item.id}
          disabled={formRules.disabled != null ? formRules.disabled : false}
          value={formData !== null ? formData : ""}
          multiline={item.multiline != null ? item.multiline : false}
          error={!formRules.valid}
          helperText={formRules.message}
          name={item.id}
          fullWidth
          id={item.id}
          onChange={props.handleChange}
          inputProps={"inputProps" in item ? item.inputProps : {}}
          onInput={
            "onInput" in item ? e => onInputCheck(e, item.onInput, props) : null
          }
          type={"inputType" in item ? item.inputType : "text"}
        />
      );
      break;
    }
    case "date": {
      FieldType = (
        <MuiPickersUtilsProvider utils={MomentUtils} key={item.id}>
          <KeyboardDatePicker
            format="DD-MMM-YYYY"
            fullWidth
            disableFuture
            disabled={formRules.disabled != null ? formRules.disabled : false}
            error={!formRules.valid}
            helperText={formRules.message}
            value={formData !== null ? new Date(formData) : new Date()}
            onChange={date => props.handleDateChange(date, item.id)}
          />
        </MuiPickersUtilsProvider>
      );
      break;
    }
    case "select": {
      FieldType = (
        <TextField
          key={item.id}
          disabled={formRules.disabled != null ? formRules.disabled : false}
          error={!formRules.valid}
          helperText={formRules.message}
          name={item.id}
          value={formData != null ? formData : ""}
          fullWidth
          select
          id={item.id}
          onChange={props.handleChange}
        >
          {item.selectMenu.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
      break;
    }
    default: {
      FieldType = (
        <TextField
          key={item.id}
          disabled={formRules.disabled != null ? formRules.disabled : false}
          value={formData !== null ? formData : ""}
          multiline={item.multiline != null ? item.multiline : false}
          error={!formRules.valid}
          helperText={formRules.message}
          name={item.id}
          fullWidth
          id={item.id}
          onChange={props.handleChange}
          inputProps={"inputProps" in item ? item.inputProps : {}}
          onInput={
            "onInput" in item ? e => onInputCheck(e, item.onInput, props) : null
          }
          type={"inputType" in item ? item.inputType : "text"}
        />
      );
    }
  }

  return (
    <Grid container className={classes.field} key={item.id}>
      <Grid item xs={6}>
        <Typography>{item.label}</Typography>
      </Grid>
      <Grid item xs={6}>
        {FieldType}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 25
  },
  textTitle: {
    color: "#616161"
  },
  field: {
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1)
  }
}));

export default React.memo(InputField);
