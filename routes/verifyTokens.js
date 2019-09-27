const jwt = require('jsonwebtoken')

//if the token is exist
function auth(req,res,next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.teacher = verified
    }catch(err){
        res.status(400).send('Invalid token')
    }
}