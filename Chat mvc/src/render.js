import Mustache from 'mustache';

export default function render(view, params) {

    fetch(`../src/views/${view}`).then((data) => {
        data.text().then((data) => {
            document.querySelector('#app').innerHTML = Mustache.render(data, params)
        })
    })

}