const btnLogOut = document.querySelector(".dropdown-btn.logout");

if (btnLogOut) {
    btnLogOut.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
    });
}