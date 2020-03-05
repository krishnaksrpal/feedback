let express = require("express");
let fs = require("fs");


let app = express();
app.use(express.json());
app.use(express.static("root"));
app.post("/login",(req,res)=>{
    let users = fs.readFileSync("cred.json");
    users = JSON.parse(users);
    console.log(users);
    users.forEach((ele)=>{
        if(ele["username"] == req.body["username"]){
            if(ele["password"] == req.body["password"]){
                res.send({
                    "msg":"ok",
                    "user":ele
                })
            }
            res.send({
                "msg":"403",
                "err":"password does not match"
            })
        }
    })
    res.send({
        "msg":"404",
        "err":"user not found"
    })
})
app.listen(3001,()=>{console.log("listening on port 3001")});