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

  // async getOne(id) {
  //   const item = await this.Model.findOne({ _id: id }, { __v: 0 }).populate('workspace').lean();
  //   // const item = await this.Model.findOne({ _id: id }, { password: 0, __v: 0 });
  //   if (!item) {
  //     throw new Error(`${this.serviceName} does not exist`);
  //   }
  //   return item;
  // }
}

module.exports = new FormService(FormModel, 'Form');
