const signinController = require("../controller/signinController");
const signupController = require("../controller/signupController");

function initRoutes(app, con) {
    app.post("/signup", signupController().register);

    app.post("/signin", signinController().login);
}

module.exports = initRoutes;
