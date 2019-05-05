const JWT = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')
const message = require('./message')

//Hàm xác thực
const verifyToken = async (req, res, next) => {
    var token = req.headers['x-access-token']
    if (typeof token !== "undefined") {
        req.token = token
        req.user = await verifyAccessToken(token) //{username: "ducthangwru", user_id : 1, email: "ducthangwru@gmail.com"}
        req.user ? next() : utils.error(req, res, message.INVALID_TOKEN)
    } else {
        utils.error(req, res, message.INVALID_TOKEN)
    }
}

// const verifyTokenBasic = async (req, res, next) => {
//     var token = req.headers['token']
//     if (typeof token !== "undefined" && token == utils.md5(config.BASIC_AUTH)) {
//         next()
//     } else {
//         utils.error(req, res, message.INVALID_TOKEN)
//     }
// }

//Hàm mã hóa
const assignToken = (user_id, username, email) => {
    return new Promise((resolve, reject) => {
        JWT.sign({username: username, user_id: user_id, email: email}, config.BASIC_AUTH, (err, token) => {
            if (err) reject(err)
            else resolve(token)
        })
    })
}

// const verify = async(token) => {
//     try {
//         var ret = await Promise.all([checkToken(token), verifyAccessToken(token)])
//         return Promise.resolve(ret[1])
//     } catch (e) {
//         return Promise.reject(e)
//     }
// }

//Hàm giải mã
const verifyAccessToken = async (token) => {
    try
    {
        return await JWT.verify(token, config.BASIC_AUTH)
    }
    catch(e)
    {
        return null
    }
    
}

module.exports = {
    verifyToken,
    //verify,
    assignToken,
    verifyAccessToken,
    //verifyTokenBasic
}