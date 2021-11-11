const jwt = require('jsonwebtoken')
const config = require('config')


const auth = (req,res,next) => {
    try{
        let token = req.header('auth-token');
        if(!token){
            res.status(401).json({
                msg: 'No token attached, authorization failed'
            })
        }else{
            jwt.verify(token, config.get('jwtSecret'), async (err,data)=>{
            if(err){
                res.status(401).json({
                    msg: 'Unauthorized access'
                })
            }else{
                req.userId = data.user
                next()
            }
            })
        }
    }catch(error){
        // console.log(error.message)
        res.status(403).json({
            msg: 'Authorization failed',
            error: error.message
        })
    }
}

module.exports = auth