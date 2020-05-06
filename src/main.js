import axios from 'axios';
import Pokemon from './pokemon';
import pokemon from './pokemon';

class App {
    constructor(){
        this.pokemon_list = [];
        this.pokemon_info = '';

        this.list_ul = document.getElementById('pokemon_list');
        this.form = document.getElementById('form-serach');
        this.input = document.querySelector('input[name=search]');

        this.registerHandlers();

    }

    registerHandlers(){
        this.form.onsubmit = event =>this.search(event);
    }

    async search(event){
        
        event.preventDefault();
        const pokemon_search = this.input.value;
        
        if(pokemon_search.length > 0){
            this.pokemon_info = await Pokemon.get(pokemon_search);
            this.renderItem();
        }
    }


    async renderItem(){
        let info = this.pokemon_info;
        console.log('pokemon', info['name']);
        
        
    }

    async renderList(){
        this.pokemon_list = await Pokemon.list();

        this.list_ul.innerHTML = ''; //clean the HTML
        
        this.pokemon_list['results'].forEach(pokemon => {
            let img_name = (pokemon['url'].split('pokemon/')[1]).replace('/', '.png');
            let li = document.createElement('li');
            let img = document.createElement('img');
            
            img.setAttribute('src', `./images/sprites/pokemon/${img_name}`);
            li.setAttribute('class', 'col-md-3 item');
            li.setAttribute('id', `item-${pokemon['name']}`);
            li.appendChild(img);
            li.appendChild(document.createTextNode(pokemon['name']));

            this.list_ul.appendChild(li);
        });
    }
}

var myApp = new App();
myApp.renderList();