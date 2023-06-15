const { StatusCodes, ReasonPhrases } = require('http-status-codes');

async function idorPrevention(req, res, next) {
  try {
    const model = getModel(req.originalUrl);

    if (!model) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }

    const resouceId = req.params.id;
    const userId = req.auth.id;

    const result = await model
      .query()
      .where({ id: resouceId })
      .where({ user_id: userId })
      .select('id');

    if (result.length !== 0) {
      next();
    }
    res.status(StatusCodes.UNAUTHORIZED).send({ error: ReasonPhrases.UNAUTHORIZED });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

function getModel(url) {
  if (!url) {
    return null;
  }

  const pathArray = url.split('/');
  const path = pathArray[1] || null;

  switch (path) {
    case 'urls':
      return require('../models/url');
    default:
      return null;
  }
}

module.exports = idorPrevention;
