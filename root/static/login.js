let form = document.getElementById("f1");
form.onsubmit =  (evt) => {
    evt.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let data = {
        "username": username,
        "password": password
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
    fetch("/login",requestOptions).then(res=>res.json()).then(dat=>{
        send = dat;
        afterFetch(send);
    });
}
    function afterFetch(send){
        console.log(send);
        if(send.msg=="403"|| send.msg=="404"){
            alert(send.err);
        }
        else{
            localStorage.setItem("username",send.user.username);
            location.replace("/batch.html");
        }
    }