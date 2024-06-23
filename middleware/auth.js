import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({
        error: "Unauthorized"
    })

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.status(500).json({
            success: true,
            message: "Invalid Token"
        })
    }
}