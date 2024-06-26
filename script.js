
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
                    <td>${list[i].userStatus}
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
// function registerHomeSite(event) {
//     event.preventDefault();
//     let newUserName = event.target.newUserName.value;
//     let newUserPassowrd = event.target.newUserPassword.value;
//     //ok
//     userList = JSON.parse(localStorage.getItem("userList"));

//     let temp = false
//     /*bug ok?*/
//     for (let i in userList) {
//         if (userList[i].userName.includes(newUserName)) {
//             alert(`Tên đăng nhập ${newUserName} đã tồn tại`)
//             return
//         }
//         if (userList[i].userName != (newUserName)) { //
//             console.log("add", newUserName)
//             temp = true
//             break
//             //đã vào
//         }
//     }
//     console.log(temp);
//     /*bug ok?*/
//     // if(temp = true){
//     //     validateUserName(newUserName)
//     // }

//     // newUser.userName = newUserName;
//     // if (newUser.userName != undefined) {
//     //     newUser.id = Date.now()
//     //     validateUserPassword(newUserPassowrd)
//     //     newUser.userPassword = newUserPassowrd
//     //     newUser.userStatus = "open"
//     //     console.log("newUser", newUser)
//     //     userList.push(newUser)
//     //     console.log(userList);
//     //     localStorage.setItem("userList", JSON.stringify(userList))
//     // }
//     userManage(userList)
// }
// function addElInUser(user) {

// }


// //kiểm tra điều kiện của newUserName
// function validateUserName(name) {
//     let newUser = new Object
//     //tên ít hơn 2 chữ cái
//     if (name.length < 2) {
//         alert(`Tên đăng nhập phải có ít nhất 2 ký tự`)
//         return
//     }

// }

// //kiểm tra điều kiện của newUserPassword
// function validateUserPassword(psw) {
//     if (psw.length < 5) {
//         alert(`Mật khẩu phải có ít nhất 6 ký tự`)
//         return
//     }

// }

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
                userManage(userList)
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
