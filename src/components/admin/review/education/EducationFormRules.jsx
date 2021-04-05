import {
  educationQualification,
  formStatusMenu
} from "../../../../constants/selectMenu";

const formFields = [
  {
    id: "rollNumber",
    label: "Roll Number",
    type: "text"
  },
  {
    id: "yearOfPassing",
    label: "Year of Passing",
    inputType: "number",
    onInput: {
      maxLength: 4
    },
    type: "text"
  },
  {
    id: "qualification",
    label: "Document Submitted",
    type: "select",
    selectMenu: educationQualification
  },

  {
    id: "remarks",
    label: "Remarks (Visible to user)",
    type: "text",
    multiline: true
  },
  {
    id: "formStatus",
    label: "Form Status",
    type: "select",
    selectMenu: formStatusMenu
  }
];

const formRules = {
  rollNumber: {
    validations: {
      required: true
    },
    valid: true
  },
  yearOfPassing: {
    validations: {
      required: true
    },
    valid: true
  },
  qualification: {
    valid: true,
    validations: {
      required: true
    }
  },
  remarks: {
    valid: true,
    validations: {}
  },
  formStatus: {
    validations: {
      required: true
    },
    valid: true
  }
};

export { formRules, formFields };
