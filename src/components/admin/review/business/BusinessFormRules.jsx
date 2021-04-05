import {
  formStatusMenu,
  primarySourceIncome,
  yesNo,
  slab
} from "../../../../constants/selectMenu";

const formFields = [
  {
    id: "primaryIncome",
    label: "Primary Source of Income",
    type: "select",
    selectMenu: primarySourceIncome
  },
  {
    id: "insuranceExp",
    label: "Years of Experience in Insurance",
    type: "text",
    inputType: "number",
    onInput: {
      maxLength: 2
    }
  },
  {
    id: "dedicatedOffSpace",
    label: "Dedicated Office",
    type: "select",
    selectMenu: yesNo
  },
  {
    id: "monAvgBusMtr",
    label: "Motor Premium Average Business",
    type: "select",
    selectMenu: slab
  },
  {
    id: "monAvgBusMtrH",
    label: "Health Premium Average Business",
    type: "select",
    selectMenu: slab
  },
  {
    id: "monAvgBusLp",
    label: "Life Premium Average Business",
    type: "select",
    selectMenu: slab
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
  primaryIncome: {
    validations: {
      required: true
    },
    valid: true
  },
  insuranceExp: {
    validations: {
      required: true
    },
    valid: true
  },
  dedicatedOffSpace: {
    validations: {
      required: true
    },
    valid: true
  },
  monAvgBusMtr: {
    validations: {
      required: true
    },
    valid: true
  },
  monAvgBusMtrH: {
    validations: {
      required: true
    },
    valid: true
  },
  monAvgBusLp: {
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
