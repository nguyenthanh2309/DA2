import createToast from "./toast.js";

const tableBody = document.querySelector(".cart-products-table tbody");
const cartDropdownMenu = document.querySelector(
    ".tools-cart>.cart-dropdown-menu"
);
const cartBadge = document.querySelector(".cart-badge");

const auth = JSON.parse(localStorage.getItem("auth"));
const accounts = JSON.parse(localStorage.getItem("accounts"));

let totalAllPrice = 0;

const loadCartPage = () => {
    try {
        const cart = auth.loggedAccount.cart;
        if (cart) {
            cart.forEach((product) => {
                totalAllPrice += product.totalPrice;
                const cartProduct = `<tr>
                    <td>    
                        <img src=${product.image}>
                    </td>
                    <td>${product.productName}</td>
                    <td>${product.price.toLocaleString()} vnđ</td>
                    <td><input type="number" value=${product.amount}></td>
                    <td>${product.totalPrice.toLocaleString()} vnđ</td>
                </tr>
                `;
                tableBody.innerHTML += cartProduct;
            });
            tableBody.insertAdjacentHTML(
                "beforeend",
                `<tr class="total-price"><td colspan=5>Tổng chi phí <span>${totalAllPrice.toLocaleString()} vnđ</span></td></tr>`
            );
        } else {
            tableBody.innerHTML = `<tr><td colspan=5 class="cart-empty">Giỏ hàng trống</td></tr>`;
        }
    } catch (error) {}
};

const loadCart = () => {
    try {
        const cart = auth.loggedAccount.cart;
        let totalProduct = 0;
        if (cart) {
            cart.forEach((product) => (totalProduct += product.amount));

            if (cartBadge) {
                cartBadge.textContent = totalProduct;
            }

            const cartButton = `<div class="cart-btn-container">
                <button type="button" class="btn-watch-cart"><a href="./giohang.html">XEM GIỎ HÀNG</a></button>
                <button type="button" class="btn-order"><a href="./hoadon.html">ĐẶT HÀNG</a></button>
            </div>`;

            const dropdownProductWrapper = document.createElement("div");
            dropdownProductWrapper.classList.add("dropdown-product-wrapper");

            cart.forEach((product) => {
                const cartProduct = `<div class="cart-product-wrapper">
                <div class="product-image"><img src=${product.image}></div>
                <div class="product-info">
                    <span class="product-name">${product.productName}</span>
                    <span class="product-amount">Số lượng: ${product.amount}</span>
                </div>
            </div>`;
                dropdownProductWrapper.innerHTML += cartProduct;
            });

            cartDropdownMenu.innerHTML = `${dropdownProductWrapper.outerHTML}${cartButton}`;
        }
    } catch (error) {
        console.log(error);
    }
};

const addToCart = (cartProduct) => {
    try {
        let cart = auth.loggedAccount.cart;
        if (!cart) {
            auth.loggedAccount.cart = [cartProduct];
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].email === auth.loggedAccount.email) {
                    accounts[i].cart = auth.loggedAccount.cart;
                }
            }
            localStorage.setItem("auth", JSON.stringify(auth));
            localStorage.setItem("accounts", JSON.stringify(accounts));
        } else {
            let isExisted = 0;
            cart.forEach((product) => {
                if (cartProduct.productName === product.productName) {
                    isExisted = 1;
                    product.amount += cartProduct.amount;
                    product.totalPrice = product.amount * product.price;
                }
            });
            if (isExisted === 0) {
                cart.push(cartProduct);
            }
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].email === auth.loggedAccount.email) {
                    accounts[i].cart = cart;
                }
            }
            localStorage.setItem("auth", JSON.stringify(auth));
            localStorage.setItem("accounts", JSON.stringify(accounts));
        }
        createToast(1, "Sản phẩm đã được thêm vào giỏ hàng");
        loadCart();
    } catch (error) {
        createToast(0, "Có lỗi đã xảy ra!");
        console.log(error);
    }
};

loadCartPage();
loadCart();

export default addToCart;