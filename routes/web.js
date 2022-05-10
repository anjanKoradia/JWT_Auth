const signinController = require("../controller/signinController");
const signupController = require("../controller/signupController");
const userController = require("../controller/userController");

const auth = require("../middleware/auth");

function initRoutes(app, con) {
    app.post("/signup", signupController().register);

    app.post("/signin", signinController().login);

    app.get("/user/me", auth, userController().me);
}

module.exports = initRoutes;
