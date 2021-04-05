import React, { Component } from "react";
import PartnerComponent from "./PartnerComponent";
import axiosConfigAdmin from "../../../util/aixosConfig";
import api from "../../../constants/api";

class Partner extends Component {
  constructor() {
    super();
    this.state = {
      partners: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    axiosConfigAdmin({
      method: "get",
      url: api.GET_PARTNER_DATA
    }).then(response => {
      this.setState({
        partners: response.data,
        loading: false
      });
    });
  };

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    } else
      return (
        <PartnerComponent data={this.props} partners={this.state.partners} />
      );
  }
}

export default Partner;
