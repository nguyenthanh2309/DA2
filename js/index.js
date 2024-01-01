import "./login.js";
import "./signup.js";
import addToCart from "./cart.js";
import logout from "./logout.js";

const toolUserBtn = document.querySelector(
    ".right-content-tools .tools-user-btn"
);
const toolsUserDropdown = document.querySelector(
    ".tools-user-container>.tools-user-dropdown"
);
const userInfo = document.querySelector(".dropdown-user-info");
const btnWrapper = document.querySelector(".dropdown-btn-wrapper");
const btnAddToCarts = document.querySelectorAll(".btn-add-to-cart");
const homeBtn = document.querySelector(".btn-home");
const submitBtn = document.querySelector(".btn-submit-cart");
const deleteCartBtn = document.querySelector(".btn-delete-cart");
const cart = document.querySelector(".tools-cart");
const cartDropdownMenu = document.querySelector(
    ".tools-cart>.cart-dropdown-menu"
);
const previewImage = document.querySelector(".form .preview-image>img");
const imageInput = document.querySelector(".form input[type=file]");

//#region handle dropdown menu
if (toolUserBtn) {
    toolUserBtn.addEventListener("click", () => {
        toolsUserDropdown.classList.toggle("active");
    });
}

//#endregion

//#region handle user dropdown menu if logged in or not

const loadUserDropdown = () => {
    try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth.isLoggedIn) {
            const userInfoLink = `<a href="./thongtintaikhoan.html" class="dropdown-link">Thông tin tài khoản</a>`;
            userInfo.insertAdjacentHTML("afterbegin", userInfoLink);

            const email = `<div class="dropdown-user-email"><span>${auth.email}</span></div>`;
            userInfo.insertAdjacentHTML("afterbegin", email);

            const btnLogOut = `<button type="button" class="dropdown-btn logout">ĐĂNG XUẤT</button>`;
            Array.from(btnWrapper.children).forEach((child) => {
                child.remove();
            });

            btnWrapper.insertAdjacentHTML("afterbegin", btnLogOut);
        }
    } catch {
        toolsUserDropdown.removeChild(toolsUserDropdown.firstChild);
        userInfo.removeChild(userInfo.firstChild);
        const signInBtn = `<button type="button" class="dropdown-btn signin"><a href="./dangnhap.html">ĐĂNG NHẬP</a></button>`;
        const signUpBtn = `<button type="button" class="dropdown-btn signup"><a href="./dangky.html">ĐĂNG KÝ</a></button>`;
        Array.from(btnWrapper.children).forEach((child) => {
            child.remove();
        });
        console.log(btnWrapper);
        btnWrapper.insertAdjacentHTML("afterbegin", `${signInBtn}${signUpBtn}`);
    }
};

//#endregion

//#region handle button add to cart

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

        addToCart(cartProduct);
    });
});

//#endregion

//#region handle cart events
if (cart) {
    cart.addEventListener("click", () => {
        if (!cartDropdownMenu.classList.contains("cart-dropdown-opened")) {
            cartDropdownMenu.classList.add("cart-dropdown-opened");
        } else {
            cartDropdownMenu.classList.remove("cart-dropdown-opened");
        }
    });
}

//#endregion

//#region handle cart page events

if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        window.location.replace("http://127.0.0.1:5500/pages/index.html");
    });
}

if (submitBtn) {
    submitBtn.addEventListener("click", () => {
        window.location.replace("http://127.0.0.1:5500/pages/hoadon.html");
    });
}

if (deleteCartBtn) {
    deleteCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        window.location.reload();
    });
}

//#endregion

//#region handle logout button
loadUserDropdown();
const btnLogOut = document.querySelector(".dropdown-btn.logout");

if (btnLogOut) {
    btnLogOut.addEventListener("click", () => {
        logout();
        loadUserDropdown();
    });
}

//#endregion

//#region handle add to cart button in product detail page

const addToCartButton = document.querySelector(
    ".product-details .add-to-cart-btn"
);

let amount = 0;

const productAmountInput = document.querySelector(".product-details #amount");
if (productAmountInput) {
    productAmountInput.addEventListener("change", (e) => {
        amount = parseInt(e.target.value);
    });
}

if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
        const image = document.querySelector(".product-image>img").src;
        const productName = document.querySelector(
            ".product-details .product-title"
        ).textContent;
        const price = parseInt(
            document
                .querySelector(
                    ".product-details .product-price>span:nth-child(2)"
                )
                .textContent.split(",")
                .join("")
        );
        const productAmount = amount;
        const totalPrice = amount * price;

        const product = {
            image: image,
            productName: productName,
            price: price,
            amount: productAmount,
            totalPrice: totalPrice,
        };

        addToCart(product);
    });
}

//#endregion

//#region handle add avatar
if (imageInput) {
    imageInput.addEventListener("change", (e) => {
        previewImage.src = URL.createObjectURL(e.target.files[0]);
    });
}

//#endregion
