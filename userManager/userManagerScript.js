
/*==========================Login user==========================*/

let user = JSON.parse(localStorage.getItem("userLogin"))
document.querySelector(".userNameLogin").innerText = user.userName;

/*=========================Register user tool on/off================================*/


document.addEventListener("DOMContentLoaded", function () {
    let check = false
    let content = ""
    // ở form đăng ký ấn vào sign in
    // sử dụng preventDefault để hủy mặc định của thể form 
    document.querySelector(".addUserBtn").addEventListener("click", function (event) {
        event.preventDefault();
        if (check == false) {
            content = `
                <form action="" onsubmit="register(event)">
                    <div class="item">
                        <span>Tên đăng nhập</span>
                        <input name="newUserName" type="text" placeholder="Nhập tên đăng nhập" required>
                        <i>*Tên đăng nhập phải có ít nhất 2 ký tự</i>
                    </div>
                    <div class="item">
                        <span>Mật Khẩu</span>
                        <input name="newUserPassword" type="password" placeholder="Nhập mật khẩu" required>
                        <i>*Mật khẩu phải có ít nhất 6 ký tự</i>
                        <input name="newUserRePassword" type="password" placeholder="Nhập lại mật khẩu" required>
                    </div>
                    <button type="submit">Đăng ký</button>
                </form>`
            check = true
            document.querySelector(".user-manage-tools").innerHTML = content
            return
        } else {
            content = ""
            check = false
            document.querySelector(".user-manage-tools").innerHTML = content
            return
        }

    });


    // khi mở trang mặc định login form có active để hiện form login
    check = false
});


/*========================User manage========================*/
let userList = JSON.parse(localStorage.getItem("userList"))

function userManage(list) {
    //console.log("userList", list);
    let tbody = document.querySelector(".user-manage .table tbody")
    let user = ""
    for (let i in list) {
        user += `
                <tr>
                    <th scope="row">${Number(i) + 1}</th>
                    <td>#${list[i].id}</td>
                    <td>&#129414 ${list[i].userName}</td>
                    <td>${list[i].userStatus ? "Hoạt động" : "Khoá"}
                        <button onclick="changeStatus(${[i]})">Khoá / Mở Khoá</button>
                        </td>
                    <td>
                        <button onclick="deleteUser(${[i]})">Delete</button>
                    </td>
                </tr>
        `
    }
    tbody.innerHTML = user
}
userManage(userList)

//delete User --------------> ok
function deleteUser(user) {
    console.log(user)
    userList.splice(user, 1)
    localStorage.setItem("userList", JSON.stringify(userList))
    userManage(userList)
}


//Thêm user 
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
    if (newUserName && newUserPassowrd && newUserRePassword) {
        if (newUserPassowrd === newUserRePassword) {
            if (newUserName.length < 2) {
                alert(`Tên đăng nhập phải có ít nhất 2 ký tự`)
                event.target.newUserName.value = ""
                event.target.newUserPassword.value = ""
                event.target.newUserRePassword.value = ""
                return false
            } else if (newUserPassowrd.length < 5) {
                alert(`Mật khẩu phải có ít nhất 6 ký tự`)
                event.target.newUserPassword.value = ""
                event.target.newUserRePassword.value = ""
                return false
            } else {

                for (let i = 0; i < userList.length; i++) {
                    if (userList[i].userName == newUserName) {
                        alert(`Tên đăng nhập ${newUserName} đã tồn tại`)
                        event.target.newUserName.value = ""
                        event.target.newUserPassword.value = ""
                        event.target.newUserRePassword.value = ""
                        return false
                    }

                }

                userList.push(newUser)
                localStorage.setItem("userList", JSON.stringify(userList))
                userManage(userList)
                event.target.newUserName.value = ""
                event.target.newUserPassword.value = ""
                event.target.newUserRePassword.value = ""
                return true

            }
        } else {
            alert("Mật khẩu không trùng khớp")
            event.target.newUserPassword.value = ""
            event.target.newUserRePassword.value = ""
            return false
        }
    } else {
        alert("Vui lòng nhập đầy đủ thông tin")
        event.target.newUserName.value = ""
        event.target.newUserPassword.value = ""
        event.target.newUserRePassword.value = ""
        return false
    }

}

//change status ------> ok
function changeStatus(userStatus) {
    console.log(userStatus);
    userList[userStatus].userStatus = !userList[userStatus].userStatus
    localStorage.setItem("userList", JSON.stringify(userList))
    userManage(userList)
}

//block
