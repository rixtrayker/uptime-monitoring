const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const UrlModel = require('../models/url');

async function preventIdor(req, res, next) {
  try {
    const model = getModelFromUrl(req.originalUrl);

    if (!model) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
      return;
    }

    const resourceId = req.params.id;
    const userId = req.auth.id;
    const result = await model.query().where({ id: resourceId}).where({ user_id: userId }).select('id');

    if (result.length === 0) {
      res.status(StatusCodes.UNAUTHORIZED).send({ error: ReasonPhrases.UNAUTHORIZED });
      return;
    }

    next();
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

function getModelFromUrl(url) {
  if (!url) {
    return null;
  }

  const pathArray = url.split('/');
  const modelName = pathArray[1] || null;

  switch (modelName) {
    case 'urls':
      return UrlModel;
    default:
      return null;
  }
}

module.exports = preventIdor;
