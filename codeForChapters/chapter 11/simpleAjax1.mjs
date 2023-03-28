// simpleAjax.js

import * as hard from "hardajaxlibrary";
// import the other library that does Ajax calls
// but in a hard, difficult way, requiring complex code

const convertParamsToHardStyle = (params) => {
  // do some internal steps to convert params
  // into whatever the hard library may require
};

const makeStandardUrl = (url) => {
  // make sure the url is in the standard
  // way for the hard library
};

const getUrl = (url, params, callback) => {
  const xhr = hard.createAnXmlHttpRequestObject();
  hard.initializeAjaxCall(xhr);
  const standardUrl = makeStandardUrl(url);
  hard.setUrl(xhr, standardUrl);
  const convertedParams = convertParamsToHardStyle(params);
  hard.setAdditionalParameters(params);
  hard.setCallback(callback);
  if (hard.everythingOk(xhr)) {
    hard.doAjaxCall(xhr);
  } else {
    throw new Error("ajax failure");
  }
};

const postUrl = (url, params, callback) => {
  // some similarly complex code
  // to do a POST using the hard library
};

export { getUrl, postUrl }; // the only methods that will be seen
