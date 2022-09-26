const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { randomBytes } = require('crypto');
const UserModel = require('../models/user.model');

const logger = require('../loaders/logger');
const config = require('../config');
const { user: userEvents } = require('../constants/events.constants');
const { eventDispatcher } = require('../loaders/events');

class AuthService {
  constructor() {
    this.userModel = UserModel;
    this.logger = logger;
  }

  async signUp(userInputDTO) {
    try {
      const salt = randomBytes(32);
      const saltRounds = 10;
      this.logger.silly('Hashing password');
      const hashedPassword = await bcrypt.hash(userInputDTO.password, saltRounds);

      this.logger.silly('Creating user db record');
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      eventDispatcher.dispatch(userEvents.SIGN_UP, userRecord);

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data = require(layer to layer
       * but that's too over-engineering for now
       */
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } catch (e) {
      this.logger.silly('e.message');
      throw e;
    }
  }

  async signIn(email, password) {
    const userRecord = await this.userModel.findOne({ email });
    if (!userRecord) {
      throw new Error('User not registered');
    }
    /**
     * We use verify = require(bcrypt to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await bcrypt.compare(password, userRecord.password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT Tokens');
      const tokens = this.generateTokens(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      /**
       * Easy as pie, you don't need passport.js anymore :)
       */
      return { user, tokens };
    }
    throw new Error('Invalid Password');
  }

  generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for User ID: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }

  generateTokens(user) {
    try {
      this.logger.silly(`Generate Access Token: User ID ${user._id}`);
      const accessToken = jwt.sign(
        {
          uid: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          verified: user.isVerified,
        },
        'JWT_SECRET',
        {
          expiresIn: '50m',
        }
      );

      this.logger.silly(`Generate Refresh Token: User ID ${user._id}`);
      const refreshToken = jwt.sign({ id: user._id }, 'JWT_SECRET', {
        expiresIn: '4w',
      });
      return { accessToken, refreshToken };
    } catch ({ message }) {
      throw new Error(`500---${message}`);
    }
  }
}

module.exports = new AuthService();
