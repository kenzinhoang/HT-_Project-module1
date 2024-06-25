
/*==========================Login user==========================*/

let user = JSON.parse(localStorage.getItem("userLogin"))
document.querySelector(".userNameLogin").innerText = user.userName;

/*=================================================================*/


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
                    <td>${list[i].status}
                        <button>Edit</button>
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


//Thêm user  ------------------> bug
function registerHomeSite(event) {
    event.preventDefault();
    let newUserName = event.target.newUserName.value;
    let newUserPassowrd = event.target.newUserPassword.value;
    //ok
    userList = JSON.parse(localStorage.getItem("userList"));
    let newUser = new Object
    let temp = true

    /*bug*/
    for (let i in userList) {
        if (userList[i].userName == newUserName) {
            alert(`Tên đăng nhập ${newUserName} đã tồn tại`)
            console.log("trung", newUserName)
            return
        }
        if (userList[i].userName != (newUserName)) { //
            console.log("add", newUserName)
            validateUserName(newUserName)
            newUser.id = Date.now()
            newUser.userName = newUserName;
            break
        }
    }
    /*bug*/
    validateUserPassword(newUserPassowrd)
    newUser.userPassword = newUserPassowrd
    newUser.userStatus = true
    console.log("newUser", newUser)//đã vào
    if (newUser != {}) {
        userList.push(newUser)
        console.log(userList);
        localStorage.setItem("userList", JSON.stringify(userList))
    }
    userManage(userList)
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
