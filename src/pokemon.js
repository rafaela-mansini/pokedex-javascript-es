import constants from './constants';
import axios from 'axios';

var url_api = constants('url_api');

class Pokemon {
    async get(name) {
        try {
            const response = await axios.get(`${url_api}pokemon/${name}`);
            console.log(response);
        } catch (error) {
            console.warn('Um erro ocorreu na API', error);
        }
    }
}

const pokemon = new Pokemon();
export default pokemon;