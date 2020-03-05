let express = require("express");
let fs = require("fs");


let app = express();
app.use(express.json());
app.use(express.static("root"));
app.post("/login", (req, res) => {
    let users = fs.readFileSync("cred.json");
    users = JSON.parse(users);
    // console.log(users);
    let send;
    users.forEach((ele) => {
        if (ele["username"] == req.body["username"]) {
            if (ele["password"] == req.body["password"]) {
                send = {
                    "msg": "ok",
                    "user": ele
                }
            }
            else {
                send = {
                    "msg": "403",
                    "err": "password does not match"
                }
            }
        }
    })
    if (send == null) {
        send = {
            "msg": "404",
            "err": "user not found"
        }
    }
    res.send(send);

})
app.listen(3000, () => { console.log("listening on port 3000") });