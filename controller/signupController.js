const fs = require("fs");
const bcrypt = require("bcrypt");
const signupValidator = require("../validator/signupValidator");
const JwtService = require("../services/JwtService");

function signupController() {
    return {
        register: async (req, res) => {
            // Validation check for filelds
            const { error } = signupValidator.validate(req.body);
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
                return res.json({ "result": "false", "message": "Somthing went wrong at time of reading file." });
            }

            const { username, password, fname, lname } = req.body;
            let exist = false;
            try {
                // check if username is alredy exists
                const user = usersDataObj.find((data) => {
                    return data.username == username;
                });
                if (user) {
                    exist = true;
                    res.status(406);
                    return res.json({ "result": "false", "message": "User is already exists" });
                }

                // Encode password (Hase Password)
                const hashedPassword = await bcrypt.hash(password, 10);

                let access_token;
                if (exist == false) {
                    // Add new user to json file
                    usersDataObj.push({
                        username,
                        password: hashedPassword,
                        fname,
                        lname
                    });
                    fs.writeFileSync("store/users.json", JSON.stringify(usersDataObj));

                    // JWT token 
                    access_token = JwtService.sign({ username })

                    res.status(201);
                    return res.json({ "result": "true", "message": "SignUp success. Please proceed to Signin", "access_token": access_token });
                }
            } catch (error) {
                res.json({ "result": "false", "message": "Somthing went wrong. Try again" });
            }
        }
    }
}

module.exports = signupController;