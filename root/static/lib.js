function fetchGetApi(apiStr){
    let send;
    fetch(apiStr).then(res=>res.json()).then(data=>{
        send = data;
    })
    return send;
}

function fetchPostApi(apiStr,data){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'post',
        headers: myHeaders,
        body: raw
    };
    // let data;
    fetch(apiStr,requestOptions).then(res=>res.json()).then(dat=>{
        send = dat;
    })
    
}
