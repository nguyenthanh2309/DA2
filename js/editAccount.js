const editAccount = (oldAccount, newAccount) => {
    try {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        const auth = JSON.parse(localStorage.getItem("auth"));
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].email === oldAccount.email) {
                accounts[i].avatar = newAccount.avatar;
                accounts[i].email = newAccount.email;
                accounts[i].password = newAccount.password;
                auth.loggedAccount = accounts[i];
                break;
            }
        }
        localStorage.setItem("auth", JSON.stringify(auth));
        localStorage.setItem("accounts", JSON.stringify(accounts));
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};

export default editAccount;