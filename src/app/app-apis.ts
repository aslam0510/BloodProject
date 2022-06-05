const appPort = {
  port: 'http://10.157.195.32:8080/apigateway',
};

const register = 'register';
const user = 'user';
const admin = 'admin';

const apis = {
  GET_LOGIN: { url: '/login', port: appPort.port },
  GENERATE_OTP: { url: '/sendOTP', port: appPort.port },
  VERIFY_OTP: { url: '/verifyOTP', port: appPort.port },

  //user
  SET_PASSWORD: { url: `/${user}/resetPassword`, port: appPort.port },

  //register
  GET_ORG_TYPES: { url: `/${register}/getTypes`, port: appPort.port },
  SUBMIT_ORGFORM: {
    url: `/${register}/registerOrganization`,
    port: appPort.port,
  },
  SUBMIT_ENTITY_FORM: { url: `/${register}/entity`, port: appPort.port },
  GET_ALL_CATEGORIES: {
    url: `/${register}/getAllCategories`,
    port: appPort.port,
  },
  GET_CATEGORY: {
    url: `/${register}/getCategoryDetails`,
    port: appPort.port,
  },
  ADD_NEW_ENTITY: { url: `/${admin}/registerEntity`, port: appPort.port },
  GET_ENTITY_DETAILS: { url: `/${admin}/getAllEntities`, port: appPort.port },
  GET_ORANIZATION_DETAILS: {
    url: `/${admin}/getORganizationDetails`,
    port: appPort.port,
  },
};

export function getAPI(url_const) {
  const apiURL = apis[url_const] || '';
  return apiURL.port + apiURL.url;
}
