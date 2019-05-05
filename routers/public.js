const express = require('express')
const router = express.Router()
var passport = require('passport')
require('../passport')()
const jwt = require('../utils/jwt')
const {success, error} = require('../utils/utils')

router.post('/loginWithFacebook', async (req, res, next) => {
    try
    {
        let username = req.body.username
        let password = req.body.password
        let token = null

        if(username == 'ducthangwru' && password == '1')
            token = await jwt.assignToken(1, username, 'ducthangwru@gmail.com')
        return success(res, token)
    }
    catch(e)
    {
         return error(req, res, e)
    }
})

router.post('/loginWithGoogle', async (req, res, next) => {
    try
    {
        
        await passport.authenticate('google-token', async (token) => {
            if (!token) {
                 return error(req, res, message.ERROR)
            }
            
            let payload = await jwt.verifyAccessToken(token)
           
            return success(res, {token : token})
        })(req, res, next)
    }
    catch(e)
    {
         return error(req, res, e)
    }
})

router.put('/user', jwt.verifyToken, async(req, res) => {
    try
    {
        let user_id = req.user

        return success(res, user_id)
    }
    catch(e)
    {
        return errror(req, res, e)
    }
})

module.exports = router