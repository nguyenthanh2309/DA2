import { loadAccounts } from "./accountManage.js";
import { loadCategories } from "./categoryManage.js";
import { addProduct, loadProducts, removeProduct } from "./productManage.js";
import { loadSuppliers } from "./supplierManage.js";

const btnSwitchThemeDark = document.querySelector(
    ".btn-theme-switch-container > button#dark"
);
const btnSwitchThemeLight = document.querySelector(
    ".btn-theme-switch-container > button#light"
);
const tableLeftTools = document.querySelector(".table-tools .left-tools");
const tableBody = document.querySelector("table tbody");

//#region handle checkbox events
const handleCheckBox = (page) => {
    const checkboxes = document.querySelectorAll(
        "table td>input[type=checkbox]"
    );
    const checkboxAll = document.querySelector(
        ".checkbox-container input#checkbox-checkall"
    );
    let checkedText = document.querySelector(".checkbox-container span");

    const createEditingButtons = () => {
        const editingButtonsHTML = `
        <div class="editing-btn-container">
            <button type="button" id="update"><a href="../../pages/admin/update.html">Chỉnh sửa hàng loạt</a></button>
            <button type="button" id="delete">Xoá hàng loạt</button>
        </div>`;
        if (tableLeftTools.childNodes.length) {
            tableLeftTools.insertAdjacentHTML("beforeend", editingButtonsHTML);
        }
    };

    const handleEditingButtons = (dataToEdit) => {
        const removeBtn = document.querySelector(
            ".editing-btn-container>button#delete"
        );
        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                if (page === "products") {
                    removeProduct(dataToEdit);
                }
                const checkedCheckboxes = document.querySelectorAll(
                    "table input[type=checkbox]:checked"
                );
                checkedText.textContent = `Đã chọn ${checkedCheckboxes.length}`;
            });
        }
    };

    const removeEditingButtons = () => {
        const editingButtons = document.querySelector(".editing-btn-container");
        editingButtons.remove();
    };

    const dataToEdit = [];
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
            const checkedCheckboxes = document.querySelectorAll(
                "table input[type=checkbox]:checked"
            );
            if (e.target.checked) {
                if (!document.querySelector(".editing-btn-container")) {
                    createEditingButtons();
                    handleEditingButtons(dataToEdit);
                }
                checkedText.textContent = `Đã chọn ${checkedCheckboxes.length}`;
                const productName = e.target
                    .closest("tr")
                    .querySelectorAll("td")[3].textContent;
                dataToEdit.push(productName);
            } else {
                checkedText.textContent = `Đã chọn ${checkedCheckboxes.length}`;
                const productName = e.target
                    .closest("tr")
                    .querySelectorAll("td")[3].textContent;
                dataToEdit.splice(
                    dataToEdit.findIndex((product) => {
                        product === productName;
                    }),
                    1
                );
                if (!dataToEdit.length) {
                    removeEditingButtons();
                }
            }
        });
    });

    checkboxAll.addEventListener("change", () => {
        if (checkboxAll.checked) {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });
            let isCheked = document.querySelectorAll(
                "table td>input[type=checkbox]:checked"
            ).length;
            checkedText.textContent = `Đã chọn ${isCheked}`;
            createEditingButtons();
        } else {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });
            let isCheked = document.querySelectorAll(
                "table td>input[type=checkbox]:checked"
            ).length;
            checkedText.textContent = `Đã chọn ${isCheked}`;
            removeEditingButtons();
        }
    });
};

//#endregion

//#region handle product page

const addProductBtn = document.querySelector(
    "#products-table-tools .tools-btn-add"
);
const searchProductInput = document.querySelector(
    "#products-table-tools #search-form input"
);
const listProductsSection = document.querySelector(".list-products-section");

const openAddProductDialog = () => {
    const categories = JSON.parse(localStorage.getItem("categories"));
    const suppliers = JSON.parse(localStorage.getItem("suppliers"));

    const cover = `<div class="cover"></div>`;
    document.body.insertAdjacentHTML("afterbegin", cover);

    const categoriesSelect = document.createElement("select");
    categoriesSelect.id = "category";
    categories.forEach((category) => {
        categoriesSelect.innerHTML += `<option>${category.name}</option>`;
    });

    const suppliersSelect = document.createElement("select");
    suppliersSelect.id = "supplier";
    suppliers.forEach((supplier) => {
        suppliersSelect.innerHTML += `<option>${supplier.name}</option>`;
    });

    const dialog = `
    <dialog open class="add-product-dialog">
        <div class="dialog-header">
            <h6>Thêm sản phẩm</h6>
            <button type="button" class="close-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form>
            <div class="dialog-input-wrapper">
                <span>Ảnh</span>
                <div class="image-input">
                    <div class="image-thumbnail">
                        <img src="https://i.ytimg.com/vi/KgqV0i_ZgLs/maxresdefault.jpg" class="image-preview">
                        <span class="image-name"></span>
                    </div>
                    <input type="file" id="image" accept=".png, .jpeg, .jpg">
                    <label for="image"><i class="fa-solid fa-plus"></i>Thêm ảnh</label>
                </div>
            </div>
            <div class="dialog-input-wrapper">
                <label for="name">Tên sản phẩm</label>
                <input type="text" id="name">
            </div>
            <div class="wrapper">
                <div class="dialog-select-wrapper">
                    <label for="category">Danh mục</label>
                    ${categoriesSelect.outerHTML}
                </div>
                <div class="dialog-select-wrapper">
                    <label for="category">Nhà cung cấp</label>
                    ${suppliersSelect.outerHTML}
                </div>
            </div>
            <div class="wrapper">
                <div class="dialog-input-wrapper">
                    <label for="totalAmount">Số lượng</label>
                    <input type="number" id="totalAmount">
                </div>
                <div class="dialog-input-wrapper">
                    <label for="price">Giá</label>
                    <input type="text" id="price">
                </div>      
            </div>
            <button type="button" class="btn-submit">Thêm sản phẩm</button>
        </form>
    </dialog>`;
    listProductsSection.insertAdjacentHTML("afterbegin", dialog);
};

