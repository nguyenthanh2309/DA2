const tableBody = document.querySelector(".cart-products-table tbody");
const homeBtn = document.querySelector(".btn-home");
const submitBtn = document.querySelector(".btn-submit-cart");
const deleteCartBtn = document.querySelector(".btn-delete-cart");
const cart = JSON.parse(localStorage.getItem("cart"));

let totalAllPrice = 0;
if (cart) {
    cart.forEach((product) => {
        const row = document.createElement("tr");
        Object.keys(product).forEach((key) => {
            const cell = document.createElement("td");
            if (key === "image") {
                const image = document.createElement("img");
                image.setAttribute("src", product[key]);
                cell.append(image);
            } else if (key === "amount") {
                const numberInput = document.createElement("input");
                numberInput.setAttribute("type", "number");
                numberInput.setAttribute("value", product[key]);
                cell.append(numberInput);
            } else if (key === "price" || key === "totalPrice") {
                cell.textContent = product[key].toLocaleString() + " vnđ";
            } else {
                totalAllPrice += product["totalPrice"];
                cell.textContent = product[key];
            }
            row.append(cell);
        });
        tableBody.append(row);
    });
    const totalAllPriceRow = `<tr class="total-price"><td colspan=5>Tổng chi phí <span>${totalAllPrice.toLocaleString()} vnđ</span></td></tr>`;
    tableBody.insertAdjacentHTML("beforeend", totalAllPriceRow);
} else {
    const emptyCart = `<tr><td colspan=5 class="cart-empty">Giỏ hàng trống</td></tr>`;
    tableBody.insertAdjacentHTML("afterend", emptyCart);
}

homeBtn.addEventListener("click", () => {
    window.location.replace("http://127.0.0.1:5500/pages/index.html");
});

submitBtn.addEventListener("click", () => {
    window.location.replace("http://127.0.0.1:5500/pages/hoadon.html");
});

deleteCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    window.location.reload();
});
