import render from './../render'
import router from './../router'
import api from './../randomuserapi'
// import randomuserapi from './../randomuserapi'

export default () => {
    //ici on rajoute la logic
    render('home.html')
      setTimeout(() => {
        document.querySelector('#moveid').addEventListener('submit', () => {
          var username = document.querySelector('#username').value;
          var password = document.querySelector('#password').value;
          api.getToken(username, password).then(() => {
            router.navigate('/chatroom')
          })
        })
      }, 500)

    

    // document.querySelector('')

}