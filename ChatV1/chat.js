

window.addEventListener("load", function(eee) {
    
    var messages = document.querySelector('#showmessages')

    setInterval(function() {
        var xmlhttp = new XMLHttpRequest();
        var url = "http://edu2.shareyourtime.fr/apijs/messages";
    
        xmlhttp.onreadystatechange = function() {
           
            if (this.readyState == 4 && this.status == 200) {
                messages.innerHTML = "";

                var arr = JSON.parse(this.responseText);
                for(var i = arr.data.length-1; i >= 0; i--) {
                    messages.innerHTML += "<li>" + arr.data[i].nickname + "  ==>  " +  arr.data[i].message + "  " + "</li>";
                // window.scrollTo(0,document.body.scrollHeight);
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        
    },1000);

});

document.addEventListener("DOMContentLoaded", function() {

    var button = document.querySelector("#submit");

    button.addEventListener('click', function() {

        var request = new XMLHttpRequest();

        var url = "http://edu2.shareyourtime.fr/apijs/messages";

        var getmessage = document.querySelector('#message').value;

        request.open("POST", url, true);

        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
                console.log(request.responseText);
            }
        }
        request.send("message="+getmessage+"&nickname=me");
        document.querySelector('#message').value ="";
    })
});

       
var input = document.getElementById("message");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
});
           