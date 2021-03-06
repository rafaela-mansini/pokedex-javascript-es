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
        this.div_information = document.querySelector('#pokemon_information');

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
        
        this.list_ul.setAttribute('style', 'display:none');

        document.querySelector('#pokemon_information img').setAttribute('src', info.sprites.front_default);
        document.querySelector('#name').innerHTML = info['name'];
        document.querySelector('#weight').innerHTML = info['weight'];
        document.querySelector('#height').innerHTML = info['height'];
        document.querySelector('#fire').innerHTML = info.types[0].type.name;
        this.div_information.classList.remove('invisible');

        this.renderStats(info['stats']);
        this.renderAbilities(info['abilities']);
        this.renderTypes(info['types']);

        
    }

    renderStats(stats){
        let div = document.createElement('div');
        let content = '<p class="component-title">Stats</p>';

        stats.forEach(stat => {
            content += `<div class="progress"><div class="progress-bar" role="progressbar" style="width: ${stat['base_stat']}%;" aria-valuenow="${stat['base_stat']}" aria-valuemin="0" aria-valuemax="100">${stat['base_stat']}: ${stat.stat['name']}</div></div>`;
        });

        div.innerHTML = content;
        this.div_information.appendChild(div);
    }

    renderAbilities(abilities){
        let div = document.createElement('div');
        let content = '<p class="component-title">Abilities</p><div class="row">';
        abilities.forEach(ability => {
            content += `<div class="col-md-4 text-capitalize">${ability.ability['name']}</div>`;
        });
        content += '</div>';

        div.innerHTML = content;
        this.div_information.appendChild(div);
    }

    renderTypes(types){
        let div_types = document.createElement('div');
        let content_types = '<p class="component-title">Types</p><div class="row">';
        types.forEach(type => {
            content_types += `<div class="col-md-4 text-capitalize">${type.type['name']}</div>`;
        });
        content_types += '</div>';

        div_types.innerHTML = content_types;
        this.div_information.appendChild(div_types);
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