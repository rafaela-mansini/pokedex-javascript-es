import axios from 'axios';
import Pokemon from './pokemon';

class App {
    constructor(){
        this.pokemon_list = [];
    }


    async render(){
        this.pokemon_list = await Pokemon.list();
        console.log(this.pokemon_list);
    }
}

var myApp = new App();
myApp.render();