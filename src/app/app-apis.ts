const appPort = {
  port: 'http://10.157.195.32:8080/bbportal',
};
const apis = {
  GET_LOGIN: { url: '/login', port: appPort.port },
};

export function getAPI(url_const) {
  const apiURL = apis[url_const] || '';
  return apiURL.port + apiURL.url;
}
