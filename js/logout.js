const logout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
};

export default logout;
