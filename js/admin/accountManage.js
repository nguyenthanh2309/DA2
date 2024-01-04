import createToast from "../toast.js";

const tableBody = document.querySelector("#accounts-table tbody");

const loadAccounts = (filter = {}) => {
    try {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        const wrapper = document.createElement("tbody");

        const render = (datas) => {
            datas.forEach((data, index) => {
                const row = `<tr>
                    <td><input type="checkbox"></td>
                    <td>${index + 1}</td>
                    <td>${data.email}</td>
                    <td>${data.password}</td>
                    <td>${data.role}</td>
                </tr>`;
                wrapper.innerHTML += row;
            });
        };

        if (filter.ascendedAlphabet) {
            const sortedArray = [...accounts].sort(
                (a, b) => a.productName - b.productName
            );
            render(sortedArray);
        } else if (filter.descendAlphabet) {
            const sortedArray = [...accounts].sort(
                (a, b) => b.productName - a.productName
            );
            render(sortedArray);
        } else {
            render(accounts);
        }

        tableBody.innerHTML = wrapper.innerHTML;
    } catch (error) {}
};

const addAccount = (accountToAdd) => {
    try {
        const accounts = JSON.parse(localStorage.getItem("accounts"));

        let isExisted = false;
        accounts.forEach((account) => {
            if (account.name === accountToAdd.name) {
                isExisted = true;
            }
        });

        if (!isExisted) {
            accounts.push(accountToAdd);
            createToast(1, "Tài khoản đã được thêm thành công!");

            localStorage.setItem("accounts", JSON.stringify(accounts));

            loadSuppliers();
        } else {
            createToast(0, "Tài khoản này đã tồn tại!");
        }
    } catch (error) {}
};

export { loadAccounts, addAccount };