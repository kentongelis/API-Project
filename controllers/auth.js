const User = require("../models/user");
const jwt = require('jsonwebtoken');

const login = async(req,res) => {
   const {username, password} = req.body;

   User.findOne({username}, 'username password')
      .then((user) => {
         if (!user) {
            return res.status(401).send({message: "Wrong username or password"});
         };

         user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
               return res.status(401).send({message: "Wrong usernmae or password"});
            };

            const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, {
               expiresIn: '60 days',
            });

            res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
            return res.json({user: user.username, message: 'successful login', cookie: token});
         });
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.login = login;