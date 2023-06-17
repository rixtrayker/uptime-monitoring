const urlUtils = {
  getUrlMonitorConfig(url) {
    return {
      website: url.url,
      title: url.name,
      port: url.port,
      protocol: url.protocol.toLowerCase(),
      interval: url.interval,
      timeout: url.timeout,
      ignoreSSL: url.ignoreSSL,
      httpOptions: {
        path: url.path,
        headers: getHeaders(url),
      },
      expect: {
        statusCode: url.assert || process.env.DEFAULT_ASSERT_RESPONSE_CODE || 200,
      },
      metaData: {
        urlId: url.id,
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
};

module.exports = urlUtils;
