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
        alert("User not found")
        return
    }

    //userPassword check
    if (temp.userPassword != userPassword) {
        alert("Incorrect password")
        return
    }

    alert(`Welcome back ${temp.userName}`)

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
        if (userList[i].userName != newUserName) {
            console.log("newUserName", newUserName)
            validateUserName(newUserName)
            newUser.id = Date.now()
            newUser.userName = newUserName;
            break
        } else if (userList[i].userName == newUserName) {//tên bị trùng
            alert(`${newUserName} already exists`)
            return
        }
    }
    validateUserPassword(newUserPassowrd)
    newUser.userPassword = newUserPassowrd
    console.log("newUser", newUser)
    if (newUser != {}) {
        userList.push(newUser)
        localStorage.setItem("userList", JSON.stringify(userList))
        window.location.href = "/HomePage"
    }

}

//kiểm tra điều kiện của newUserName
function validateUserName(name) {
    //tên ít hơn 2 chữ cái
    if (name.length < 2) {
        alert(`Username must be at least 2 characters`)
        return
    }
}

//kiểm tra điều kiện của newUserPassword
function validateUserPassword(psw) {
    if (psw.length <= 5) {
        alert(`Password must be 6 characters`)
        return
    }

}

