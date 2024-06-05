// middleware untuk mengecek role pengguna yg terdeteksi oleh auth token
const isAdmin = (req, res, next) => {
    const { role } = req.user
    if( role !== 'ADMIN' ){
        console.log('saya bukan admin')
        res.status(409).json({
            status: 'conflict',
            message: 'youre not admin'
        })
        console.log('gatau')
        return
    }
    console.log('admin lah wak')
    next()
}

module.exports = { isAdmin }