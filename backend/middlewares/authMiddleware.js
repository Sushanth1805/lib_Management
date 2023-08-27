const asynchHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//We have to get the token from the header and decode that token to get the user id

const authMiddlware = asynchHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization.startsWith('Bearer')); //This will return true
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Grab only the token
      // console.log(req.headers.authorization.split(' ')[1]);
      token = req.headers.authorization.split(' ')[1];
      //Decode the user
      const decoded = jwt.verify(token, "SHS");
      console.log(decoded.id);
      //Find the user in DB
      const user = await User.findById(decoded.id);
      //add the user to the request object as req.user
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorised, token is fake');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorised, no token');
  }
});

module.exports = authMiddlware;
