const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')
const { JWT_ALG, JWT_EXPIRY, JWT_SECRET, } = require('../../config')
const { redisFetching } = require('../../middle/redisHandler')


const generateToken = () => {
  const uuid = uuidv4()
  return jwt.sign({ uuid: uuid }, JWT_SECRET, { algorithm: JWT_ALG, expiresIn: JWT_EXPIRY  })
}

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).send('Unauthorized.')
      redisFetching(req.headers.authorization, ({ error, data }) => {
        if (error) return res.status(500).send('Error occurred during fetching token from redis.')
        if (data) return res.status(401).send('Unauthorized.')
        next()
      })
    })
  } else {
    return res.status(401).send('Unauthorized.')
  }
}

module.exports = {
  generateToken,
  verifyToken
}