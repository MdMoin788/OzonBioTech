
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
export const userAuthentication = async (req, res, next) => {
    const jwtToken = req?.cookies?.jwtToken

    if (!jwtToken) return res.status(400).json({ success: false, message: 'Please login to access this resource' })
    
    const decodeData = jwt.verify(jwtToken, process.env.JWT_SECRET)

    req.user = await User.findById(decodeData.id)
    next()
}

export const userAuthorization = (...roles) => (req, res, next) => {
    roles.includes(req.user.role) ? next()
    : res.status(400).json({ success: false, message: `Role: ${req.user.role} is not allowed to access this resource` })
}