const closeDialog = () => {
    const dialog = document.querySelector("dialog");
    const cover = document.querySelector(".cover");
    dialog.close();
    cover.remove();
};

const handleAddProductDialog = () => {
    openAddProductDialog();
    const imagePreview = document.querySelector("dialog .image-preview");
    const imageName = document.querySelector("dialog .image-name");
    const imageInput = document.querySelector("dialog input[type=file]");
    const productName = document.querySelector("dialog input#name");
    const category = document.querySelector("dialog select#category");
    const supplier = document.querySelector("dialog select#supplier");
    const totalAmount = document.querySelector("dialog input#totalAmount");
    const price = document.querySelector("dialog input#price");
    const btnSubmit = document.querySelector("dialog .btn-submit");
    const fr = new FileReader();

    const product = {};

    imageInput.addEventListener("change", (e) => {
        const image = e.target.files[0];
        imagePreview.src = URL.createObjectURL(image);
        imageName.textContent = image.name;

        fr.addEventListener("load", () => (product.image = fr.result));

        if (image) {
            fr.readAsDataURL(image);
        }
    });

    productName.addEventListener("input", (e) => {
        product.name = e.target.value;
    });

    category.addEventListener("change", (e) => {
        const options = e.target.options;
        const selectedIndex = e.target.options.selectedIndex;
        product.category = options[selectedIndex].textContent;
    });

    supplier.addEventListener("change", (e) => {
        const options = e.target.options;
        const selectedIndex = e.target.options.selectedIndex;
        product.supplier = options[selectedIndex].textContent;
    });

    totalAmount.addEventListener("change", (e) => {
        product.totalAmount = parseInt(e.target.value);
    });

    price.addEventListener("input", (e) => {
        product.price = parseInt(e.target.value);
    });

    btnSubmit.addEventListener("click", () => {
        addProduct(product);
        handleCheckBox("products");
    });

    const closeDialogBtn = document.querySelector("dialog .close-btn");
    if (closeDialogBtn) {
        closeDialogBtn.addEventListener("click", closeDialog);
    }
};

if (addProductBtn) {
    addProductBtn.addEventListener("click", () => {
        handleAddProductDialog();
    });
}

if (searchProductInput) {
    searchProductInput.addEventListener("input", (e) => {
        loadProducts({ search: e.target.value });
    });
}

loadProducts();
handleCheckBox("products");
//#endregion

//#region handle customer manage page
const addCategoryBtn = document.querySelector(
    "#categories-table-tools .tools-btn-add"
);

const listCategoriesSection = document.querySelector(
    ".list-categories-section"
);
loadCategories();
//#endregion

//#region handle supplier manage page
const addSupplierBtn = document.querySelector(
    "#suppliers-table-tools .tools-btn-add"
);

const listSuppliersSection = document.querySelector(".list-suppliers-section");
loadSuppliers();
//#endregion

//#region handle account manage page
const addAccountBtn = document.querySelector(
    "#accounts-table-tools .tools-btn-add"
);

const listAccountsSection = document.querySelector(".list-accounts-section");
loadAccounts();
//#endregion

//#region handle switch theme
const setTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        btnSwitchThemeLight.removeAttribute("data-active");
        btnSwitchThemeDark.setAttribute("data-active", "true");
        document.body.setAttribute("data-theme", "dark");
    } else {
        btnSwitchThemeDark.removeAttribute("data-active");
        btnSwitchThemeLight.setAttribute("data-active", "true");
        document.body.setAttribute("data-theme", "light");
    }
};

btnSwitchThemeDark.addEventListener("click", () => {
    localStorage.setItem("theme", "dark");
    setTheme();
});

btnSwitchThemeLight.addEventListener("click", () => {
    localStorage.setItem("theme", "light");
    setTheme();
});

setTheme();

//#endregion

//#region handle button filter event

const filterBtn = document.querySelector(".tools-btn-filter>button");
const filterDropdown = document.querySelector(
    ".tools-btn-filter>.filter-dropdown"
);
const filterOptions = document.querySelectorAll(
    ".tools-btn-filter>.filter-dropdown input[type=radio]"
);

if (filterBtn) {
    filterBtn.addEventListener("click", () => {
        filterDropdown.classList.toggle("active");
    });
}

filterOptions.forEach((option) => {
    option.addEventListener("change", (e) => {
        if (e.target.checked) {
            if (option.id === "ascended-alphabet") {
                loadProducts({ ascendedAlphabet: true });
            } else if (option.id === "descended-alphabet") {
                loadProducts({ descendedAlphabet: true });
            } else if (option.id === "ascended-price") {
                loadProducts({ ascendedPrice: true });
            } else if (option.id === "descended-price") {
                loadProducts({ descendedPrice: true });
            }
        }
    });
});

//#endregion