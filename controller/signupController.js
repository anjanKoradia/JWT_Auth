const fs = require("fs");
const bcrypt = require("bcrypt");
const signupValidator = require("../validator/signupValidator");
const JwtService = require("../services/JwtService");

function signupController() {
    return {
        register: async (req, res) => {
            if (Object.keys(req.body).length < 4) {
                res.status(400);
                return res.json({ "result": false, "error": "fields can't be empty" });
            }

            // Validation check for filelds
            const { error } = signupValidator.validate(req.body);
            if (error) {
                res.status(400);
                return res.json({ "result": false, "error": error.details[0].message });
            }

            // Read users file
            let usersData, usersDataObj;
            try {
                usersData = fs.readFileSync("store/users.json");
                usersDataObj = JSON.parse(usersData);
            } catch (error) {
                return res.json({ "result": false, "error": "Somthing went wrong at time of reading file." });
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
                    res.status(400);
                    return res.json({ "result": false, "error": "username already exists" });
                }

                if (exist == false) {
                    // Encode password (Hase Password)
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Add new user to json file
                    usersDataObj.push({
                        username,
                        password: hashedPassword,
                        fname,
                        lname
                    });
                    fs.writeFileSync("store/users.json", JSON.stringify(usersDataObj));

                    // JWT token 
                    let access_token = await JwtService.sign({ username });

                    res.status(201);
                    return res.json({ "result": true, "message": "SignUp success. Please proceed to Signin" });
                }
            } catch (error) {
                res.json({ "result": false, "error": "Somthing went wrong. Try again" });
            }
        }
    }
}

module.exports = signupController;