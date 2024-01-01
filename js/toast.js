const createToast = (state, message) => {
    try {
        switch (state) {
            case 0:
                document.body.insertAdjacentHTML(
                    "afterbegin",
                    `<div class="toast" data-state="failure">
                        <div class="toast-state-icon">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div class="toast-info">
                            <div class="toast-state">Thất bại!</div>
                            <div class="toast-message">${message}</div>
                        </div>
                    </div>`
                );
                break;
            case 1:
                document.body.insertAdjacentHTML(
                    "afterbegin",
                    `<div class="toast" data-state="success">
                        <div class="toast-state-icon">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <div class="toast-info">
                            <div class="toast-state">Thành công!</div>
                            <div class="toast-message">${message}</div>
                        </div>
                    </div>`
                );
                break;
            case 2:
                document.body.insertAdjacentHTML(
                    "afterbegin",
                    `<div class="toast" data-state="warning">
                        <div class="toast-state-icon">
                            <i class="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <div class="toast-info">
                            <div class="toast-state">Cảnh báo!</div>
                            <div class="toast-message">${message}</div>
                        </div>
                    </div>`
                );
                break;
        }
        const toast = document.body.querySelector(".toast");
        if (toast.nextElementSibling.classList.contains("toast")) {
            toast.nextElementSibling.remove();
        }
        setTimeout(() => {
            toast.remove();
        }, 3000);
    } catch (error) {
        console.log(error);
    }
};

export default createToast;
