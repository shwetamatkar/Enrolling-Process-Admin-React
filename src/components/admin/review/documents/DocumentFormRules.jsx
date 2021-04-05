import { formStatusMenu } from "../../../../constants/selectMenu";

const formFields = [
  {
    id: "panCardNo",
    label: "Pan Card",
    type: "text"
  },

  {
    id: "adhaarNo",
    label: "Aadhar Card",
    inputType: "number",
    onInput: {
      maxLength: 12
    },
    type: "text"
  },
  {
    id: "remarks",
    label: "Remarks (Visible to user)",
    multiline: true,
    type: "text"
  },
  {
    id: "formStatus",
    label: "Form Status",
    type: "select",
    selectMenu: formStatusMenu
  }
];

const formRules = {
  panCardNo: {
    validations: {
      required: true,
      panCard: true
    },
    valid: true
  },
  adhaarNo: {
    validations: {
      required: true,
      aadharCard: true
    },
    valid: true
  },
  remarks: {
    validations: {},
    valid: true
  },
  formStatus: {
    validations: {
      required: true
    },
    valid: true
  }
};

export { formRules, formFields };
