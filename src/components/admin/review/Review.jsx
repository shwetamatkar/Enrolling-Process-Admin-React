import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import FilesContainer from "../common/FilesContainer";
import PaperContainer from "../common/PaperContainer";
import NavigationContainer from "../common/NavigationContainer";
import PersonalInfoAdmin from "./personalInfo/PersonalInfoAdmin";
import BankDetailsAdmin from "./bank/BankDetailsAdmin";
import EducationAdmin from "./education/EducationAdmin";
import DocumentAdmin from "./documents/DocumentAdmin";
import BusinessAdmin from "./business/BusinessAdmin";
import { formRules as personalInfoRules } from "./personalInfo/PersonalInfoFormRules";
import { formRules as educationInfoRules } from "./education/EducationFormRules";
import { formRules as bankInfoRules } from "./bank/BankFormRules";
import { formRules as docUploadInfoRules } from "./documents/DocumentFormRules";
import { formRules as businessInfoRules } from "./business/BusinessFormRules";
import { uploadedFileMapping } from "./UploadedFilesMapping";
import axiosConfigAdmin from "../../../util/aixosConfig";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import AlertBar from "../../common/AlertBar";
import api from "../../../constants/api";
import PacmanLoader from "react-spinners/PacmanLoader";
import errorText from "../../../constants/errorText";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { PdfReader } from "../../pdfreader/PdfReader";

const navigationItems = [
  { name: "Personal Information", ref: "personalInfoRef" },
  { name: "Education Details", ref: "educationDtlsRef" },
  { name: "Bank Details", ref: "bankDtlsRef" },
  { name: "Documents Details", ref: "documentRef" },
  { name: "Business Information", ref: "businessRef" }
];

