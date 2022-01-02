const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>
{
    const RSA_PRIVATE_KEY = "yehuda";
    const token = req.headers["x-access-token"];
    if(!token)
    {
        return res.status(403).send({message:"A Token is required for authentication!"});
    }
    try{
        const decoded = jwt.verify(token,RSA_PRIVATE_KEY);
        req.userId = decoded.id; 
    }
    catch(err)
    {
        return res.status(401).send({message:"Invalid Token!"});
    }
    return next();
}
module.exports = verifyToken;