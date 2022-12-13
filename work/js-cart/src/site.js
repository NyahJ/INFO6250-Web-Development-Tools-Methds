"use strict";
import { PAGES, state} from './constants.js';

(function() {

const PAGES = {
    PRODUCTS: 'products',
    CART: 'cart',
}
//    const state = {
//        cats: [
//            { name: 'Apple', price: 0.99, url: 'http://placekitten.com/150/150?image=1', quantity: 0 },
//            { name: 'Orange', price: 3.14, url: 'http://placekitten.com/150/150?image=2', quantity: 0 },
//            { name: 'Pear', price: 2.73, url: 'http://placekitten.com/150/150?image=3', quantity: 0 },
//        ],
//        page: PAGES.PRODUCTS,
//    };

    const stateOfCart = {
        catsInCart: [
            { name: 'Apple', price: 0.99, url: 'http://placekitten.com/150/150?image=1', quantity: 0 },
            { name: 'Orange', price: 3.14, url: 'http://placekitten.com/150/150?image=2', quantity: 0 },
            { name: 'Pear', price: 2.73, url: 'http://placekitten.com/150/150?image=3', quantity: 0 },
        ],
        page: PAGES.CART,
    };

    let totalQuantity = 0;
    let totalPrice = 0;

    const appEl = document.querySelector('#app');
    appEl.addEventListener('click', (event) => {

        if(event.target.classList.contains('add')) {
            const index = event.target.dataset.index;
            totalQuantity++;
            totalPrice += stateOfCart.catsInCart[index].price;
            stateOfCart.catsInCart[index].quantity++;

            render();
            return;
        }

        if(event.target.classList.contains('decrease')) {
            const index = event.target.dataset.index;
            if (stateOfCart.catsInCart[index].quantity > 0) {
                totalQuantity--;
                totalPrice -= stateOfCart.catsInCart[index].price;
                stateOfCart.catsInCart[index].quantity--;
            }
            render();
            return;
        }

        if (event.target.classList.contains('page')) {
            state.page = event.target.dataset.target;
            render();
            return;
        }

        if (event.target.classList.contains('clear')) {
            totalPrice = 0;
            totalQuantity = 0;

            let index = 0;
            for(index = 0; index < stateOfCart.catsInCart.length; index++) {
                stateOfCart.catsInCart[index].quantity = 0;
            }

            render();
            return;
        }
    });


// VIEW: rendering related stuff;
    function render() {
        if(state.page === PAGES.PRODUCTS) {
            renderProducts();
            return;
        }

        if (state.page === PAGES.CART) {
            renderCart();
            return;
        }
    }

    function renderProducts() {
        if(state.page === PAGES.PRODUCTS) {
            const productsHtml = state.cats.map( (cat, index) => {
            return `
            <li>
             <span class="cat", data-index="${index}">
                ${cat.name}, $${cat.price} </span>
                <img src="${cat.url}"/>
                <button type="button" class="add" data-index="${index}">
                    Add to Cart
                </button>
            </li>
            `;
            }).join('');

            if (totalQuantity === 0) {
                const html = `
                    <h2>GET YOUR CATS</h2>
                    <ul class="cats">${productsHtml}</ul>
                    <button type="button" class="page" class="view" data-target="cart">
                        View Cart
                    </button>
                `;
                appEl.innerHTML = html;
            } else {
                const html = `
                    <h2>GET YOUR CATS</h2>
                    <ul class="cats">${productsHtml}</ul>
                    <button type="button" class="page" class="view" data-target="cart">
                        View Cart (${totalQuantity})
                    </button>
                `;
                appEl.innerHTML = html;
            }
        }
    }

    function renderCart() {
        if (state.page === PAGES.CART) {
            const productsHtml = state.cats.map( (cat, index) => {
            return `
                 <li>
                    <span class="cat", data-index="${index}">
                        ${cat.name}, $${cat.price} </span>
                        <img src="${cat.url}"/>
                        <button type="button" class="add" data-index="${index}">
                            Add to Cart
                        </button>
                </li>
                `;
                }).join('');


        let cartHtml = `<h4>Nothing in the cart</h4>`;

        if(totalQuantity != 0) {
            cartHtml = stateOfCart.catsInCart.map( (catInCart, index) => {
            if (catInCart.quantity === 0) {
            return;
            } else {
            return `
                 <li>
                    <span class="catInCart", data-index="${index}">
                        ${catInCart.name}, ${catInCart.quantity} in cart,
                        ${Number.parseFloat(catInCart.quantity * catInCart.price).toFixed(2)}$
                    </span>
                        <img src="${catInCart.url}"/>
                        <button type="button" class="add" data-index="${index}">
                            Increase
                        </button>
                        <button type="button" class="decrease" data-index="${index}">
                            Decrease
                        </button>
                </li>
                `;}
                }).join('');
                }

                const html = `
                    <h2>GET YOUR CATS</h2>
                    <ul class="cats">${productsHtml}</ul>
                    <h2>YOUR CART</h2>
                    <h3>Total Price: $${Number.parseFloat(totalPrice).toFixed(2)}</h3>
                    <button type="button" class="clear" data-target="product">
                        Checkout
                    </button>
                    <button type="button" class="page" data-target="products">
                        Hide Cart
                    </button>

                    <ul class="cats">${cartHtml}</ul>

                `;
                appEl.innerHTML = html;
        }
    }

    render();

})();