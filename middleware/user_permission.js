
const authController = require('../controllers/auth');
const jwt = require('jsonwebtoken');




module.exports = async (req, res, next) => 
{
	try 
	{
		if (!req.headers.cookie) {
			res.status(401).render("index", { login_info:false, alert: 'you need an account'});
		} else {
			const token = req.headers.cookie.split('=')[1];
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			const userId = decodedToken.id;
			if (req.body.userId && req.body.userId !== userId) {
				throw 'User id non valable !';
			} else {
				pool.query('SELECT * FROM users WHERE id = ?', [userId], async (error,results) => 
				{
					if ( !results ) 
					{
						res.status(401).render('index', 
						{
							alert: "no access"
						})
					}
					else 
					{
						console.log("my_result//user-permission", results);
						for (let result of results) 
						{
			    			console.log('pou//user-permission', result);
			    		}
						next();
					}
				});
			}
		}
	} 
	catch (error) 
	{
		res.status(401).json({ error: error | 'requete non authentifiée !' });
	}
}

