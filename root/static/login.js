let form = document.getElementById("f1");
form.onsubmit = (evt) => {
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
    let send;
    fetch("/login", requestOptions).then(res => res.json()).then(dat => {
        send = dat;
        afterFetch(send);
    })
}

function afterFetch(send) {
    console.log(send);
    localStorage.setItem()
}