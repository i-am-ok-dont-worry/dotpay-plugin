/**
 * This plugin provides support for dotpay payments
 * @param config VSF api configuration
 * @param db ElasticSearch client
 * @param router Express router
 * @param cache Cache manger instance
 * @param apiStatus Api status helper
 * @param apiError Api error helper
 * @param getRestApiClient Method for retrieving Magento Rest API
 * @returns {{router: *, route: string, pluginName: string, domainName: string}}
 */
module.exports = ({ config, db, router, cache, apiStatus, apiError, getRestApiClient }) => {
  const createMage2RestClient = () => {
    const client = getRestApiClient();
    client.addMethods('dotpay', (restClient) => {
      const module = {};
      module.form = (orderId) => {
        return restClient.get(`/dotpay/get-form/${orderId}`);
      };
      module.status = (orderId) => {
        return restClient.get(`/dotpay/status/${orderId}`);
      };

      return module;
    });

    return client;
  };

  router.get('/form/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
      if (!orderId) { throw new Error('Order id is required'); }
      const client = createMage2RestClient();
      const response = await client.dotpay.form(orderId);
      apiStatus(res, response, 200);
    } catch (e) {
      apiError(res, e);
    }
  });

  router.get('/status', async (req, res) => {
    const { orderId } = req.params;
    try {
      if (!orderId) { throw new Error(`Order id is required`); }
      const client = createMage2RestClient();
      const response = await client.dotpay.status(orderId);
      apiStatus(res, response, 200);
    } catch (e) {
      apiError(res, e);
    }
  });

  return {
    domainName: '@grupakmk',
    pluginName: 'dotpay-payment',
    route: '/dotpay',
    router
  };
};
