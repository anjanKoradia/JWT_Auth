const signupController = require("../controller/signupController");

function initRoutes(app, con) {
    app.post("/signup", signupController().register);
}

module.exports = initRoutes;
