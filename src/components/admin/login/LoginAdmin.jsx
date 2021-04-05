import React, { Component } from "react";
import LoginAdminComponent from "./LoginAdminComponent";
import {
  checkValidity,
  checkFormValid
} from "../../../validations/validateFields";
import errorText from "../../../constants/errorText";
import api from "../../../constants/api";
import axiosConfigAdmin from "../../../util/aixosConfig";
import paths from "../../../constants/paths";
import AuthService from "../../../authentication/AuthService";

class LoginAdmin extends Component {
  constructor() {
    super();
    this.state = {
      formRules: {
        username: {
          validations: {
            required: true
          },
          valid: true,
          error: ""
        },
        password: {
          validations: {
            required: true
          },
          valid: true,
          error: ""
        }
      },
      formData: {
        username: "",
        password: ""
      },
      error: {},
      helper: {},
      failedLogin: "",
      touched: false,
      loadingPost: false
    };
  }

  componentDidMount() {
    if (AuthService.checkAuthenticated()) {
      this.props.history.push(paths.ADMIN_PARTNER);
    }
  }

  handleChange = event => {
    const { formData, formRules } = this.state;
    const { name, value } = event.target;
    let previousData = formData;
    let previousRules = formRules;
    let validations = previousRules[name].validations;

    const [validity] = checkValidity(value, validations);

    previousRules[name].valid = validity;
    previousRules[name].message = "";

    this.setState({
      formData: { ...previousData, [name]: value },
      formRules: {
        ...previousRules
      },
      touched: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { touched, formRules } = this.state;

    this.setState({
      failedLogin: ""
    });

    if (!touched) {
      let previousFormRules = formRules;
      for (let key in formRules) {
        previousFormRules[key].valid = false;
      }
      this.setState({
        formRules: { ...previousFormRules }
      });
    } else if (checkFormValid(formRules)) {
      this.postLoginInfo();
    }
  };

  checkLoginId = username => {
    if (username.includes("@")) {
      return username;
    } else {
      return username + "@smtech.net";
    }
  };

  postLoginInfo = () => {
    const {
      formData: { username }
    } = this.state;
    this.setState({ loadingPost: true });
    let payload = {
      ...this.state.formData
    };

    payload = { ...payload, username: this.checkLoginId(username) };

    axiosConfigAdmin({
      method: "post",
      url: api.POST_ADMIN_LOGIN_INFO,
      data: payload
    })
      .then(response => {
        if (response.data.status.toUpperCase() === "TRUE") {
          this.setState({
            loadingPost: false
          });
          sessionStorage.setItem("TOKEN", response.headers.token);
          this.props.history.replace({
            pathname: paths.ADMIN_PARTNER
          });
        } else {
          this.setState({
            loadingPost: false,
            failedLogin: errorText.INVALID_LOGIN_CREDENTIALS
          });
          // Error Condition
        }
      })
      .catch(() => {
        this.setState({
          loadingPost: false,
          failedLogin: errorText.ERROR_INFORMATION_FETCH
        });
        // Error Condition
      });

    // API Call
  };

  render() {
    const { formData, formRules, loadingPost, failedLogin } = this.state;

    return (
      <LoginAdminComponent
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        formData={formData}
        formRules={formRules}
        loadingPost={loadingPost}
        failedLogin={failedLogin}
      />
    );
  }
}

export default LoginAdmin;
