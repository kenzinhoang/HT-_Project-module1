
/*==========================Login user==========================*/

let user = JSON.parse(localStorage.getItem("userLogin"))
document.querySelector(".userNameLogin").innerText = user.userName;

/*=================================================================*/


/*========================User manage========================*/
let userList = JSON.parse(localStorage.getItem("userList"))

// function userManage(list) {
//     //console.log("userList", list);
//     let tbody = document.querySelector(".user-manage .table tbody")
//     let user = ""
//     for (let i in list) {
//         user += `
//                 <tr>
//                     <th scope="row">${Number(i) + 1}</th>
//                     <td>#${list[i].id}</td>
//                     <td>&#129414 ${list[i].userName}</td>
//                     <td>${list[i].userStatus}
//                         <button>Edit</button>
//                         </td>
//                     <td>
//                         <button onclick="deleteUser(${[i]})">Delete</button>
//                     </td>
//                 </tr>
//         `
//     }
//     tbody.innerHTML = user
// }
// userManage(userList)

//delete User --------------> ok
function deleteUser(user) {
    console.log(user)
    userList.splice(user, 1)
    localStorage.setItem("userList", JSON.stringify(userList))
    userManage(userList)
}


//Thêm user  ------------------> bug in MacOS


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
