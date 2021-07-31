const express = require('express');
const jwt = require('jsonwebtoken');
const detect_user = require('../middleware/users');
const router = express.Router();
const auth = require('../middleware/auth');
const logout = require('../middleware/logout');
const permission = require('../middleware/user_permission');
const user_profil = require('../models/profil.js').user_profil;


router.get('/', (req, res) => {
  const is_user =  detect_user(req);
  res.render('index', { login_info:is_user});
});

router.get('/register', (req, res) => {
  const is_user =  detect_user(req);
	res.render('register', { login_info:is_user});
});

router.get("/reports",permission, (req, res) => {
  const is_user =  detect_user(req);
  res.render("reports", { login_info:is_user});
});

router.get("/offers", (req, res) => {
  const is_user =  detect_user(req);
  res.render("offers", { login_info:is_user});
});
 
router.get("/profil", auth,  async function(req, res) {
  const is_user =  detect_user(req);
	const datas_user = await user_profil();
  res.render("profil", { datas: datas_user, login_info:is_user});
});

router.get("/terms_and_conditions", (req, res) => {
  const is_user =  detect_user(req);
  res.render("terms_and_conditions", {login_info:is_user});
});

router.get('/login', (req, res) => {
  const is_user =  detect_user(req);
  res.render('login', { login_info:is_user} );
});

router.get('/logout', logout, function (req, res, next) {
  const is_user =  detect_user(req);
  res.redirect('/');
});




module.exports = router;

