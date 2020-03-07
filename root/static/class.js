let classes;
function feclasses() {
    fetch("classes").then(res => res.json()).then(data => {
        console.log(data)
        classes = data;
        makeTable(data);
    })
}
function fesems(div) {
    
    fetch("semester").then(res => res.json()).then(data => {
        console.log(data)
        str="";
        sems = data;
    let div2 = document.createElement("div");
        div2.setAttribute("class","col-4");
        str += `</select><select class="custom-select" id="sem">`
        sems.forEach(ele => {
            str += `<option value="${ele["name"]}">${ele["name"]}</option>`;
        });
        str += `</select>
    </div>
    </div>`;
        div2.innerHTML = str;
        div.append(div2);
        // makeTable(data);
    })
}
function febranches(div) {
    
    fetch("branches").then(res => res.json()).then(data => {
        console.log(data)
        branchs = data;
        str="";
    let div2 = document.createElement("div");
    div2.setAttribute("class","col-4");
        str += `<select id="branch" class="custom-select">`
        branchs.forEach(ele => {
            str += `<option value="${ele["name"]}">${ele["name"]}</option>`;
        });
        str += `</select>`
        div2.innerHTML = str;
        div.append(div2);
    })
}
if (user) {
    feclasses();
}
else {
    location.replace("index.html");
}

function makeTable(data,flag=true) {
    let table = document.getElementById("myTable");
    str="";
    if(flag){
        str = `<tr align="center" class="header">
                      
    <th>class ID</th>
    <th>class Name</th>
    <th>Options</th>

  </tr>`;
    data.forEach((ele, i) => {
        str += `<tr align="center">
                             
  
        <td>${i + 1}</td>
        <td>${ele["name"]}</td>
        <td><p><a href="javascript:buttonPressed(${(i * 2)});"><button class="btn btn-info btn-rounded btn-sm">EDIT</button></a>
        <a href="javascript:buttonPressed(${(i * 2) + 1});"><button class="btn btn-danger btn-rounded btn-sm">DELETE</button></a></td>`
    });
}
else{
    str = `<tr align="center" class="header">
                      
    <th>ID</th>
    <th>Options</th>

  </tr>`;
    arr.forEach((ele, i) => {
        str += `<tr align="center">
                             
  
        <td>${ele}</td>
        <td><p>
        <a href="javascript:buttonPressed2(${(i)});"><button class="btn btn-danger btn-rounded btn-sm">DELETE</button></a></td>`
    });
}
    table.innerHTML = str;
}
function buttonPressed2(i){
    arr.splice(i,1);
    makeTable(arr,false);
}
function buttonPressed(i) {
    console.log(i, classes, i / 2);
    if (i % 2 == 0) {
        //edit

    } else {
        //delete
        feDelete(classes[(i - 1) / 2]["_id"])
    }
}
function feDelete(id) {
    fetch("/classes/" + id).then(res => res.json()).then(data => {
        console.log(data)
    })
    feclasses();
}
let newdiv;
let btn = document.getElementById("newbtn");
btn.onclick = () => {
    let table = document.getElementById("myTable");
    table.innerHTML = "";
    let area = document.getElementById("area");
    str = "";
    str += "<form id='f2'><div id='inputs' class='row'>"
    // str += `<div class='col-4'><input type="text" id="branch" placeholder="branch Name" class="form-control"></div>
    // <div class='col-4'><input type="text" id="sem" placeholder="class Name" class="form-control"></div>`;
    str +=`</div><div class="row"><div class="col-4"><input type="text" id="name" placeholder="Enrollment No." class="form-control"></div>
    <button class="btn btn-success" onclick="addStu()">Add Student</button>`;
    str += "</div><br><button type='submit'>Submit</button>"
    str += "</form>"
    newdiv = document.createElement("div");
    newdiv.innerHTML = str;
    area.append(newdiv);
    let div = document.getElementById("inputs");
    febranches(div);
    fesems(div);
    let form = document.getElementById("f2");
    form.onsubmit = (evt) => {
        evt.preventDefault();
        fenewclass();
    }
}
let arr = [];
let flag = true;
function addStu(){
    flag = false;
    let Student = document.getElementById("name").value;
    arr.push(Student);
    setTimeout(()=>{flag=true;},2000)
    makeTable(arr,false);
}



function fenewclass() {
    if(flag==true){
    let name = document.getElementById("branch").value + "-" + document.getElementById("sem").value;
    let data = {
        "name": name,
        "students":arr
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'post',
        headers: myHeaders,
        body: raw
    };
    // let data;
    let send;
    fetch("/classes/new", requestOptions).then(res => res.json()).then(dat => {
        send = dat;
        if (send["msg"] == "ok") {
            feclasses();
            newdiv.innerHTML = "";
            // let area = document.getElementById("area");
            newdiv.remove();
        }
    });}
}
