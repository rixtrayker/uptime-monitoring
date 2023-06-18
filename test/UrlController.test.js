const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const UrlService = require('../services/UrlService');
const UrlController = require('../controllers/UrlController');

jest.mock('../services/UrlService');

describe('UrlController', () => {
  describe('getUrl', () => {
    it('should return the URL when a valid ID is provided', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const url = { id: 1, url: 'https://example.com' };

      UrlService.getUrl.mockResolvedValue(url);

      await UrlController.getUrl(req, res);

      expect(UrlService.getUrl).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith({ url });
    });

    it('should return 404 Not Found when an invalid ID is provided', async () => {
      const req = {
        params: {
          id: 999, // invalid ID
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      UrlService.getUrl.mockResolvedValue({});

      await UrlController.getUrl(req, res);

      expect(UrlService.getUrl).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(res.send).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
    });
  });

  describe('getAllUrls', () => {
    it('should return all URLs for a valid user', async () => {
      const req = {
        query: {},
        auth: {
          id: 1, // user ID
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const urls = [{ id: 1, url: 'https://example.com' }];

      UrlService.getAllUrls.mockResolvedValue(urls);

      await UrlController.getAllUrls(req, res);

      expect(UrlService.getAllUrls).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith({ url: urls });
    });

    it('should return 404 Not Found for an invalid user', async () => {
      const req = {
        query: {},
        auth: {
          id: 999,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      UrlService.getAllUrls.mockResolvedValue([]);

      await UrlController.getAllUrls(req, res);

      expect(UrlService.getAllUrls).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(res.send).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});