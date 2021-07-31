const mysql = require('mysql');
const authController = require('../controllers/auth');
const jwt = require('jsonwebtoken');


module.exports = (req) => 
{
	if (!req.headers.cookie) {
		return false;
	} else {
		const token = req.headers.cookie.split('=')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decodedToken.id;
		if (req.body.userId && req.body.userId !== userId) {
			return false;
			
		} else {
			return true;
			
		}

	}
}

