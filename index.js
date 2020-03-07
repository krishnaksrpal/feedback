let express = require("express");
let fs = require("fs");
let datastore = require("nedb")
let batchdb = new datastore("./databases/batch.db");
batchdb.loadDatabase();
let branchdb = new datastore("./databases/branch.db");
branchdb.loadDatabase();
let semesterdb = new datastore("./databases/semester.db");
semesterdb.loadDatabase();
let facultydb = new datastore("./databases/faculty.db");
facultydb.loadDatabase();
let classdb = new datastore("./databases/class.db");
classdb.loadDatabase();
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

app.post("/batches/new",(req,res)=>{
    batchdb.insert(req.body,()=>{
        res.send({"msg":"ok"})
    })
})

app.get("/batches/:id",(req,res)=>{
    batchdb.remove({"_id":req.params["id"]},(err,numr)=>{
        res.send({"msg":"ok"})
    })
})

app.get("/branches",(req,res)=>{
    // batchdb.insert({"name":"me"})
    branchdb.find({},(err,docs)=>{
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

app.post("/branches/new",(req,res)=>{
    branchdb.insert(req.body,()=>{
        res.send({"msg":"ok"})
    })
})

app.get("/branches/:id",(req,res)=>{
    branchdb.remove({"_id":req.params["id"]},(err,numr)=>{
        res.send({"msg":"ok"})
    })
})
app.get("/semester",(req,res)=>{
    // batchdb.insert({"name":"me"})
    semesterdb.find({},(err,docs)=>{
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

app.post("/semester/new",(req,res)=>{
    semesterdb.insert(req.body,()=>{
        res.send({"msg":"ok"})
    })
})

app.get("/semester/:id",(req,res)=>{
    semesterdb.remove({"_id":req.params["id"]},(err,numr)=>{
        res.send({"msg":"ok"})
    })
})

app.get("/faculties",(req,res)=>{
    // batchdb.insert({"name":"me"})
    facultydb.find({},(err,docs)=>{
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

app.post("/faculties/new",(req,res)=>{
    facultydb.insert(req.body,()=>{
        res.send({"msg":"ok"})
    })
})

app.get("/faculties/:id",(req,res)=>{
    facultydb.remove({"_id":req.params["id"]},(err,numr)=>{
        res.send({"msg":"ok"})
    })
})

app.get("/classes",(req,res)=>{
    // batchdb.insert({"name":"me"})
    classdb.find({},(err,docs)=>{
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

app.post("/classes/new",(req,res)=>{
    classdb.insert(req.body,()=>{
        res.send({"msg":"ok"})
    })
})

app.get("/classes/:id",(req,res)=>{
    classdb.remove({"_id":req.params["id"]},(err,numr)=>{
        res.send({"msg":"ok"})
    })
})
app.listen(3001, () => { console.log("listening on port 3001") });