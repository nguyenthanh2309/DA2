const emailInput = document.querySelector("#sign-in-form input[type=text]");
const passwordInput = document.querySelector(
    "#sign-in-form input[type=password]"
);
const signInBtn = document.querySelector("#sign-in-form .submit-btn");
const formTitle = document.querySelector("#sign-in-form>.form-title");
const accounts = JSON.parse(localStorage.getItem("accounts"));

const errorText = `<span class="sign-in-err">Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại</span>`;

let email = "";
let password = "";

if (emailInput) {
    emailInput.addEventListener("input", (e) => {
        email = e.target.value;
    });
}

if (passwordInput) {
    passwordInput.addEventListener("input", (e) => {
        password = e.target.value;
    });
}

if (signInBtn) {
    signInBtn.addEventListener("click", () => {
        const [loggedAccount] = accounts.filter((account) => {
            if (account.email === email && account.password === password) {
                return true;
            }
            return false;
        });

        if (!loggedAccount) {
            if (!formTitle.nextElementSibling) {
                formTitle.insertAdjacentHTML("afterend", errorText);
            }
        } else {
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    isLoggedIn: true,
                    email: loggedAccount.email,
                })
            );
            if (loggedAccount.role === "admin") {
                window.location.replace(
                    "http://127.0.0.1:5500/pages/admin/quan-ly-san-pham.html"
                );
            } else {
                window.location.replace(
                    "http://127.0.0.1:5500/pages/index.html"
                );
            }
        }
    });
}
