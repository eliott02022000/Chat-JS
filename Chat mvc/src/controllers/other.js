// import render from './../render'
import router from './../router'


// render('home.html')
if (localStorage.getItem('tokenChat') != null) {
    router.navigate('/chatroom')
}
else {
    router.navigate('/login')
}