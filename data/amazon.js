import { products } from '../scripts/products.js';
import { cart, addToCart } from './cart.js';

let ProductsHTML = ''; 

products.forEach((product) => {

  ProductsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-addToCart"
          data-product-id="${product.id}"
          data-product-quantity="${product.quantity}"
          >
            Add to Cart
          </button>
        </div>
  `

  document.querySelector('.products-grid').innerHTML = ProductsHTML;
}); 

function updateCartQuantity(){
  let cartItems = 0;

    cart.forEach((item) => {
      cartItems += item.quantity;
      // console.log(cartItems);
    });

    let cartValue = document.querySelector('.js-cart-quantity');
    
    cartValue.innerHTML = cartItems;  
}

document.querySelectorAll('.js-addToCart')
.forEach((button)=>{
  button.addEventListener('click', () => {
    console.log(button.dataset);

    const productId = button.dataset.productId;

    //adding to cart array
    addToCart(productId);

    //updating cart items number on homepage
    updateCartQuantity();
    

  });
});