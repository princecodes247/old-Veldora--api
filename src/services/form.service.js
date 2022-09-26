const { Container } = require('typedi');
const CRUD = require('./factories/crud.factory');

const FormModel = require('../models/form.model');

class FormService extends CRUD {
  async create(data) {
    const result = new FormModel(data);
    await result.save().catch(err => {
      console.log('ji');
      // logger.error('🔥 error: %o', e);
      console.log('jiaaaa');
      throw new Error(err);
    });
    console.log(result);
    return {
      result,
      error: false,
    };
  }
}

module.exports = new FormService(FormModel, 'Form');
