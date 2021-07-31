module.exports = function (req, res, next) {
  res.clearCookie('jwt');
  next();
};

