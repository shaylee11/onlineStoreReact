const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function requireAuth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(400).json({ message: "äuthorization token required" });

  const token = authorization.split(" ")[1];

  try {
    const {_id} = jwt.verify(token,"dsakjdsajfjdkskaJSAjks");
    req.user = await User.findOne({_id});
    next();
  } catch (error) {
    res.status(401).json({message:"authorization needed"})
  }
}

async function requireAdminAuth(req, res, next) {
    const { authorization } = req.headers;
    
    if (!authorization) return res.status(400).json({ message: "äuthorization token required" });
    
    const token = authorization.split(" ")[1];
  
    try {
      const {_id, isAdmin} = jwt.verify(token,"dsakjdsajfjdkskaJSAjks");
      if(!isAdmin)return res.status(400).json({ message: "only admin authorized" });
      req.user = await User.findOne({_id});
      next();
    } catch (error) {
      res.status(401).json({message:error.message})
    }
  }

module.exports = { requireAuth,requireAdminAuth };
