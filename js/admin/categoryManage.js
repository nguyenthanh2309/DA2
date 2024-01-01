import createToast from "../toast.js";

const tableBody = document.querySelector("#categories-table tbody");

const loadCategories = () => {
    try {
        const categories = JSON.parse(localStorage.getItem("categories"));
        const wrapper = document.createElement("tbody");

        categories.forEach((category, index) => {
            const row = `<tr>
            <td><input type="checkbox"></td>
            <td>${index + 1}</td>
            <td>${category.name}</td>
        </tr>`;
            wrapper.innerHTML += row;
        });

        tableBody.innerHTML = wrapper.innerHTML;
    } catch (error) {}
};

const addCategory = (categoryToAdd) => {
    try {
        const categories = JSON.parse(localStorage.getItem("categories"));

        let isExisted = false;
        categories.forEach((category) => {
            if (category.name === categoryToAdd.name) {
                isExisted = true;
            }
        });

        if (!isExisted) {
            categories.push(categoryToAdd);
            createToast(1, "Danh mục đã được thêm thành công!");

            localStorage.setItem("categories", JSON.stringify(categories));

            loadCategories();
        } else {
            createToast(0, "Danh mục này đã tồn tại!");
        }
    } catch (error) {}
};

export { loadCategories, addCategory };
