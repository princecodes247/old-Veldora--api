async function isCurrentUser(req, res, next) {
  if (req.$user.role === 'admin') return next();
  const userId = req?.params?.userId;
  if (!userId) return res.status(403).json({ message: `Not authorized to change user details` });
  if (req.$user._id.toString() === userId) return next();
  return res.status(403).json({ message: `Not authorized to change user details` });
}

module.exports = isCurrentUser;
