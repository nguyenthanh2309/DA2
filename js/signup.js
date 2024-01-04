const emailInput = document.querySelector("#sign-up-form input#email");
const passwordInput = document.querySelector("#sign-up-form input#password");
const reinputPasswordInput = document.querySelector(
    "#sign-up-form input#reinput-password"
);
const submitBtn = document.querySelector("#sign-up-form .submit-btn");

const emailRegExp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
const passwordRegExp = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

let email = "";
let password = "";

const showInputError = (inputElem, message) => {
    const errorText = `<span class="error">${message}</span>`;
    inputElem.style.setProperty("border-color", "#ea0000", "important");

    if (!inputElem.nextElementSibling) {
        inputElem.insertAdjacentHTML("afterend", errorText);
    }
};

const removeInputError = (inputElem) => {
    inputElem.style.borderColor = "transparent";
    if (inputElem.nextElementSibling) {
        inputElem.parentElement.removeChild(inputElem.nextElementSibling);
    }
};

const checkEmail = (email) => {
    if (!email.match(emailRegExp)) {
        showInputError(emailInput, "Địa chỉ email không hợp lệ");
        return false;
    } else {
        removeInputError(emailInput);
        return true;
    }
};

const checkPassword = (password) => {
    if (!password.match(passwordRegExp)) {
        showInputError(
            passwordInput,
            "Mật khẩu không hợp lệ. Yêu cầu ít nhất 6 kí tự, ít nhất 1 kí tự viết hoa, ít nhất 1 kí tự đặc biệt"
        );
        return false;
    } else {
        removeInputError(passwordInput);
        return true;
    }
};

const checkReinputPassword = (password, reinputPassword) => {
    if (password !== reinputPassword) {
        showInputError(reinputPasswordInput, "Mật khẩu nhập lại không khớp");
    } else {
        removeInputError(reinputPasswordInput);
    }
};

if (emailInput) {
    emailInput.addEventListener("input", (e) => {
        if (checkEmail(e.target.value)) {
            email = e.target.value;
        }
    });
}

if (passwordInput) {
    passwordInput.addEventListener("input", (e) => {
        if (checkPassword(e.target.value)) {
            password = e.target.value;
        }
    });
}

if (reinputPasswordInput) {
    reinputPasswordInput.addEventListener("input", (e) => {
        checkReinputPassword(password, e.target.value);
    });
}

const handleSignUp = () => {
    const errors = document.querySelectorAll(".field-container span.error");
    if (errors.length === 0 && email !== "" && password !== "") {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        accounts.push({
            avatar: "../public/assets/default-avatar.webp",
            email: email,
            password: btoa(password),
            role: "user",
        });
        localStorage.setItem("accounts", JSON.stringify(accounts));
        window.location.replace("http://127.0.0.1:5500/pages/dangnhap.html");
    }
};

if (submitBtn) {
    submitBtn.addEventListener("click", handleSignUp);
}