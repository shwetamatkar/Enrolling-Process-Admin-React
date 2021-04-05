import React, { PureComponent } from "react";
import BankDetailsAdminComponent from "./BankDetailsAdminComponent";
import api from "../../../../constants/api";
import { formFields } from "./BankFormRules";
import axiosConfigAdmin from "../../../../util/aixosConfig";
import {
  checkValidity,
  checkFormValid
} from "../../../../validations/validateFields";
import errorText from "../../../../constants/errorText";
import { bankInfoDepended } from "../UploadedFilesMapping";

class BankDetailsAdmin extends PureComponent {
  constructor() {
    super();
    this.state = {
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

    this.props.handleChange(data, "bankInfo");

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

    this.props.handleChange(data, "bankInfo");
  };

  handleSubmit = () => {
    const { formRules, formData } = this.props.data;
    const { openSnackbar } = this.props;

    if (checkFormValid(formRules)) {
      if (this.checkDocumentStatus(formData)) {
        this.postPersonalInfo();
      } else {
        openSnackbar(errorText.DOCUMENT_UPLOADED_STATUS, "error");
      }
    } else {
      openSnackbar(errorText.INFORMATION_UPDATE_ERROR, "error");
    }
  };

  checkDocumentStatus = formData => {
    let status = true;
    const dependedStatus = bankInfoDepended;

    if (formData.formStatus === "APPROVED") {
      dependedStatus.forEach(key => {
        if (
          ["PENDING", "REJECTED"].includes(formData[key]) &&
          status === true
        ) {
          status = false;
        }
      });
    }
    return status;
  };

  postPersonalInfo = () => {
    const {
      userId,
      bankName,
      holderName,
      accountNumber,
      ifscCode,
      formStatus,
      remarks
    } = this.props.data.formData;
    const { openSnackbar } = this.props;
    this.setState({ loadingPost: true });
    const payload = {
      userId,
      bankName,
      holderName,
      accountNumber,
      ifscCode,
      formStatus,
      remarks
    };
    axiosConfigAdmin({
      method: "post",
      url: api.POST_BANK_DETAILS,
      data: payload
    })
      .then(response => {
        if (response.data.status.toUpperCase() === "TRUE") {
          openSnackbar(
            "Bank " + errorText.INFORMATION_UPDATE_SUCCESS,
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
      <BankDetailsAdminComponent
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

export default BankDetailsAdmin;
