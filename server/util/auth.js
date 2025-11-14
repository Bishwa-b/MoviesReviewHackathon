const jwt = require('jsonwebtoken')
const result = require('./result')
const config = require('./config')

function myAuth(req, res, next) {
    const allowedURLs = ['/user/register', '/user/login']
    const url = req.url
    if (allowedURLs.includes(url)) {
        next()
    }
    else {
        const bearerToken = req.headers.authorization
        if (bearerToken) {
            const token = bearerToken.split(" ")[1]
            try {
                const payload = jwt.verify(token, config.secret)
                req.uid = payload.uid
                next()
            } catch (error) {
                res.send(result.createResult("Token is invalid"))
            }
        }
        else {
            res.send(result.createResult('Token is missing'))
        }
    }
}

module.exports = myAuth