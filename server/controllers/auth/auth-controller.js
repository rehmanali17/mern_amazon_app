const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/auth/user')
const config = require('config')
const { validationResult } = require('express-validator');

const Signup= async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(403).json(errors.array())
        }else{
            const { username, password, name } = req.body;
            let extUser = await User.find()
            if(extUser.length > 0){
                res.status(403).json([{msg: "Registration is blocked!"}]);
            }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                let newUser = new User({
                    username,
                    name,
                    password: hashedPassword
                })
                newUser.save().then(user => {
                    let token = jwt.sign([{user: user._id}, config.get('jwtSecret'), { expiresIn: '1day' }])
                    res.status(201).json([{msg:'Registration successfull',token}]);
                })
                .catch(err => {
                    res.status(403).json([{msg:'Registration error' ,error:err}])
                })
            }
            
        }
    }
    catch(error){
        res.status(403).json([{
            msg: "Registeration error",
            error: error.message
        }]);
    }    
}

const Login = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(403).json(errors.array())
        }else{
            const { username, password } = req.body
            let user = await User.findOne({username})
            if(user){
                const isMatch = await bcrypt.compare(password,user.password);
                if(isMatch){
                    let token = jwt.sign({user: user._id}, config.get('jwtSecret'), { expiresIn: '1day' })
                    res.status(200).json([{msg:'Login successfull',token}]);
                }else{
                    res.status(401).json([{
                        msg: "Incorrect credentials"
                    }]);
                }
            }else{
                res.status(401).json([{
                    msg: "User does not exist"
                }]);
            }
        }
    }catch(error){
        res.status(403).json([{
            msg: "Login error",
            error: error.message
        }]);
    }
}

module.exports = { Login, Signup }