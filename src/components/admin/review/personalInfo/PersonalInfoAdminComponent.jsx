import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "../../../common/SubmitButton";
import InputField from "../../../common/InputField";

function PersonalInfoAdminComponent(props) {
  const { data, formRules, formFields, loadingPost } = props;
  const classes = useStyles();

  const PageFields = formFields.map(function(item) {
    let FieldType = null;

    FieldType = (
      <InputField
        key={item.id}
        item={item}
        formData={data[item.id]}
        formRules={formRules[item.id]}
        disableFields={data.disableFields}
        handleChange={props.handleChange}
        handleDateChange={props.handleDateChange}
        // getPinCodeMaster={props.getPinCodeMaster}
      />
    );

    return FieldType;
  });

  return (
    <div>
      <Grid container className={classes.container}>
        {PageFields}
      </Grid>
      <SubmitButton
        loading={loadingPost}
        onClick={props.handleSubmit}
        label={"Update"}
      />
    </div>
  );
}

PersonalInfoAdminComponent.defaultProps = {
  userData: {}
};

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

export default PersonalInfoAdminComponent;
