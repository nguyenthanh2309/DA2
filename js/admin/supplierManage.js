import createToast from "../toast.js";

const tableBody = document.querySelector("#suppliers-table tbody");

const loadSuppliers = () => {
    try {
        const suppliers = JSON.parse(localStorage.getItem("suppliers"));
        const wrapper = document.createElement("tbody");

        suppliers.forEach((supplier, index) => {
            const row = `<tr>
                <td><input type="checkbox"></td>
                <td>${index + 1}</td>
                <td>${supplier.name}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.address}</td>
                <td>${supplier.email}</td>
            </tr>`;
            wrapper.innerHTML += row;
        });

        tableBody.innerHTML = wrapper.innerHTML;
    } catch (error) {}
};

const addSupplier = (supplierToAdd) => {
    try {
        const suppliers = JSON.parse(localStorage.getItem("suppliers"));

        let isExisted = false;
        suppliers.forEach((supplier) => {
            if (supplier.name === supplierToAdd.name) {
                isExisted = true;
            }
        });

        if (!isExisted) {
            suppliers.push(supplierToAdd);
            createToast(1, "Nhà cung cấp đã được thêm thành công!");

            localStorage.setItem("suppliers", JSON.stringify(suppliers));

            loadSuppliers();
        } else {
            createToast(0, "Nhà cung cấp này đã tồn tại!");
        }
    } catch (error) {}
};

export { loadSuppliers, addSupplier };
