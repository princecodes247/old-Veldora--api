const isValidId = require('../../utils/helpers');

class CRUD {
  constructor(_model, _serviceName) {
    this.Model = _model;
    this.serviceName = _serviceName;
  }

  async _paginatedQuery({ limit, page, sort }, query = {}, mod = { __v: 0 }, populate = '') {
    const _page = Number(page) || 1;
    const _limit = Number(limit) || 10;
    const _skip = Number((_page - 1) * _limit) || 0;
    const _sort = sort || { createdAt: -1 };

    const result = await Promise.all([
      this.Model.find(query, mod).skip(_skip).limit(_limit).lean().populate(populate),
      this.Model.find(query, mod).countDocuments(),
    ]);

    if (Number(_page) * _limit < result[1]) {
      return {
        page: _page,
        next: _page + 1,
        limit: _limit,
        data: result[0],
        total: result[1],
      };
    }
    return {
      page: _page,
      next: null,
      limit: _limit,
      data: result[0],
      total: result[1],
    };
  }

  async create(data) {
    const result = new this.Model(data);
    await result.save().catch(err => {
      // logger.error('🔥 error: %o', e);
      throw new Error(err);
    });
    console.log(result);
    return {
      result,
      error: false,
    };
  }

  async getOne(id) {
    const item = await this.Model.findOne({ _id: id }, { __v: 0 }).lean();
    // const item = await this.Model.findOne({ _id: id }, { password: 0, __v: 0 });
    if (!item) {
      throw new Error(`${this.serviceName} does not exist`);
    }
    return item;
  }

  async getCount() {
    const count = await this.Model.countDocuments();

    return count;
  }

  async getAll(limit, page) {
    return this._paginatedQuery({ limit, page });
  }

  async update(id, _data) {
    // Prevent change of email
    const data = _data;
    // const data = { ..._data };
    // delete userData.email;

    const item = await this.Model.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true });

    if (!item) throw new Error("Item dosen't exist");

    return item;
  }

  async delete(id) {
    const item = await this.Model.findOne({ _id: id });
    item.remove();
    return item;
  }
}

module.exports = CRUD;
