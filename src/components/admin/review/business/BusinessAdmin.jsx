import React, { PureComponent } from "react";
import BusinessAdminComponent from "./BusinessAdminComponent";
import api from "../../../../constants/api";
import { formRules, formFields } from "./BusinessFormRules";
import axiosConfigAdmin from "../../../../util/aixosConfig";
import {
  checkValidity,
  checkFormValid
} from "../../../../validations/validateFields";
import errorText from "../../../../constants/errorText";

class BusinessAdmin extends PureComponent {
  constructor() {
    super();
    this.state = {
      formData: {},
      formRules: formRules,
      loadingPost: false
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ formData: { ...data } });
  }

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

    this.props.handleChange(data, "businessInfo");

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

    this.props.handleChange(data, "businessInfo");
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
    const {
      userId,
      dedicatedOffSpace,
      insuranceExp,
      monAvgBusLp,
      monAvgBusMtr,
      monAvgBusMtrH,
      primaryIncome,
      remarks,
      formStatus
    } = this.props.data.formData;
    const { openSnackbar } = this.props;
    this.setState({ loadingPost: true });
    const payload = {
      userId,
      dedicatedOffSpace,
      insuranceExp,
      monAvgBusLp,
      monAvgBusMtr,
      monAvgBusMtrH,
      primaryIncome,
      remarks,
      formStatus
    };
    axiosConfigAdmin({
      method: "post",
      url: api.POST_BUSINESS_INFO,
      data: payload
    })
      .then(response => {
        if (response.data.status.toUpperCase() === "TRUE") {
          openSnackbar(
            "Business " + errorText.INFORMATION_UPDATE_SUCCESS,
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
      <BusinessAdminComponent
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

export default BusinessAdmin;
