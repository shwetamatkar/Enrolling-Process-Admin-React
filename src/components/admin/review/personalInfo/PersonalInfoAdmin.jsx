import React, { PureComponent } from "react";
import PersonalInfoAdminComponent from "./PersonalInfoAdminComponent";
import api from "../../../../constants/api";
import { formFields } from "./PersonalInfoFormRules";
import axiosConfigAdmin from "../../../../util/aixosConfig";
import {
  checkValidity,
  checkFormValid
} from "../../../../validations/validateFields";
import errorText from "../../../../constants/errorText";

class PersonalInfoAdmin extends PureComponent {
  constructor() {
    super();
    this.state = {
      loadingPost: false
    };
  }

  // componentDidMount() {
  //   const { data } = this.props;
  //   this.setState({
  //     formData: { ...data.formData },
  //     formRules: { ...data.formRules }
  //   });
  // }

  handleInternalDateChange = (date, id) => {
    const { formData, formRules } = this.props.data;

    let previousData = formData;
    let previousRules = formRules;
    let validations = previousRules[id].validations;
    const [validity, message] = checkValidity(date, validations);

    previousRules[id].valid = validity;
    previousRules[id].message = message;
    previousData[id] = date;

    const data = {
      formData: previousData,
      formRules: formRules
    };

    this.props.handleChange(data, "personalInfo");

    // this.setState({
    //   formData: { ...previousData, [id]: date },
    //   formRules: {
    //     ...previousRules
    //   }
    // });
  };

  handleInternalChange = event => {
    const { formData, formRules } = this.props.data;
    const { name, value } = event.target;
    let previousData = formData;
    let previousRules = formRules;
    let validations = previousRules[name].validations;

    const [validity, message] = checkValidity(value, validations);

    previousRules[name].valid = validity;
    previousRules[name].message = message;
    previousData[name] = value.toUpperCase();

    const data = {
      formData: previousData,
      formRules: formRules
    };

    // this.setState({
    //   formData: { ...previousData, [name]: value },
    //   formRules: {
    //     ...previousRules
    //   }
    // });

    this.props.handleChange(data, "personalInfo");
  };

  handleSubmit = () => {
    const { formRules } = this.props.data;
    const { openSnackbar } = this.props;

    if (checkFormValid(formRules)) {
      this.postPersonalInfo();
    } else {
      openSnackbar(errorText.INFORMATION_UPDATE_ERROR, "error");
    }
  };

  postPersonalInfo = () => {
    const { openSnackbar } = this.props;
    this.setState({ loadingPost: true });
    const payload = {
      ...this.props.data.formData
    };
    axiosConfigAdmin({
      method: "post",
      url: api.REGISTER_PERSONAL_INFO,
      data: payload
    })
      .then(response => {
        if (response.data.status.toUpperCase() === "TRUE") {
          openSnackbar(
            `Personal ${errorText.INFORMATION_UPDATE_SUCCESS}`,
            "success"
          );
          this.setState({
            loadingPost: false
          });
        } else {
          openSnackbar(errorText.INFORMATION_UPDATE_ERROR, "error");
          this.setState({
            loadingPost: false
          });
          // Error Condition
        }
      })
      .catch(() => {
        openSnackbar(errorText.INFORMATION_UPDATE_ERROR, "error");
        this.setState({
          loadingPost: false
        });
        // Error Condition
      });

    // API Call
  };

  render() {
    const { formRules, formData } = this.props.data;
    return (
      <PersonalInfoAdminComponent
        handleDateChange={this.handleInternalDateChange}
        handleChange={this.handleInternalChange}
        handleSubmit={this.handleSubmit}
        data={formData}
        formRules={formRules}
        formFields={formFields}
        loadingPost={this.state.loadingPost}
      />
    );
  }
}

export default PersonalInfoAdmin;
