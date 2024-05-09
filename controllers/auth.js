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
               return res.status(401).send({message: "Wrong username or password"});
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

const signup = async(req,res) => {
   const user = new User(req.body);

   user.save()
      .then((user) => {
         const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '60 days'});
         res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
         return res.status(200).json({message: 'successful sign up', user: user.username});
      })
      .catch((err) => {
         console.log(err.message);
         return res.status(400).send({err});
      });
};

exports.signup = signup;

const logout = async(req, res) => {
   if (req.user) {
      res.clearCookie('nToken');
      return res.json({message: 'logged out user'});
   } else {
      return res.json({message: 'already logged out'});
   };
};

exports.logout = logout