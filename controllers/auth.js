const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.login = async (req, res) => {
	//console.log('pool//auth', pool)
	try {
		const { email, password } = req.body;
		if( !email || !password ) {
			return res.status(400).render('login', {
				alert: 'Please provide an email and password', login_info:false
			})
		}
		pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
			//console.log('results/auth', results)
			if( !results[0] || ! ( await bcrypt.compare(password, results[0].password))) {
				res.status(401).render('login', {
					alert: "Email or Password is incorrect", login_info:false
				})
			} else {
				const id = results[0].id;
				const token = jwt.sign({ id }, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_EXPIRES_IN
				});
				//console.log("the token is: " + token);
				const cookieOption = {
					expires: new Date(
						Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
						),
					httpOnly: true
				}
				res.cookie('jwt', token, cookieOption );
				res.status(200).redirect("/");
				//connexion.end();
				//Set-Cookie: name=value; domain='.sharemyspace-calm.space
			}
		})
	} catch (error) {
		console.log(error);
	}
}

exports.register = (req, res) => {

	const { firstname, lastname, email, password, passwordConfirm } = req.body;
	console.log('req.body', req.body);
	pool.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
		if(error) {
			console.log(error);
		} 
		if( results.length > 0 ) {
			return res.render('register', {
				alert: 'That email is already in use',login_info:false
			})
		} else if( password !== passwordConfirm ) {
			return res.render('register', {
				alert: 'Passwords do not match',login_info:false
			});
		}
		let hashedPassword = await bcrypt.hash(password, 8);
		console.log(hashedPassword);

		pool.query('INSERT INTO users set ?', {firstname: firstname, lastname: lastname, email: email, password: hashedPassword }, (error, results) => {
			if(error) {
				console.log(error);
			} else {
				console.log(results);
			
				return res.render('register', {
					message: 'User registered', login_info:false
				});
			}
		})
	});
}

exports.update = (req, res) => 
{
	const { firstname, lastname, email} = req.body;
	console.log('totale', firstname, lastname, email)
	pool.query('SELECT * FROM users WHERE email = ? AND id <> ?', [email, userId], async (error, results) => {
		console.log('results', email )
		console.log('results[0].email', results )
		console.log('results.email', results.length )
		if(error) { 
			console.log(error);
		} 
		if( results.length > 0 ) {
			return res.render('profil', {
				alert: 'That email is already in use', datas:results, login_info:true
			})
		} else {
			pool.query('UPDATE users SET  firstname = ?, lastname = ?, email = ? WHERE id = ?', [firstname, lastname,  email, userId], (error, results) => {
				 if(error) {
					console.log(error);
				} else {
					pool.query('SELECT * FROM users WHERE id = ?', [userId], async (error, results) => {
					if(error) {
						console.log(error);
					} else {
						return res.render('profil', {
						message: 'User update',datas:results, login_info:true})
					}
					});
				}
			});
		}
	});
}