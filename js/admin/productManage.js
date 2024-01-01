import createToast from "../toast.js";

const tableBody = document.querySelector("#products-table tbody");

const loadProducts = () => {
    try {
        const products = JSON.parse(localStorage.getItem("products"));
        const wrapper = document.createElement("tbody");

        products.forEach((product, index) => {
            const row = `<tr>
                <td><input type="checkbox"></td>
                <td>${index + 1}</td>
                <td><img src="${product.image}"></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.supplier}</td>
                <td>${product.totalAmount}</td>
                <td>${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(parseInt(product.price))}</td>
            </tr>`;
            wrapper.innerHTML += row;
        });

        tableBody.innerHTML = wrapper.innerHTML;
    } catch (error) {}
};

const addProduct = (productToAdd) => {
    try {
        const products = JSON.parse(localStorage.getItem("products"));

        let isExisted = false;
        products.forEach((product) => {
            if (product.name === productToAdd.name) {
                isExisted = true;
            }
        });

        if (!isExisted) {
            products.push(productToAdd);
            createToast(1, "Sản phẩm đã được thêm thành công!");

            localStorage.setItem("products", JSON.stringify(products));

            loadProducts();
        } else {
            createToast(0, "Sản phẩm này đã tồn tại!");
        }
    } catch (error) {}
};

const removeProduct = (productsToRemove) => {
    console.log(productsToRemove);
    const products = JSON.parse(localStorage.getItem("products"));
    const newProducts = products.filter(
        (product) =>
            !productsToRemove.find(
                (productToRemove) => productToRemove === product.name
            )
    );
    localStorage.setItem("products", JSON.stringify(newProducts));
    productsToRemove.length = 0;
    loadProducts();
};

export { loadProducts, addProduct, removeProduct };
