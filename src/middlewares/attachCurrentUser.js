/* eslint-disable no-underscore-dangle */
const { Container } = require('typedi');

const user = require('../models/user');

const attachCurrentUser = async (req, res, next) => {
  // const Logger = Container.get('logger');
  // Const Logger =
  try {
    // const UserModel = Container.get('userModel');

    const userRecord = await user.findById(req.auth._id);
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    // const Logger = Container.get('logger');
    // Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

module.exports = attachCurrentUser;
