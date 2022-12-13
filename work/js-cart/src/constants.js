 "use strict";

 export    const PAGES = {
    PRODUCTS: 'products',
    CART: 'cart',
}

 export   const state = {
        cats: [
            { name: 'Apple', price: 0.99, url: 'http://placekitten.com/150/150?image=1', quantity: 0 },
            { name: 'Orange', price: 3.14, url: 'http://placekitten.com/150/150?image=2', quantity: 0 },
            { name: 'Pear', price: 2.73, url: 'http://placekitten.com/150/150?image=3', quantity: 0 },
        ],
        page: PAGES.PRODUCTS,
    };

export default PAGES;
export const state;