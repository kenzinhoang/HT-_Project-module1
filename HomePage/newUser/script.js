/* Script xử lý chuyển đổi giữa login form và register form*/


//DOMContentLoaded: kích hoạt khi tài liệu HTML ban đầu đã được tải và 
//  phân tích cú pháp hoàn toàn mà không cần đợi những file như stylesheets cho đến khi hoàn tất tải file đó

document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.querySelector("#loginForm");
    let registerForm = document.querySelector("#registerForm");
    let loginLink = document.querySelector("#loginLink");
    let registerLink = document.querySelector("#registerLink");

    // ở form đăng ký ấn vào sign in
    loginLink.addEventListener("click", function (event) {
        event.preventDefault();
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
    });

    // ở form đăng nhập ấn vào sign up
    registerLink.addEventListener("click", function (event) {
        event.preventDefault();
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
    });

    // khi mở trang mặc định login form có active để hiện form login
    loginForm.classList.add("active");
});