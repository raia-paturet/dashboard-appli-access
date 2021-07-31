const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.cookie.split('=')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decodedToken.id;
		if (req.body.userId && req.body.userId !== userId) {
			throw 'User id non valable !';
		} else {
			global.userId = userId;
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | 'requete non authentifiée !' });
	}
};