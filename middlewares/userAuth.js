const jwt = require('jsonwebtoken')

const User = require('../models/userModal')

module.exports = (req , res , next) =>{
  // # we will be sending our token with headers so we are requiring it
    const authHeader = req.headers.authorization;

    if (authHeader) {
  // # authHeader comes with bearer token , we are taking only token from it [bearer , token]
        const token = authHeader.split(" ")[1];   // $ [bearer , token] [0 , 1]
jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
  // # we have created this payload in login route const payload = {_id : doesUserExists._id}
  // # it contains logged in user id
    try {
      if (err) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      
      // # we are removing password by using select {-} sign indicates that we don't want that, because we don't want to show 
      const user = await User.findOne({ _id: payload._id }).select("-password");
      
      // i am sending user back so that i can use this in put request , by validating this , user will be able to update only their profiles
      req.user = user;
      next(); // # this will jump onto our routes
    } catch (err) {
      console.log(err);
    }
  });
} else {
  return res.status(403).json({ error: "Forbidden 🛑🛑 , JWT token not entered / expired " });
}
};