import email from "./login.js";

const toolUserBtn = document.querySelector(
    ".right-content-tools .tools-user-btn"
);
const toolsUserDropdown = document.querySelector(
    ".tools-user-container>.tools-user-dropdown"
);
const userInfo = document.querySelector(".dropdown-user-info");
const btnWrapper = document.querySelector(".dropdown-btn-wrapper");
const btnAddToCarts = document.querySelectorAll(".btn-add-to-cart");

// handle dropdown menu
toolUserBtn.addEventListener("click", () => {
    toolsUserDropdown.classList.toggle("active");
});

window.addEventListener("click", (e) => {
    if (!toolUserBtn.contains(e.target)) {
        toolsUserDropdown.classList.remove("active");
    }
});

//handle add to cart
btnAddToCarts.forEach((btnAddToCart) => {
    btnAddToCart.addEventListener("click", (e) => {
        const product = e.target.closest(".product-list-item");

        const image = product.querySelector(".item-image").getAttribute("src");
        const productName = product.querySelector(".item-name").textContent;
        const price = parseInt(
            product.querySelector(".item-price").textContent.split(",").join("")
        );
        const amount = 1;
        const totalPrice = price * amount;

        const cartProduct = {
            image: image,
            productName: productName,
            price: price,
            amount: amount,
            totalPrice: totalPrice,
        };

        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify([cartProduct]));
        } else {
            const cart = JSON.parse(localStorage.getItem("cart"));
            let isExisted = 0;
            cart.forEach((product) => {
                if (cartProduct.productName === product.productName) {
                    isExisted = 1;
                    product.amount += 1;
                    product.totalPrice = product.amount * product.price;
                }
            });
            if (isExisted === 0) {
                cart.push(cartProduct);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    });
});
//

//handle user dropdown menu if logged in or not

let isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn) {
    const userEmail = `<div class="dropdown-user-email"><span>${email}</span></div>`;

    toolsUserDropdown.insertAdjacentHTML("afterbegin", userEmail);

    const userInfoLink = `<a href="./thongtintaikhoan.html" class="dropdown-link">Thông tin tài khoản</a>`;
    userInfo.insertAdjacentHTML("beforebegin", userInfoLink);

    const btnLogOut = `<button type="button" class="dropdown-btn logout">ĐĂNG XUẤT</button>`;
    Array.from(btnWrapper.children).forEach((child) => {
        btnWrapper.removeChild(child);
    });

    btnWrapper.insertAdjacentHTML("afterbegin", btnLogOut);
} else {
    toolsUserDropdown.removeChild(toolsUserDropdown.firstChild);
    userInfo.removeChild(userInfo.firstChild);
    const signInBtn = `<button type="button" class="dropdown-btn signin"><a href="./dangnhap.html">ĐĂNG NHẬP</a></button>`;
    const signUpBtn = `<button type="button" class="dropdown-btn signup"><a href="./dangky.html">ĐĂNG KÝ</a></button>`;
    Array.from(btnWrapper.children).forEach((child) => {
        btnWrapper.removeChild(child);
    });
    btnWrapper.insertAdjacentHTML("afterbegin", `${signInBtn}${signUpBtn}`);
}

//
