const appPort = {
  port: 'http://10.157.195.32:8080/bbportal',
};
const apis = {
  GET_LOGIN: { url: '/login', port: appPort.port },
  GENERATE_OTP: { url: '/sendOTP', port: appPort.port },
  VERIFY_OTP: { url: '/verifyOTP', port: appPort.port },
  SET_PASSWORD: { url: '/user/resetPassword', port: appPort.port },
  GET_ORG_TYPES: { url: '/register/getTypes', port: appPort.port },
  SUBMIT_ORGFORM: { url: '/register/organization', port: appPort.port },
  SUBMIT_ENTITY_FORM: { url: '/register/entity', port: appPort.port },
};

export function getAPI(url_const) {
  const apiURL = apis[url_const] || '';
  return apiURL.port + apiURL.url;
}
