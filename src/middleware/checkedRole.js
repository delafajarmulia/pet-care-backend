// middleware untuk mengecek role pengguna yg terdeteksi oleh auth token
const isAdmin = (req, res, next) => {
    const { role } = req.user
    if( role !== "ADMIN" ){
        res.status(409).json({
            status: 'conflict',
            message: 'youre not admin'
        })
        return
    }
    next()
}

const isOwner = (req, res, next) => {
    const { role } = req.user
    if(role !== "OWNER"){
        res.status(409).json({
            status: 'conflict',
            message: 'you are not owner'
        })
        return
    }
    next()
}

module.exports = { isAdmin, isOwner }