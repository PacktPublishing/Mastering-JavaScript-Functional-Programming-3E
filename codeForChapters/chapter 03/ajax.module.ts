/* eslint-disable @typescript-eslint/no-unused-vars */

let getAjax = null;

if (window.XMLHttpRequest) {
  // modern browsers? use XMLHttpRequest
  getAjax = function () {
    return new XMLHttpRequest();
  };
} else if (window.ActiveXObject) {
  // it's ActiveX for IE5 and IE6
  getAjax = function () {
    new ActiveXObject("Microsoft.XMLHTTP");
  };
} else {
  getAjax = function () {
    throw new Error("No Ajax support!");
  };
}

export { getAjax };
