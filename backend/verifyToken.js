const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return res.status(403).json("You are not allowed!");
            req.user = user
            next();
        })
    } else {
        return res.status(401).json('You are not authenticated!');
    }
}

// const verifyTokenAndAuthorize = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//         if (req.user.id === req.params.id || req.user.isAdmin) {
//             next()
//         } else {
//             return res.status(403).json("Not granted!");
//         }
//     })
// }

module.exports = { verifyToken }