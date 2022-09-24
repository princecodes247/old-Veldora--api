const { BCRYPT_SALT, JWT_SECRET } = {
  BCRYPT_SALT: 'veldora',
  JWT_SECRET: 'veldora',
};

const cookieOptions = {
  maxAge: 1000 * 60 * 20, // 20 minutes
  signed: true,
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: false,
  path: '/',
};

// {
//   secure: process.env.NODE_ENV !== "development",
//   httpOnly: true,
//   expires: dayjs().add(30, "days").toDate(),
// }

const refreshCookieOptions = {
  ...cookieOptions,
  maxAge: 1000 * 60 * 60 * 24 * 7 * 4, // 1 month
};

const COOKIE_SECRET = process.env.JWT_SECRET || '000';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'veldora_refresh_token';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'veldora_access_token';

module.exports = {
  BCRYPT_SALT,
  COOKIE_SECRET,
  JWT_SECRET,
  cookieOptions,
  refreshCookieOptions,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
};
