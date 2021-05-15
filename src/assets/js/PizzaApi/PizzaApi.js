import { HttpClient } from '../HttpClient/HttpClient.js';

class PizzaApi extends HttpClient {
    constructor() {
        super('https://private-anon-2134ad2155-pizzaapp.apiary-mock.com/restaurants/restaurantId');
    }

    getPizzaInfo() {
        return this.get('menu?category=Pizza&orderBy=rank');
    }
}

export const pizzaApi = new PizzaApi();