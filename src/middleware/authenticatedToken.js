const jwt = require("jsonwebtoken")

// middleware untuk mem-verifikasi token owner
const authenticatedToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    
    if(!authHeader){
        return res.status(401).json({
            status: 'Unathorized',
            message: 'token required'
        })
    }

    const token = authHeader && authHeader.split(' ')[1]
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({
                status: 'forbidden',
                message: 'invalid or expried token'
            })
        }
        req.user = user
        next()
    })
}

module.exports = authenticatedToken