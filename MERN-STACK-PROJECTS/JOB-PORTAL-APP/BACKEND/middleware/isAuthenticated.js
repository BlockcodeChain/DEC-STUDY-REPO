import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token
        
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }

        // Verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }

        // Add userId to request object
        req.id = decode.userId
        
        // Call next middleware/controller
        next()

    } catch (error) {
        console.log(`❌ AUTH MIDDLEWARE ERROR: ${error}`)
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        })
    }
}

export default isAuthenticated