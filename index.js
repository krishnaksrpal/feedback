let express = require("express");
let fs = require("fs");
let datastore = require("nedb")
let batchdb = new datastore("./databases/batch.db");
batchdb.loadDatabase();
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
// batchdb.insert({"name":"me"})
app.get("/batches",(req,res)=>{
    // batchdb.insert({"name":"me"})
    batchdb.find({},(err,docs)=>{
        if(err){
            console.log(err)
            res.send(err);
        }
        else{
            res.send(docs)
        }
        
    })
    // console.log("1");
    // res.send([{"name":"ok"}])
    // res.send(batches)
})
app.listen(3001, () => { console.log("listening on port 3001") });