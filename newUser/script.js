/* Script xử lý chuyển đổi giữa login form và register form*/

//DOMContentLoaded: kích hoạt khi tài liệu HTML ban đầu đã được tải và 
//  phân tích cú pháp hoàn toàn mà không cần đợi những file như stylesheets cho đến khi hoàn tất tải file đó

document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.querySelector("#loginForm");
    let registerForm = document.querySelector("#registerForm");
    let loginLink = document.querySelector("#loginLink");
    let registerLink = document.querySelector("#registerLink");

    // ở form đăng ký ấn vào sign in
    // sử dụng preventDefault để hủy mặc định của thể form 
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



/*=====================Xác thực người dùng=================================*/
function login(event) {
    event.preventDefault()
    let userName = event.target.userName.value;
    let userPassword = event.target.userPassword.value;  //đã vào
    //Lấy dữ liệu từ localStorage (máy khách)
    let userList = JSON.parse(localStorage.getItem("userList"));

    let temp = null;
    for (let i in userList) {
        if (userList[i].userName == userName) {
            temp = userList[i]
            break;
        }

    }

    //userName check
    if (!temp) {
        alert("Người dùng không tồn tại")
        return
    }

    //userPassword check
    if (temp.userPassword != userPassword) {
        alert("Mật khẩu chưa chính xác")
        return
    }

    alert(`Xin chào ${temp.userName}`)

    localStorage.setItem("userLogin", JSON.stringify(temp))
    window.location.href = "/"
}




/* =====================Đăng ký mới====================== */
function register(event) {
    event.preventDefault();
    let newUserName = event.target.newUserName.value;
    let newUserPassowrd = event.target.newUserPassword.value;
    let newUserRePassword = event.target.newUserRePassword.value
    userList = JSON.parse(localStorage.getItem("userList"));
    let newUser = {
        id: Date.now(),
        userName: newUserName,
        userPassword: newUserPassowrd,
        userStatus: true
    }
    let check = ""
    if (newUserName && newUserPassowrd && newUserRePassword) {
        if (newUserPassowrd === newUserRePassword) {
            if (newUserName.length < 2) {
                alert(`Tên đăng nhập phải có ít nhất 2 ký tự`)
                return false
            } else if (newUserPassowrd.length < 5) {
                alert(`Mật khẩu phải có ít nhất 6 ký tự`)
                return false
            } else {

                for (let i = 0; i < userList.length; i++) {
                    if (userList[i].userName == newUserName) {
                        alert(`Tên đăng nhập ${newUserName} đã tồn tại`)
                        return false
                    }

                }

                userList.push(newUser)
                localStorage.setItem("userList", JSON.stringify(userList))
                window.location.href = "/"
                alert(`Đăng ký thành công`)
                return true

            }
        } else {
            alert("Mật khẩu không trùng khớp")
            return false
        }
    } else {
        alert("Vui lòng nhập đầy đủ thông tin")
        return false
    }
}



