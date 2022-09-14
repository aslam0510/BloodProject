const appPort = {
  port: 'http://apigateway-jiohealth-iomt.apps.dev-jh-iomt.ocp.bss.jio.com',
};

const register = 'register';
const user = 'user';
const admin = 'admin';
const bloodBank = 'bloodbank';

const apis = {
  GET_LOGIN: { url: '/login', port: appPort.port },
  GENERATE_OTP: { url: '/sendOTP', port: appPort.port },
  VERIFY_OTP: { url: '/verifyOTP', port: appPort.port },
  SET_PASSWORD: { url: `/${user}/resetPassword`, port: appPort.port },
  ADD_USER: { url: `/${user}/createUser`, port: appPort.port },
  EDIT_USER: { url: `/${user}/editUser`, port: appPort.port },

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
  GET_ENTITY_CATEGORIES: {
    url: `/${register}/getEntityCategories`,
    port: appPort.port,
  },
  ADD_NEW_ENTITY: { url: `/${admin}/registerEntity`, port: appPort.port },
  GET_ENTITY_DETAILS: { url: `/${admin}/getAllEntities`, port: appPort.port },
  GET_ORANIZATION_DETAILS: {
    url: `/${admin}/getORganizationDetails`,
    port: appPort.port,
  },
  GET_ENTITY_BYID: { url: `/${admin}/getEntityDetails`, port: appPort.port },

  UPDATE_ORG_INFO: {
    url: `/${admin}/updateOrganizationById`,
    port: appPort.port,
  },

  UPDATE_ENTITY_INFO: {
    url: `/${admin}/updateEntityById`,
    port: appPort.port,
  },

  GET_USERS_LIST: { url: `/${admin}/getUsersList`, port: appPort.port },
  DELETE_USER: { url: `/${admin}/deleteUser`, port: appPort.port },
  GET_USER_ROLE: { url: `/${admin}/getRoles`, port: appPort.port },
  GET_USER_ENTITY_CATEGORIES: {
    url: `/${admin}/getEntityCategories`,
    port: appPort.port,
  },
  GET_BLOOD_COMP_STATUS: {
    url: `/${bloodBank}/availability/getBloodComponetsAvailability`,
    port: appPort.port,
  },
  GET_BLOOD_COMP_LIST: {
    url: `/${bloodBank}/availability/getBloodComponentsList`,
    port: appPort.port,
  },
  GET_BLOOD_GROUP_LIST: {
    url: `/${bloodBank}/availability/getBloodGroupsList`,
    port: appPort.port,
  },
  UPDATE_BLOOD_COMP_STATUS: {
    url: `/${bloodBank}/availability/updateBloodGroup`,
    port: appPort.port,
  },
  GET_BLOOD_AVAILABILITY_STATUS: {
    url: `/${bloodBank}/availability/getBloodAvailability`,
    port: appPort.port,
  },

  CREATE_BLOOD_REQUEST: {
    url: `/${bloodBank}/request/createBloodRequest`,
    port: appPort.port,
  },

  GET_BLOOD_REQUEST_STATUS_LIST: {
    url: `/${bloodBank}/request/getBloodRequestStatusList`,
    port: appPort.port,
  },

  GET_BLOOD_REQUEST_LIST: {
    url: `/${bloodBank}/request/getAllBloodRequests`,
    port: appPort.port,
  },
  GET_BLD_REQ_BY_ID: {
    url: `/${bloodBank}/request/viewBloodRequestDetails`,
    port: appPort.port,
  },
  GET_DONOR_REPO_LIST: {
    url: `/${bloodBank}/donor/getDonors/`,
    port: appPort.port,
  },
  GET_DONOR_DONATION_LIST: {
    url: `/${bloodBank}/donor/getDonationDetails/`,
    port: appPort.port,
  },
  UPDATE_BLOOD_REQUEST: {
    url: `/${bloodBank}/request/updateRequirements`,
    port: appPort.port,
  },
  GET_USER_DETAILS: {
    url: `/${user}/getUserDetails`,
    port: appPort.port,
  },
  UPDATE_USER_DETAILS: {
    url: `/${user}/editProfile`,
    port: appPort.port,
  },
  FORGET_PASSWORD: {
    url: `/forgetPassword`,
    port: appPort.port,
  },
  RESET_PASSWORD: {
    url: `/setPassword`,
    port: appPort.port,
  },
  GET_DASHBOARD_SUMMARY: {
    url: `/dashboard/summary`,
    port: appPort.port,
  },

  LOGOUT: {
    url: `/logout`,
    port: appPort.port,
  },

  GET_DONOR_REPO_BYID: {
    url: `/${bloodBank}/donor/getDonorDetails`,
    port: appPort.port,
  },
  UPDATE_DONOR_REPO_BYID: {
    url: `/${bloodBank}/donor/updateDonor`,
    port: appPort.port,
  },
  GET_DONOR_DONATION_BYID: {
    url: `/${bloodBank}/donor/getDonationDetails`,
    port: appPort.port,
  },
  SEARCH_DONOR_BY_PARAMS: {
    url: `/${bloodBank}/donor/searchDonationDetails`,
    port: appPort.port,
  },
  GET_ACTIVITIES_BY_DATE: {
    url: `/dashboard/getAllActivities`,
    port: appPort.port,
  },
};

export function getAPI(url_const) {
  const apiURL = apis[url_const] || '';
  console.log(apiURL.port + apiURL.url);

  return apiURL.port + apiURL.url;
}
