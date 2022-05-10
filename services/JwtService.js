const jwt = require("jsonwebtoken");

class JwtService {
    static sign(payload, expiry = "60s", secret = process.env.JWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }
}
module.exports = JwtService;