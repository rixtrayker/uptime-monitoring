const urlService = require('../services/urlService');

const urlUtils = {
  getUrlMonitorConfig(url) {
    const urlOwner = urlService.getUrlOwner(url.id);
    return {
      website: getFullUrl(url),
      title: url.name,
      port: url.port,
      protocol: url.protocol.toLowerCase(),
      interval: url.interval,
      timeout: url.timeout,
      ignoreSSL: url.ignoreSSL,
      config: {
        intervalUnits: 'seconds'
      },
      httpOptions: {
        path: url.path,
        headers: getHeaders(url),
      },
      expect: {
        statusCode: url.assert || process.env.DEFAULT_ASSERT_RESPONSE_CODE || 200,
      },
      metaData: {
        urlId: url.id,
        email: urlOwner.email || process.env.DEFAULT_EMAIL,
      },
    };
  },

  getAuthHeader(auth) {
    const authHeader = `Basic ${Buffer.from(`${auth.username}:${auth.password}`).toString(
      'base64',
    )}`;
    return authHeader;
  },

  getHeaders(url) {
    const httpHeaders = url.httpHeaders;
    const auth = url.authentication;

    if (auth) {
      httpHeaders['Authorization'] = getAuthHeader(auth);
    }
    return httpHeaders;
  },

  getFullUrl(url){
    if(url.port)
      return `${url.protocol}://${url.url}:${url.port}/${url.path}`;
    else
      return `${url.protocol}://${url.url}/${url.path}`;
  }
};

module.exports = urlUtils;
