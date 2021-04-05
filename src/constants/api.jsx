const api = {
  GET_PERSONAL_INFO: "admin/personalinfo/getpersonalinfo",
  REGISTER_PERSONAL_INFO: "admin/personalinfo/update",
  GET_EDUCATION_DETAILS: "admin/educationdtls/geteducationinfo",
  POST_EDUCATION_DETAILS: "admin/educationdtls/upload",
  POST_BANK_DETAILS: "admin/bankdetails/upload",
  GET_BANK_DETAILS: "admin/bankdetails/getbankinfo",
  POST_BUSINESS_INFO: "admin/businessinfo/update",
  GET_BUSINESS_INFO: "admin/businessinfo/getbusinessinfo",
  POST_DOCUMENT_UPLOAD: "admin/docupload/upload",
  GET_DOCUMENT_UPLOAD: "admin/docupload/getdocinfo",
  GET_CITY_STATE: "admin/getstateandcity",
  GET_FILE: "admin/getfiles",
  GET_MASTER_DATA: "admin/masterdata/getmasterdata",
  GET_PARTNER_DATA: "admin/partner/getuserdata",
  POST_DOCUMENT_STATUS: "admin/adminapproval",
  POST_ADMIN_LOGIN_INFO: "/auth/login"
};

export default api;
