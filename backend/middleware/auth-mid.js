import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET

const decodeUserFromToken = (req, res, next) => {
  //get token from headers
    let token = req.get('Authorization')
  if (!token) return next()

  token = token.replace('Bearer ', '')
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return next(err)

    req.user = decoded.user
    next()
  }) }

function checkAuth(req, res, next) {
    return req.user ? next() : res.status(401).json({ err: 'Not Authorized' })
}


export { decodeUserFromToken, checkAuth } 