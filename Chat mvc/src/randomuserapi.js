export default {
    getToken: (email, password) => {
        return new Promise((resolve) => {
            fetch('http://edu2.shareyourtime.fr/apijsv2/auth', {
              method: 'POST', 
              body: "email="+ email +"&password="+password, 
              headers:{
                  'Content-Type': 'application/x-www-form-urlencoded',
              }
          }).then((data)=>{
              return data.json();
          }).then((getdata)=>{
            console.log(getdata)
              var gettoken =  getdata['data']
              var token = gettoken['token'];
              localStorage.setItem('tokenChat','Bearer '+token) 
              resolve()
          })            
        })
    },

    getMessages: () => {
        return new Promise((resolve) => {
            fetch("http://edu2.shareyourtime.fr/apijsv2/messages",{
                method: 'GET',
                headers: { Authorization : localStorage.getItem('tokenChat')}
            }).then ((res) => {
                res.json().then((json) => {
                    console.log(json) 
                    for(var i = json.data.length-1; i >= 0; i--) {
                        if (document.querySelector("[messageid=m" +json.data[i].id + "]") == null) {
                            var name = document.createElement('div')
                            name.setAttribute('messageid', "m" + json.data[i].id)
                            var names = document.createTextNode(json.data[i].nickname + "  ==>  " + json.data[i].message + "  ")
                            name.appendChild(names)
                            document.querySelector("#showmessages").appendChild(name)
                        }
                    }  
                })    
            }).catch((error) => {
                console.log('Il y a eu un problème avec l\'opération fetch: ');
            })
            resolve()
        })
    },

    sendMessage: (message) => {
        return new Promise((resolve) => {
        fetch("http://edu2.shareyourtime.fr/apijsv2/messages", {
            method: 'POST', 
            headers: { Authorization : localStorage.getItem('tokenChat'),
            'Content-Type': 'application/x-www-form-urlencoded',},
            body: 'message='+document.getElementById('message').value
        }).then (() => {
            document.querySelector('#message').value ="";
        }) 
        }) 
    }
}