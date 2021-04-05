import { formStatusMenu } from "../../../../constants/selectMenu";

const formFields = [
  {
    id: "bankName",
    label: "Bank Name",
    autoFocus: true,
    type: "text"
  },
  {
    id: "holderName",
    label: "Account Holder Name",
    autoFocus: false,
    type: "text"
  },
  {
    id: "accountNumber",
    label: "Account Number",
    autoFocus: false,
    type: "text"
  },
  {
    id: "ifscCode",
    label: "IFSC",
    autoFocus: false,
    type: "text",
    inputType: "number",
    onInput: {
      maxLength: 11
    }
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
  bankName: {
    validations: {
      required: true
    },
    valid: true
  },
  holderName: {
    validations: {
      required: true
    },
    valid: true
  },
  accountNumber: {
    valid: true,
    validations: {
      required: true
    }
  },
  ifscCode: {
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
