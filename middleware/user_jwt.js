const jwt = require('jsonwebtoken')

module.exports = async function(req,res,next){
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({
            msg:'No valid token'
        });
    }
    try {
        await jwt.verify(token,process.env.jwtUserSecret,(err,decoded)=>{
            if(err){
                res.status(401).json({
                    msg:"No valid token"
                });
            }else{
                req.user = decoded.user;
                next();
            }
        })
    } catch (error) {
        console.log('Something Went Wrong'+err);
        res.status(500).json({
            msg:'Server Error'
        });
    }
}