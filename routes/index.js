var express = require('express');
var router = express.Router();
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const { generateAccessToken } = require('../jwt/token');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  const token = generateAccessToken('thanhnguyen');

  res.json(token);
});

//https://developers.google.com/identity/sign-in/web/backend-auth
router.post('/google_login', async (req, res, next) => {
  const token = req.body.token;

  const uid = await verify(token);

  res.json(uid);
});

async function verify(token) {
  try{
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, 
        // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    return userid;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }catch(ex){
    console.log(ex);
  }
  return null;
}

module.exports = router;
