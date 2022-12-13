/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/site.js ***!
  \*********************/


//import { PAGES, state} from './constants.js';
(function () {
  var PAGES = {
    PRODUCTS: 'products',
    CART: 'cart'
  };
  var state = {
    cats: [{
      name: 'Apple',
      price: 0.99,
      url: 'http://placekitten.com/150/150?image=1',
      quantity: 0
    }, {
      name: 'Orange',
      price: 3.14,
      url: 'http://placekitten.com/150/150?image=2',
      quantity: 0
    }, {
      name: 'Pear',
      price: 2.73,
      url: 'http://placekitten.com/150/150?image=3',
      quantity: 0
    }],
    page: PAGES.PRODUCTS
  };
  var stateOfCart = {
    catsInCart: [{
      name: 'Apple',
      price: 0.99,
      url: 'http://placekitten.com/150/150?image=1',
      quantity: 0
    }, {
      name: 'Orange',
      price: 3.14,
      url: 'http://placekitten.com/150/150?image=2',
      quantity: 0
    }, {
      name: 'Pear',
      price: 2.73,
      url: 'http://placekitten.com/150/150?image=3',
      quantity: 0
    }],
    page: PAGES.CART
  };
  var totalQuantity = 0;
  var totalPrice = 0;
  var appEl = document.querySelector('#app');
  appEl.addEventListener('click', function (event) {
    if (event.target.classList.contains('add')) {
      var index = event.target.dataset.index;
      totalQuantity++;
      totalPrice += stateOfCart.catsInCart[index].price;
      stateOfCart.catsInCart[index].quantity++;
      render();
      return;
    }
    if (event.target.classList.contains('decrease')) {
      var _index = event.target.dataset.index;
      if (stateOfCart.catsInCart[_index].quantity > 0) {
        totalQuantity--;
        totalPrice -= stateOfCart.catsInCart[_index].price;
        stateOfCart.catsInCart[_index].quantity--;
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
      var _index2 = 0;
      for (_index2 = 0; _index2 < stateOfCart.catsInCart.length; _index2++) {
        stateOfCart.catsInCart[_index2].quantity = 0;
      }
      render();
      return;
    }
  });

  // VIEW: rendering related stuff;
  function render() {
    if (state.page === PAGES.PRODUCTS) {
      renderProducts();
      return;
    }
    if (state.page === PAGES.CART) {
      renderCart();
      return;
    }
  }
  function renderProducts() {
    if (state.page === PAGES.PRODUCTS) {
      var productsHtml = state.cats.map(function (cat, index) {
        return "\n            <li>\n             <span class=\"cat\", data-index=\"".concat(index, "\">\n                ").concat(cat.name, ", $").concat(cat.price, " </span>\n                <img src=\"").concat(cat.url, "\"/>\n                <button type=\"button\" class=\"add\" data-index=\"").concat(index, "\">\n                    Add to Cart\n                </button>\n            </li>\n            ");
      }).join('');
      if (totalQuantity === 0) {
        var html = "\n                    <h2>GET YOUR CATS</h2>\n                    <ul class=\"cats\">".concat(productsHtml, "</ul>\n                    <button type=\"button\" class=\"page\" class=\"view\" data-target=\"cart\">\n                        View Cart\n                    </button>\n                ");
        appEl.innerHTML = html;
      } else {
        var _html = "\n                    <h2>GET YOUR CATS</h2>\n                    <ul class=\"cats\">".concat(productsHtml, "</ul>\n                    <button type=\"button\" class=\"page\" class=\"view\" data-target=\"cart\">\n                        View Cart (").concat(totalQuantity, ")\n                    </button>\n                ");
        appEl.innerHTML = _html;
      }
    }
  }
  function renderCart() {
    if (state.page === PAGES.CART) {
      var productsHtml = state.cats.map(function (cat, index) {
        return "\n                 <li>\n                    <span class=\"cat\", data-index=\"".concat(index, "\">\n                        ").concat(cat.name, ", $").concat(cat.price, " </span>\n                        <img src=\"").concat(cat.url, "\"/>\n                        <button type=\"button\" class=\"add\" data-index=\"").concat(index, "\">\n                            Add to Cart\n                        </button>\n                </li>\n                ");
      }).join('');
      var cartHtml = "<h4>Nothing in the cart</h4>";
      if (totalQuantity != 0) {
        cartHtml = stateOfCart.catsInCart.map(function (catInCart, index) {
          if (catInCart.quantity === 0) {
            return;
          } else {
            return "\n                 <li>\n                    <span class=\"catInCart\", data-index=\"".concat(index, "\">\n                        ").concat(catInCart.name, ", ").concat(catInCart.quantity, " in cart,\n                        ").concat(Number.parseFloat(catInCart.quantity * catInCart.price).toFixed(2), "$\n                    </span>\n                        <img src=\"").concat(catInCart.url, "\"/>\n                        <button type=\"button\" class=\"add\" data-index=\"").concat(index, "\">\n                            Increase\n                        </button>\n                        <button type=\"button\" class=\"decrease\" data-index=\"").concat(index, "\">\n                            Decrease\n                        </button>\n                </li>\n                ");
          }
        }).join('');
      }
      var html = "\n                    <h2>GET YOUR CATS</h2>\n                    <ul class=\"cats\">".concat(productsHtml, "</ul>\n                    <h2>YOUR CART</h2>\n                    <h3>Total Price: $").concat(Number.parseFloat(totalPrice).toFixed(2), "</h3>\n                    <button type=\"button\" class=\"clear\" data-target=\"product\">\n                        Checkout\n                    </button>\n                    <button type=\"button\" class=\"page\" data-target=\"products\">\n                        Hide Cart\n                    </button>\n\n                    <ul class=\"cats\">").concat(cartHtml, "</ul>\n\n                ");
      appEl.innerHTML = html;
    }
  }
  render();
})();
/******/ })()
;
//# sourceMappingURL=site.js.map