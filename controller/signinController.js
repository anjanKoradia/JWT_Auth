const fs = require("fs");
const bcrypt = require("bcrypt");
const signinValidator = require("../validator/signinValidator");
const JwtService = require("../services/JwtService");

function signinController() {
    return {
        login: async (req, res) => {
            // validation
            const { error } = signinValidator.validate(req.body);
            if (error) {
                res.status(406);
                return res.json({ "result": "false", "message": error.details[0].message });
            }

            // Read users file
            let usersData, usersDataObj;
            try {
                usersData = fs.readFileSync("store/users.json");
                usersDataObj = JSON.parse(usersData);
            } catch (error) {
                return res.json({ "result": "false", "message": "Somthing went wrong. Try again" });
            }

            const { username, password } = req.body;
            try {
                // check if username is exists or not
                const user = usersDataObj.find((data) => {
                    return data.username == username;
                });
                if (!user) {
                    res.status(401);
                    return res.json({ "result": "false", "message": "Wrong credentials. Try again" });
                }

                // compare the password
                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return res.json({ "result": "false", "message": "Wrong credentials. Try again" });
                }

                // generate token
                let access_token = JwtService.sign({ username });

                res.status(200);
                return res.json({ "result": "true", "jwt": access_token, "message": "Signin success" });

            } catch (error) {
                res.json({ "result": "false", "message": "Somthing went wrong. Try again" });
            }
        }
    }
}

module.exports = signinController;