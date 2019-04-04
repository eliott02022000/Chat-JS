import render from './../render'
import api from './../randomuserapi'


// import randomuserapi from './../randomuserapi'

export default () => {
    render("chat.html")
    setInterval(() => {
        api.getMessages()
    },1000);

    setTimeout(()=> {
        document.querySelector("#submit").addEventListener('click', () => {
            api.sendMessage() 
        })
    },500);
}
