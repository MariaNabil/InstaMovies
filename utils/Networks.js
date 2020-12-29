import axios from 'axios';
import Constants from '../utils/Constants.js';

// This function, in addition to handling when the response is a success/failure, it automatically handles other response codes.
export const HandleHttpResponses = (response, onSuccess, onFailure) => {
  if (response.status === 200) {
    onSuccess && onSuccess(response);
  } else {
    if (onFailure) {
      onFailureReturn = onFailure(response);
    }
  }
};

const HTTP_REQUEST = (
  method,
  endpoint,
  onSuccess,
  onFailure,
  shouldAuthorize,
  contentType = 'application/json; charset=utf-8',
) => {
  let _cancel;

  if (!endpoint.match('^[/]')) {
    //string start with /
    endpoint = '/' + endpoint;
  }

  axios({
    method,
    headers: {
      'Content-Type': contentType,
    },
    url: `${Constants.BASE_URL}${endpoint}${
      shouldAuthorize ? `&api_key=${Constants.API_KEY}` : ''
    }`,
    cancelToken: new axios.CancelToken(function executor(c) {
      // An executor function receives a cancel function as a parameter
      _cancel = c;
    }),
  })
    .then(function (response) {
      HandleHttpResponses(response, onSuccess, onFailure);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        HandleHttpResponses(error.response, onSuccess, onFailure);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        onFailure && onFailure(error);
      } else {
        // Something happened in setting up the request that triggered an Error
        onFailure && onFailure(error);
      }
    });

  return _cancel;
};

export const GET = (endpoint, onSuccess, onFailure, shouldAuthorize = true) => {
  return HTTP_REQUEST('get', endpoint, onSuccess, onFailure, shouldAuthorize);
};

export default {GET};
