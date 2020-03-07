let semester;
function fesemester(){
    fetch("semester").then(res => res.json()).then(data => {
        console.log(data)
        semester = data;
        makeTable(data);
    })
}
if (user) {
    fesemester();   
}
else {
    location.replace("index.html");
}

function makeTable(data){
    let table = document.getElementById("myTable");
    let str = `<tr align="center" class="header">
                      
    <th>semester ID</th>
    <th>semester Name</th>
    <th>Options</th>

  </tr>`;
    data.forEach((ele,i) => {
        str += `<tr align="center">
                             
  
        <td>${i+1}</td>
        <td>${ele["name"]}</td>
        <td><p><a href="javascript:buttonPressed(${(i*2)});"><button class="btn btn-info btn-rounded btn-sm">EDIT</button></a>
        <a href="javascript:buttonPressed(${(i*2)+1});"><button class="btn btn-danger btn-rounded btn-sm">DELETE</button></a></td>`
    });
    table.innerHTML = str;
}
function buttonPressed(i){
    console.log(i,semester,i/2);
    if(i%2==0){
        //edit
        
    }else{
        //delete
        feDelete(semester[(i-1)/2]["_id"])
    }
}
function feDelete(id){
    fetch("/semester/"+id).then(res => res.json()).then(data => {
        console.log(data)
    })
    fesemester();
}
let newdiv;
let btn = document.getElementById("newbtn");
btn.onclick = () => {
    let table = document.getElementById("myTable");
    table.innerHTML = "";
    let area = document.getElementById("area");
    str = "";
    str += "<form id='f2'><div class='row'>"
    str += `<div class='col-4'><input type="text" id="name" placeholder="semester Name" class="form-control"></div>`;
    str += "<br><button type='submit'>Submit</button>"
    str += "</form>"
    newdiv= document.createElement("div");
    newdiv.innerHTML = str;
    area.append(newdiv);
    let form = document.getElementById("f2");
    form.onsubmit = (evt)=>{
        evt.preventDefault();
        fenewsemester();
    }
}



function fenewsemester(){
    let name = document.getElementById("name").value;
    let data = {
        "name" : name
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
    fetch("/semester/new",requestOptions).then(res=>res.json()).then(dat=>{
        send = dat;
        if(send["msg"]=="ok"){
            fesemester();
            newdiv.innerHTML = "";
            // let area = document.getElementById("area");
            newdiv.remove();
        }
    });
}
