import createToast from "../toast.js";

const tableBody = document.querySelector("#accounts-table tbody");

const loadAccounts = () => {
    try {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        const wrapper = document.createElement("tbody");

        accounts.forEach((account, index) => {
            const row = `<tr>
                <td><input type="checkbox"></td>
                <td>${index + 1}</td>
                <td>${account.email}</td>
                <td>${account.password}</td>
                <td>${account.role}</td>
            </tr>`;
            wrapper.innerHTML += row;
        });

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
