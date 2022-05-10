const JwtService = require("../services/JwtService");

const auth = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(400);
        return res.json({ "result": false, "error": "Please provide a JWT token" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const { username } = await JwtService.verify(token);

        // save user in req
        const user = { username }
        req.user = user;
        next();
    } catch (error) {
        return res.json({ "result": false, "error": "JWT Verification Failed" });
    }
}

module.exports = auth;