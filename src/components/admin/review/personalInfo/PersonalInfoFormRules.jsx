import {
  maritalStatus,
  channelType,
  formStatusMenu
} from "../../../../constants/selectMenu";

const formFields = [
  {
    label: "User Type",
    id: "userType",
    type: "text"
  },
  {
    label: "User Id",
    id: "userId",
    type: "text"
  },
  {
    label: "Organisation",
    id: "organisation",
    type: "text"
  },
  {
    label: "Creation Date",
    id: "dtCreated",
    type: "date"
  },
  {
    id: "fullName",
    label: "Full Name",
    type: "text"
  },
  {
    label: "Name Alias 1",
    id: "nameAlias1",
    type: "text"
  },
  {
    label: "Name Alias 2",
    id: "nameAlias2",
    type: "text"
  },
  {
    id: "emailAddress",
    label: "Email Address",
    type: "text"
  },
  {
    id: "mobileNumber",
    label: "Mobile Number",
    inputType: "number",
    onInput: {
      maxLength: 10
      // fetchCity: 6
    },
    type: "text"
  },
  {
    id: "alternateMobile",
    label: "Alternate Mobile Number",
    inputType: "number",
    onInput: {
      maxLength: 10
      // fetchCity: 6
    },
    type: "text"
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    type: "date"
  },
  {
    id: "maritalStatus",
    label: "Marital Status",
    type: "select",
    selectMenu: maritalStatus
  },
  {
    id: "address",
    label: "Address (As per Aadhar card)",
    type: "text",
    multiline: true
  },
  {
    id: "pincode",
    label: "Pin Code",
    type: "text",
    inputType: "number",
    onInput: {
      maxLength: 6
      // fetchCity: 6
    }
  },
  {
    id: "city",
    label: "City",
    type: "text"
  },
  {
    id: "state",
    label: "State",
    type: "text"
  },
  {
    id: "channelType",
    label: "Channel Type",
    type: "select",
    selectMenu: channelType
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
  userType: {
    validations: {},
    valid: true
  },
  userId: {
    validations: {
      required: true
    },
    valid: true,
    disabled: true
  },
  organisation: {
    validations: {},
    valid: true
  },
  dtCreated: {
    validations: {},
    valid: true,
    disabled: true
  },
  fullName: {
    validations: {
      required: true
    },
    valid: true
  },
  nameAlias1: {
    validations: {},
    valid: true
  },
  nameAlias2: {
    validations: {},
    valid: true
  },
  emailAddress: {
    validations: {
      required: true,
      emailAddress: true
    },
    valid: true
  },
  mobileNumber: {
    validations: {
      required: true
    },
    valid: true
  },
  alternateMobile: {
    validations: {
      required: true
    },
    valid: true
  },
  dateOfBirth: {
    validations: {
      dateOfBirthCheck: true
    },
    valid: true
  },
  maritalStatus: {
    validations: {
      required: true
    },
    valid: true
  },
  address: {
    validations: {
      required: true
    },
    valid: true
  },
  pincode: {
    validations: {
      required: true
    },
    valid: true
  },
  city: {
    validations: {
      required: true
    },
    valid: true,
    disabled: true
  },
  state: {
    validations: {
      required: true
    },
    valid: true,
    disabled: true
  },
  channelType: {
    validations: {
      required: true
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
