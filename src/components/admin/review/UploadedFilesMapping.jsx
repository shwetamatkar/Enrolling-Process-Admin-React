const uploadedFileMapping = [
  {
    name: "Pan Card",
    id: "panCard",
    obj: "docUploadInfo",
    statuskey: "panStatus"
  },
  {
    name: "Aadhar Card Front",
    id: "aadharCardFront",
    obj: "docUploadInfo",
    statuskey: "adhaarStatus"
  },
  {
    name: "Aadhar Card Back",
    id: "aadharCardBack",
    obj: "docUploadInfo",
    statuskey: "adhaarbStatus"
  },
  {
    name: "Address Proof",
    id: "addressProof",
    obj: "docUploadInfo",
    statuskey: "adhaarbStatus"
  },
  {
    name: "Proof of Identity",
    id: "identityProof",
    obj: "docUploadInfo",
    statuskey: "identityProofStatus"
  },
  {
    name: "Profile Image",
    id: "profileImage",
    obj: "docUploadInfo",
    statuskey: "profileImageStatus"
  },
  {
    name: "Education Proof",
    id: "educationProof",
    obj: "educationInfo",
    statuskey: "certificateStatus"
  },
  {
    name: "Bank Proof",
    id: "bankProof",
    obj: "bankInfo",
    statuskey: "bankUploadStatus"
  }
];

const documentInfoDepended = [
  "panStatus",
  "adhaarStatus",
  "adhaarbStatus",
  "identityProofStatus",
  "profileImageStatus"
];

const educationInfoDepended = ["certificateStatus"];

const bankInfoDepended = ["bankUploadStatus"];

export {
  uploadedFileMapping,
  documentInfoDepended,
  educationInfoDepended,
  bankInfoDepended
};
