import Navigo from 'navigo';
// import render from './render';
import LoginController from './controllers/login'
import ChatControllers from './controllers/chat'
import OtherControllers from './controllers/other'
import router from './router'


router
  .on({
    'login':  LoginController,
    'chatroom': ChatControllers,
    '*': OtherControllers
  })
  .resolve();