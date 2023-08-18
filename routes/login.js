const User = require("../models/User")
const router = require("express").Router();
const {body,validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret = "mynameisshriyash,merndeveloper@1#3"
router.post('/loginuser',
[ 
    body('email').isEmail(),
    body('password').isLength({min:8})
]

,async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()})
    }
    let email = req.body.email
    try {
         let userData = await User.findOne({email})
         if(!userData)
           {
            return res.status(400).json({errors : "try logging with correct credentials"})
           }
           const pwdcompare = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdcompare)
        {
            return res.status(400).json({errors : "wrong password"})
        }
        // JWT Implementation
        const data = {
            user : {
                id :userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({success : true,authToken : authToken})
    }
    catch(err) {
        console.log(err)
        res.json({success : false})
    }
})
module.exports = router
