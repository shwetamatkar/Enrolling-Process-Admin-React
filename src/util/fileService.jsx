import AuthService from "../authentication/AuthService";

function generateFileName(document, key) {
  let fileNameSplit = document.name.split(".");
  let fileNameExtension = fileNameSplit[fileNameSplit.length - 1];

  let newFileName =
    AuthService.getUserInfo().mobile +
    key +
    Date.now() +
    "." +
    fileNameExtension;

  return newFileName;
}

function checkResolution(file) {
  var result = {
    width: null,
    height: null
  };

  if (file != null) {
    var img = new Image();
    var _URL = window.URL || window.webkitURL;

    img.src = _URL.createObjectURL(file);

    img.onload = function() {
      result.width = this.width;
      result.height = this.height;
    };
  }

  return result;
}

export { generateFileName, checkResolution };
