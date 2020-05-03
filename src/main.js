import axios from 'axios';
import Pokemon from './pokemon';
import pokemon from './pokemon';

class App {
    constructor(){
        this.pokemon_list = [];

        this.list_ul = document.getElementById('pokemon_list');
    }


    async render(){
        this.renderList();
    }
    async renderList(){
        this.pokemon_list = await Pokemon.list();

        this.list_ul.innerHTML = ''; //clean the HTML
        console.log(this.pokemon_list);
        this.pokemon_list['results'].forEach(pokemon => {
            let img_name = (pokemon['url'].split('pokemon/')[1]).replace('/', '.png');
            let li = document.createElement('li');
            let img = document.createElement('img');

            img.setAttribute('src', `./images/sprites/pokemon/${img_name}`);

            console.log(img);
            li.setAttribute('class', 'col-md-3');
            li.appendChild(img);
            li.appendChild(document.createTextNode(pokemon['name']));

            this.list_ul.appendChild(li);
            // console.log(li);
            // this.pokemon_ul
        });
        // console.log(this.pokemon_list, this.pokemon_ul);
    }
}

var myApp = new App();
myApp.render();