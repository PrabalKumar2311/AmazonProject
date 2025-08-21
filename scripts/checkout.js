import { cart, deleteFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../scripts/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

const dateToday = dayjs();
const deliveryDate = dateToday.add(7, "days");
console.log(deliveryDate.format("ddd, MMMM D"));

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  console.log("matchingProduct");
  console.log(matchingProduct);

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
  <div class="cart-item-container cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-btn"
                  data-product-id="${matchingProduct.id}"
                  >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
  `;

  

  function deliveryOptionsHTML(matchingProduct,cartItem) {

    let deliveryOptionHTML = '';

    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =  deliveryOption.priceCents === 0 ? "FREE" : `$${deliveryOption.priceCents/100} -`;

      console.log(priceString);

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryOptionHTML += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option="${deliveryOption.id}">
        <input type="radio"
        ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `;
    });


    return deliveryOptionHTML;
  }

  document.querySelector(".order-summary").innerHTML = cartSummaryHTML;
  console.log(cartSummaryHTML);

  document.querySelectorAll(".js-delete-btn").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      deleteFromCart(productId);

      console.log(cart);

      const htmlElement = document.querySelector(
        `.cart-item-container-${productId}`
      );

      htmlElement.remove();
    });
  });
});

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
  element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset
    updateDeliveryOption(productId, deliveryOptionId);
  });
})