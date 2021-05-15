import { STORAGE_KEYS as keys } from "../Storage/Consts.js";
import { storage } from "../Storage/Storage.js";
import { Pizza } from "../Pizza/Pizza.js";

export class Basket {
    static getBasket() {
        return storage.getItem(keys.CART_BASKET);
    }

    static checkBasketIfPizzaExists(pizza) {
        const basket = this.getBasket();
        if (!basket)
            return false;
        else if (JSON.parse(basket).id == pizza.id)
            return true;
        else
            return false;
    }

    static getBasketItemWithId(id) {
        const basket = JSON.parse(this.getBasket());
        return basket.find(p => p.id == id);
    }

    static isBasketEmpty() {
        if (!this.getBasket())
            return true;
        else
            return false;
    }

    static addToBasket(pizza) {
        const cartPizza = new Pizza(pizza.id, pizza.name, pizza.topping, pizza.price);
        if (this.checkBasketIfPizzaExists(cartPizza))
            this.getBasketItemWithId(cartPizza.id).count += 1;
        else
            cartPizza.count = 1;

        if (this.isBasketEmpty())
            storage.setItem(keys.CART_BASKET, JSON.stringify([cartPizza]));
        else {
            const basket = JSON.parse(this.getBasket());

            if (basket.some(p => p.id == cartPizza.id)) {
                basket.find(p => p.id == cartPizza.id).count++;
                storage.setItem(keys.CART_BASKET, JSON.stringify(basket));
            }
            else {
                basket.push(cartPizza);
                storage.setItem(keys.CART_BASKET, JSON.stringify(basket));
            }
        }
        this.renderBasket("cart-content");
    }

    static renderBasket(basketId) {
        const pizzas = JSON.parse(this.getBasket());
        let basketOnDom = document.getElementById(basketId);
        basketOnDom.innerHTML = !this.isBasketEmpty() ? "<h4>Your Cart</h4>" : "<h4>Cart is empty! :(((</h4>";
        if (this.isBasketEmpty()) { basketOnDom.innerHTML = "<h4>Your Cart</h4>" };
        if (!this.isBasketEmpty()) {
            pizzas.forEach(pizza => {
                basketOnDom.innerHTML += `
                                <div class="cart-item d-flex my-3">
                                    <div class="image">
                                        <img src="../src/assets/img/pizza-in-basket.png" class="img-fluid" alt="${pizza.name} in basket">
                                    </div>
                                        <div class="d-flex align-items-center">
                                            <strong class="me-3">x${pizza.count}</strong>
                                        <div class="text" style="width: 150px;">
                                        <h6 class="mb-0">${pizza.name}</h6>
                                        <strong>size: 32</strong>
                                    </div>
                                        <strong>${pizza.price * pizza.count} <sup>AZN</sup></strong>
                                        <button class="btn btn-primary-circle btn-remove-card-item" data-id="${pizza.id}"><i class="fas fa-times"> </i></button>
                                    </div>
                                </div>
                                `
            });
        }

        const btnDelete = document.getElementsByClassName("btn-remove-card-item");
        Array.prototype.forEach.call(btnDelete, (btn) => {
            btn.addEventListener('click', () => { this.deleteCardFromBasket(btn.getAttribute('data-id')) })
        })

    }

    static deleteCardFromBasket(id) {
        let basket = JSON.parse(this.getBasket());
        basket = basket.filter(p => p.id != id);
        storage.setItem(keys.CART_BASKET, JSON.stringify(basket));
        this.renderBasket("cart-content");
    }
}