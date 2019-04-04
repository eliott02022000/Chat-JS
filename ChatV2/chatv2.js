
document.getElementById('firstcontainer').style.display = "none"
document.getElementById('secondcontainer').style.display = "block"

var buttonv2 = document.querySelector("#buttonv2");
var submit = document.querySelector("#submit");

buttonv2.addEventListener('click', () => {
   
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    fetch('http://edu2.shareyourtime.fr/apijsv2/auth', {
        method: 'POST', 
        body: "email="+ username +"&password="+password, 
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then((data)=>{
        return data.json();
    }).then((getdata)=>{
        var gettoken =  getdata['data']
        var token = gettoken['token'];
        localStorage.setItem('tokenChat','Bearer '+token) 

        document.getElementById('firstcontainer').style.display = "block"
        document.getElementById('secondcontainer').style.display = "none"

        setInterval(() => {
            fetch("http://edu2.shareyourtime.fr/apijsv2/messages",{
                method: 'GET',
                headers: { Authorization : "Bearer " + token}
            }).then ((res) => {

                res.json().then((json) => {
                    console.log(json) 
                    for(var i = json.data.length-1; i >= 0; i--) {
                        if (document.querySelector("[messageid=m" +json.data[i].id + "]") == null) {
                            var name = document.createElement('div')
                            name.setAttribute('messageid', "m" + json.data[i].id)
                            var names = document.createTextNode(json.data[i].nickname + "  ==>  " + json.data[i].message + "  ")
                            name.appendChild(names)
                            showmessages.appendChild(name)
                        }
                    }
                    // for (i = 0; i < json.data[i].nickname; i++) {
                    //     var names = document.createTextNode(json.data[i].nickname + "  ==>  " + json.data[i].message + "  ")
                    //     if (names == true ) {
                    //         var x = document.createElement("input")
                    //         x.type = "checkbox";
                    //         x.value = json.data[i].nickname;
                    //     }
                        
                    // }     
                })    
            }).catch((error) => {
                console.log('Il y a eu un problème avec l\'opération fetch: ');
            })
        },500);
    
        submit.addEventListener('click', () => {
            fetch("http://edu2.shareyourtime.fr/apijsv2/messages", {
                method: 'POST', 
                headers: { Authorization : "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded',},
                body: 'message='+document.getElementById('message').value
            }).then (() => {
                document.querySelector('#message').value ="";
            })   
        })
    })
});

var input = document.getElementById("message");
input.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
});
           