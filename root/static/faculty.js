let faculties;
let branchs;
let sems;
function fefaculties() {
    fetch("faculties").then(res => res.json()).then(data => {
        console.log(data)
        faculties = data;
        makeTable(data);
    })
}
function febranches(){
    fetch("branches").then(res => res.json()).then(data => {
        console.log(data)
        branchs = data;
        branchs.forEach(ele => {
            str += `<option value="${ele["name"]}">${ele["name"]}</option>`; 
        });
    })
}
function fesems(div){
    fetch("semester").then(res => res.json()).then(data => {
        console.log(data)
        sems = data;
        str+=`</select><select class="custom-select" id="sems${subcount}">`
        sems.forEach(ele => {
            str += `<option value="${ele["name"]}">${ele["name"]}</option>`; 
        });
    str += `</select><button id="btn${subcount}" onclick="addsub()" class="btn btn-success">add new</button>
    </div>
    </div>`;
    div.innerHTML = str;
        // makeTable(data);
    })
}
if (user) {
    fefaculties();
}
else {
    location.replace("index.html");
}
let str = "";
function makeTable(data) {
    let table = document.getElementById("myTable");
    str="";
    str = `<tr align="center" class="header">
                      
    <th>faculty ID</th>
    <th>faculty Name</th>
    <th>Options</th>

  </tr>`;
    data.forEach((ele, i) => {
        str += `<tr align="center">
                             
  
        <td>${i + 1}</td>
        <td>${ele["name"]}</td>
        <td><p>
        <a href="javascript:buttonPressed(${(i * 3)});"><button class="btn btn-info btn-rounded btn-sm">ADD SUBJECT</button></a>
        <a href="javascript:buttonPressed(${(i * 3) + 1});"><button class="btn btn-info btn-rounded btn-sm">EDIT</button></a>
        <a href="javascript:buttonPressed(${(i * 3) + 2});"><button class="btn btn-danger btn-rounded btn-sm">DELETE</button></a></td>`
    });
    table.innerHTML = str;
}
function buttonPressed(i) {
    console.log(i, faculties, i / 2);
    if (i % 3 == 0) {
        //add subject

    } else if (i % 3 == 1) {
        //edit

    }
    else {
        //delete
        feDelete(faculties[(i - 2) / 3]["_id"])
    }
}
function feDelete(id) {
    fetch("/faculties/" + id).then(res => res.json()).then(data => {
        console.log(data)
    })
    fefaculties();
}
let divToContainform;
let subcount = 1;
let btn = document.getElementById("newbtn");
// let subbtn = document.createElement("button");
// subbtn.setAttribute("type", "submit");
// subbtn.innerHTML = "Submit";
let flag= true
btn.onclick = () => {
    // febranches();
    // fesems();
    let table = document.getElementById("myTable");
    table.innerHTML = "";
    let area = document.getElementById("area");
    str = "";
    str += "<form id='f2'><div class='row'>"
    str += `
    <div class='col-4'>
        <input type="text" id="name" placeholder="faculty Name" class="form-control"><br>
    </div>
    <div class="col-4">
        <input type="submit" value="submit" class="btn btn-info btn-sm">
    </div>`
    str += "</form>"
    console.log("one");
    divToContainform = document.createElement("div");
    divToContainform.innerHTML = str;
    area.append(divToContainform);
    let divsub = AddSubs();
    let form = document.getElementById("f2");
    form.append(divsub);
    // form.append(subbtn);
    form.onsubmit = (evt) => {
        evt.preventDefault();
        fenewfaculty();
    }

}

function AddSubs() {
    let div = document.createElement("div");
    // div.setAttribute("class","toSEe");
    str = ""
    str += `<div class="row">
    <div class="col-4">
        <input id="sub${subcount}" type="text" placeholder="Subject Name ${subcount}" class="form-control">
        <select id="branch${subcount}" class="custom-select">`
        febranches();
        
        fesems(div);
        
    return div;
}
function addsub() {
    flag= false;
    let btnid = `btn${subcount}`
    document.getElementById(btnid).setAttribute("class", "invisible");
    subcount++;
    let form = document.getElementById("f2");
    // form.removeChild(subbtn);
    let div = AddSubs();
    form.append(div);
    setTimeout(()=>{flag=true;},1000);
}

function fenewfaculty() {
    if(flag==true){
    let name = document.getElementById("name").value;
    let arr = [];
    for (let i = 1; i <=subcount; i++) {
        let subname = document.getElementById(`sub${i}`).value;
        let subbranch = document.getElementById(`branch${i}`).value;
        let subsem = document.getElementById(`sems${i}`).value;
        arr.push({
            subname,
            subbranch,
            subsem
        })
    }
    let data = {
        "name": name,
        "subjects":arr
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
    fetch("/faculties/new", requestOptions).then(res => res.json()).then(dat => {
        send = dat;
        if (send["msg"] == "ok") {
            fefaculties();

        }
        divToContainform.innerHTML = "";
        // let area = document.getElementById("area");
        divToContainform.remove();
    });}
}
