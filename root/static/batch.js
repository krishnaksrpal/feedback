if(user){
    let str = "";
    fetch("batches").then(res=>res.json()).then(data =>{
        console.log(data)
    })
}
else{
    location.replace("index.html");
}

let btn = document.getElementById("newbtn");
btn.onclick = ()=>{
    let table = document.getElementById("myTable");
    table.innerHTML = "";
    let area =  document.getElementById("area");
    str = "";
    str+="<form id='f2'>"
    str += "<select id='type'><option>odd</option><option>even</option></select>";
    str += "<select id='year'>";
    for(let i=2015; i<2031;i++){
        str+="<option>"+i+"</option>";
    }
    str += "</select><br>";
    str += "<button type='submit'>Submit</button>"
    str += "</form>"
    area.innerHTML = str;
}