if(user){
    let str = "";
    fetch("batches").then(res=>res.json()).then(data =>{
        console.log(data)
    })
}
else{
    location.replace("index.html");
}