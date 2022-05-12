const fs = require("fs");

function userController() {
    return {
        me: (req, res) => {
            // Read users file
            let usersData, usersDataObj;
            try {
                usersData = fs.readFileSync("store/users.json");
                usersDataObj = JSON.parse(usersData);
            } catch (error) {
                return res.json({ "result": false, "error": "Somthing went wrong at time of reading file." });
            }

            let username = req.user.username;
            try {
                // check if username is exists or not
                const user = usersDataObj.find((data) => {
                    return data.username == username;
                });
                if (!user) {
                    res.status(404);
                    return res.json({ "result": false, "error": "User not found. Try again" });
                }

                const { fname, lname, password } = user;

                res.status(200);
                return res.json({ "result": true, "data": { fname, lname, password } });

            } catch (error) {
                res.json({ "result": false, "error": "Somthing went wrong. Try again" });
            }
        }
    }
}

module.exports = userController;