const filesUploaded = uploadedFileMapping;

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isPDFOpen: false,
      userData: {},
      loading: true,
      snackBar: {
        status: false
      },
      base64String: null,
      document: {},
      personalInfo: {
        formData: {},
        formRules: {}
      },
      educationInfo: {
        formData: {},
        formRules: {}
      },
      bankInfo: {
        formData: {},
        formRules: {}
      },
      docUploadInfo: {
        formData: {},
        formRules: {}
      },
      businessInfo: {
        formData: {},
        formRules: {}
      },
      fileModified: false
    };

    this.personalInfoRef = React.createRef();
    this.educationDtlsRef = React.createRef();
    this.bankDtlsRef = React.createRef();
    this.documentRef = React.createRef();
    this.businessRef = React.createRef();
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    axiosConfigAdmin({
      method: "post",
      url: api.GET_MASTER_DATA,
      data: { userId: this.props.location.state }
    }).then(response => {
      const { data } = response;
      if (data != null) {
        this.setState(
          {
            personalInfo: {
              formData: data.personalInfo,
              formRules: personalInfoRules
            },
            educationInfo: {
              formData: data.educationInfo,
              formRules: educationInfoRules
            },
            bankInfo: {
              formData: data.bankInfo,
              formRules: bankInfoRules
            },
            docUploadInfo: {
              formData: data.docUploadInfo,
              formRules: docUploadInfoRules
            },
            businessInfo: {
              formData: data.businessInfo,
              formRules: businessInfoRules
            },
            loading: false
          },
          () => this.mapFilesWithData()
        );
      }
    });
  };

  mapFilesWithData = () => {
    const { bankInfo, docUploadInfo, personalInfo, educationInfo } = this.state;
    // panCard
    filesUploaded[0].value = `Pan Card: ${docUploadInfo.formData.panCardNo}`;
    filesUploaded[0].status = docUploadInfo.formData.panStatus;
    // aadharCardFront
    filesUploaded[1].value = `Aadhar Number: ${docUploadInfo.formData.adhaarNo} | DOB: ${personalInfo.formData.dateOfBirth}`;
    filesUploaded[1].status = docUploadInfo.formData.adhaarStatus;
    // aadharCardBack
    filesUploaded[2].value = `Address Entered: ${personalInfo.formData.address}`;
    filesUploaded[2].status = docUploadInfo.formData.adhaarbStatus;
    // addressProof
    filesUploaded[3].value = `Address Entered: ${personalInfo.formData.address}`;
    filesUploaded[3].status = docUploadInfo.formData.adhaarStatus; // Same as Aadhar
    // Identity Proof
    filesUploaded[4].value = "";
    filesUploaded[4].status = docUploadInfo.formData.identityProofStatus;
    // Profile Image
    filesUploaded[5].value = "";
    filesUploaded[5].status = docUploadInfo.formData.profileImageStatus;
    // educationProof
    filesUploaded[6].value = `Document Uploaded For: ${educationInfo.formData.qualification}`;
    filesUploaded[6].status = educationInfo.formData.certificateStatus;
    // bankProof
    filesUploaded[7].value = `Document Uploaded: ${bankInfo.formData.documentUploaded} | Account Number Entered: ${bankInfo.formData.accountNumber} | IFSC Code Entered: ${bankInfo.formData.ifscCode} | Bank Name Entered: ${bankInfo.formData.bankName}`;
    filesUploaded[7].status = bankInfo.formData.bankUploadStatus;
  };

  scrollToMyRef = ref => {
    window.scrollTo(0, this[ref].current.offsetTop);
  };

  handleFileSelect = (data, option) => {
    switch (option) {
      case "View": {
        this.setState({
          document: {
            name: data.name,
            value: data.value,
            id: data.id
          }
        });
        this.getUploadedFile(data.id);
        break;
      }
      case "Approve": {
        this.changeDocumentStatus(data.id, "APPROVED");
        break;
      }
      case "Reject": {
        this.changeDocumentStatus(data.id, "REJECTED");
        break;
      }
      default: {
        this.setState({
          document: {
            name: data.name,
            value: data.value,
            id: data.id
          }
        });
        this.getUploadedFile(data.id);
      }
    }
  };

  getUploadedFile = id => {
    axiosConfigAdmin({
      method: "post",
      url: api.GET_FILE,
      data: { userId: this.props.location.state, document: id }
    })
      .then(response => {
        const {
          data: { encodedString, status, extention }
        } = response;
        if (status === "TRUE") {
          if ([".jpg", ".png", ".jpeg", ".jfif"].includes(extention)) {
            this.setState({ base64String: encodedString, isOpen: true });
          } else if ([".pdf"].includes(extention)) {
            this.setState({ base64String: encodedString, isPDFOpen: true });
          }
        } else {
          this.openSnackbar(errorText.ERROR_INFORMATION_FETCH, "error");
        }
      })
      .catch(response => {
        this.openSnackbar(response.toString(), "error");
      });
  };

  changeDocumentStatus = (document, documentStatus) => {
    axiosConfigAdmin({
      method: "post",
      url: api.POST_DOCUMENT_STATUS,
      data: {
        userId: this.props.location.state,
        document,
        status: documentStatus
      }
    })
      .then(response => {
        const {
          data: { status }
        } = response;
        if (status === "TRUE") {
          let index = filesUploaded.findIndex(item => item.id === document);
          filesUploaded[index].status = documentStatus;
          let item = filesUploaded[index];
          this.setState({
            [item.obj]: {
              ...this.state[item.obj],
              formData: {
                ...this.state[item.obj].formData,
                [item.statuskey]: documentStatus
              }
            },
            fileModified: !this.state.fileModified
          });
          this.openSnackbar(errorText.INFORMATION_UPDATE_SUCCESS, "success");
        } else {
          this.openSnackbar(errorText.INFORMATION_UPDATE_ERROR, "error");
        }
      })
      .catch(response => {
        this.openSnackbar(response.toString(), "error");
      });
  };

  handleChange = (data, id) => {
    this.setState({ [id]: data });
  };

  openSnackbar = (message, severity) => {
    this.setState({
      snackBar: {
        status: true,
        message,
        severity
      }
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackBar: {
        status: false
      }
    });
  };

  render() {
    const {
      document,
      isOpen,
      isPDFOpen,
      loading,
      personalInfo,
      educationInfo,
      bankInfo,
      businessInfo,
      docUploadInfo,
      snackBar,
      base64String,
      fileModified
    } = this.state;

    const ApproveButton = (
      <Button
        variant="contained"
        color={"primary"}
        onClick={() => this.changeDocumentStatus(document.id, "APPROVED")}
      >
        Approve
      </Button>
    );

    const RejectButton = (
      <Button
        variant="contained"
        color={"primary"}
        style={{ marginLeft: 10 }}
        onClick={() => this.changeDocumentStatus(document.id, "REJECTED")}
      >
        Reject
      </Button>
    );

    if (loading) {
      return (
        <div
          style={{
            padding: 150,
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PacmanLoader size={50} color="#01afcb" />
        </div>
      );
    } else
      return (
        <div>
          <Grid container style={{ backgroundColor: "#f5f5f5" }}>
            <Modal
              open={isPDFOpen}
              onClose={() => this.setState({ isPDFOpen: false })}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={isPDFOpen}>
                <PdfReader
                  pageSearchField={false}
                  pageNumberField={false}
                  DocumentFile={`data:application/pdf;base64,${base64String}`}
                />
              </Fade>
            </Modal>
            {isOpen && (
              <Lightbox
                mainSrc={`data:image/jpeg;base64,${base64String}`}
                imageTitle={document.name}
                imageCaption={document.value}
                toolbarButtons={[ApproveButton, RejectButton]}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
            )}

            <Hidden xsDown smDown>
              <Grid item md={2}>
                <NavigationContainer
                  items={navigationItems}
                  scrollTo={this.scrollToMyRef}
                />
              </Grid>
            </Hidden>
            <Grid item md={6}>
              <PaperContainer
                refProp={this.personalInfoRef}
                title={"Personal Information"}
                status={personalInfo.formData.formStatus}
              >
                <PersonalInfoAdmin
                  data={personalInfo}
                  openSnackbar={this.openSnackbar}
                  handleChange={this.handleChange}
                />
              </PaperContainer>
              <PaperContainer
                refProp={this.educationDtlsRef}
                title={"Education Details"}
                status={educationInfo.formStatus}
              >
                <EducationAdmin
                  data={educationInfo}
                  openSnackbar={this.openSnackbar}
                  handleChange={this.handleChange}
                />
              </PaperContainer>
              <PaperContainer
                refProp={this.bankDtlsRef}
                title={"Bank Details"}
                status={bankInfo.formStatus}
              >
                <BankDetailsAdmin
                  data={bankInfo}
                  openSnackbar={this.openSnackbar}
                  handleChange={this.handleChange}
                />
              </PaperContainer>
              <PaperContainer
                refProp={this.documentRef}
                title={"Documents Details"}
                status={docUploadInfo.formStatus}
              >
                <DocumentAdmin
                  data={docUploadInfo}
                  openSnackbar={this.openSnackbar}
                  handleChange={this.handleChange}
                />
              </PaperContainer>
              <PaperContainer
                refProp={this.businessRef}
                title={"Business Information"}
                status={businessInfo.formStatus}
              >
                <BusinessAdmin
                  data={businessInfo}
                  openSnackbar={this.openSnackbar}
                  handleChange={this.handleChange}
                />
              </PaperContainer>
            </Grid>
            <Hidden xsDown smDown>
              <Grid item md={4}>
                <FilesContainer
                  items={filesUploaded}
                  scrollTo={this.scrollToMyRef}
                  handleFileSelect={this.handleFileSelect}
                  fileModified={fileModified}
                />
              </Grid>
            </Hidden>
            <AlertBar
              open={snackBar.status}
              onClose={this.closeSnackbar}
              severity={snackBar.severity}
              message={snackBar.message}
            />
          </Grid>
        </div>
      );
  }
}

export default Review;
