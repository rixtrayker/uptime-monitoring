const UrlCheckService = require('../services/UrlCheckService');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {validateCreate, validateUpdate } = require('../validate/UrlCheckValidator');

const UrlCheckController =  {
    async getUrl(req, res){
      const { id } = req.params;
      const url = await UrlCheckService.getUrl(id);
      if(Object.keys(url).length === 0) {
        res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        return;
      } else{
        res.status(StatusCodes.OK).send({url});
      }
    },

    async createUrl(req, res){
      const { error } = validateCreate();
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
        return;
      }

      const url = await UrlCheckService.createUrl(req.body, 1);
      res.status(StatusCodes.CREATED).send({url});
    },

    async updateUrl(req, res){
      const { id } = req.params;
      const url = req.body;

      const { error } = validateUpdate(url);
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
        return;
      }
      const result = await UrlCheckService.updateUrl(id, url);
      if(Object.keys(result).length === 0) {
        res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        return;
      } else{
        res.status(StatusCodes.OK).send({url:result});
      }
    },


    async findByTags(req, res){
      let { tags } = req.query;
      tags = tags.split(',');

      if (tags.length < 1) {
        res.status(StatusCodes.BAD_REQUEST).json({ error:"Empty value not allowed" });
        return;
      }

      const urls = await UrlCheckService.findByTags(tags);
      if(Object.keys(urls).length === 0) {
        res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        return;
      } else{
        res.status(StatusCodes.OK).send({urls});
      }
    },
    
    async deleteUrl(req, res){
      const { id } = req.params;

      const success = await UrlCheckService.deleteUrl(id);
      if(!success){
        return res.status(StatusCodes.NOT_FOUND).json({message:"URL not found"});
      }

      res.status(StatusCodes.OK).json({message:"Deleted successfully"});
    },
};

module.exports = UrlCheckController;
