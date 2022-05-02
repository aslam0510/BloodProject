const apis = {
  GET_LOGIN: { url: 'http://10.157.195.32:8080/bbportal/login' },
};

export function getAPI(url_const) {
  // const apiURL = apis[url_const] || '';
  // return apiURL.port + apiURL.url;
  const apiURL = apis[url_const] || '';
  console.log(apiURL);

  return apiURL.url;
}
