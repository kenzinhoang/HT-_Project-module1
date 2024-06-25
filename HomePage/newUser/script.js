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
    window.location.href = "/HomePage"
}




/* =====================Đăng ký mới====================== */
function register(event) {
    event.preventDefault();
    let newUserName = event.target.newUserName.value;
    let newUserPassowrd = event.target.newUserPassword.value;
    //da vao
    userList = JSON.parse(localStorage.getItem("userList"));
    let newUser = new Object
    for (let i in userList) {
        if (userList[i].userName.includes(newUserName)) {
            alert(`Tên đăng nhập ${newUserName} đã tồn tại`)
            return
        }
        if (userList[i].userName != newUserName && userList[i].userName.includes(newUserName)) {
            console.log("newUserName", newUserName)
            validateUserName(newUserName)
            newUser.id = Date.now()
            newUser.userName = newUserName;
            break
        }
    }
    validateUserPassword(newUserPassowrd)
    newUser.userPassword = newUserPassowrd
    newUser.userStatus = true
    console.log("newUser", newUser)//đã vào
    if (newUser != {}) {
        userList.push(newUser)
        console.log(userList);
        localStorage.setItem("userList", JSON.stringify(userList))

    }

}

//kiểm tra điều kiện của newUserName
function validateUserName(name) {
    //tên ít hơn 2 chữ cái
    if (name.length < 2) {
        alert(`Tên đăng nhập phải có ít nhất 2 ký tự`)
        return
    }
}

//kiểm tra điều kiện của newUserPassword
function validateUserPassword(psw) {
    if (psw.length <= 5) {
        alert(`Mật khẩu phải có ít nhất 6 ký tự`)
        return
    }

}

