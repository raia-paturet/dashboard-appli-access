const mysql = require('mysql');
const authController = require('../controllers/auth');
const jwt = require('jsonwebtoken');

module.exports = {user_profil : async function user_profil() {
	console.log('userId', userId);
	const result = await  queryPromise('SELECT * FROM users WHERE id = ?', [userId]);
  return result;
}
}




