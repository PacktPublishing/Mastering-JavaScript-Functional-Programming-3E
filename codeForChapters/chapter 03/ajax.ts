/* eslint-disable @typescript-eslint/no-unused-vars */

function getAjax() {
  let ajax = null;
  if (window.XMLHttpRequest) {
    // modern browser? use XMLHttpRequest
    ajax = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // otherwise, use ActiveX for IE5 and IE6
    ajax = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    throw new Error("No Ajax support!");
  }
  return ajax;
}

(function initializeGetAjax() {
  let myAjax = null;

  if (window.XMLHttpRequest) {
    // modern browsers? use XMLHttpRequest
    myAjax = function () {
      return new XMLHttpRequest();
    };
  } else if (window.ActiveXObject) {
    // it's ActiveX for IE5 and IE6
    myAjax = function () {
      new ActiveXObject("Microsoft.XMLHTTP");
    };
  } else {
    myAjax = function () {
      throw new Error("No Ajax support!");
    };
  }
  window.getAjax = myAjax;
})();
