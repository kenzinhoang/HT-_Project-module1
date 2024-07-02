
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
            console.log("da vao1");
            //content = 
            check = true
            document.querySelector(".user-manage-tools").querySelector("form").classList.add("active")
            return
        } else {
            content = ""
            check = false
            document.querySelector(".user-manage-tools").querySelector("form").classList.remove("active")
            return
        }

    });


    // khi mở trang mặc định login form có active để hiện form login
    check = false
});


/*========================User manage========================*/
let userList = JSON.parse(localStorage.getItem("userList"))
// let mark = false
// if (document.querySelector(".searchInput").value != "") {
//     mark = true
// }


//manage user --------------> ok
function userManage(list) {

    let user = ""
    for (let i in list) {
        user += `
                <tr>
                    <th scope="row">${Number(i) + 1}</th>
                    <td>#${list[i].id}</td>
                    <td>&#129414 ${list[i].userName}</td>
                    <td>${list[i].userStatus ? "Hoạt động" : "Khoá"}
                        <button onclick="changeStatus(${list[i].id})">Khoá / Mở Khoá</button>
                        </td>
                    <td>
                        <button onclick="deleteUser(${list[i].id})">Delete</button>
                    </td>
                </tr>
        `
    }
    document.querySelector(".user-manage .table tbody").innerHTML = user
}
userManage(userList)


//delete User --------------> ok
function deleteUser(target) {

    console.log("delete", target)
    for (let i in userList) {
        if (target == userList[i].id) {
            userList.splice(i, 1)
            localStorage.setItem("userList", JSON.stringify(userList))
            break
        }
    }

    printPageList(userList)

}


//Thêm user ------->ok
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
                //out put
                userList.push(newUser)
                localStorage.setItem("userList", JSON.stringify(userList))
                printPageList(userList)
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

//change status ------> √
function changeStatus(target) {
    console.log("status", target);
    for (let i in userList) {
        if (target == userList[i].id) {
            userList[i].userStatus = !userList[i].userStatus
            localStorage.setItem("userList", JSON.stringify(userList))
            break
        }
    }
    printPageList(userList)
}

//block √

//-------------------Sort------------------------------------------
//sort user list -----> lần chọn thứ 2 mới hoạt động
function sortUser() {
    document.querySelector("#sort1").setAttribute("selected", "selected")
    document.querySelector("#sort3").setAttribute("selected", "selected")



    //---------------------------------------------------//
    let selectOp = document.querySelector(".selectName")
    let value = selectOp.options[selectOp.selectedIndex].value
    let sortUserList = userList
    if (value == 1) {
        sortUserList.sort((a, b) => a.userName.localeCompare(b.userName))
        document.querySelector(".user-manage .table tbody").innerHTML = ""
        userManage(sortUserList)


    }
    if (value == 2) {
        (sortUserList.sort((a, b) => a.userName.localeCompare(b.userName))).reverse()
        document.querySelector(".user-manage .table tbody").innerHTML = ""
        userManage(sortUserList)
    }
    printPageList(sortUserList)

}

//sort status √
function sortStatus() {
    document.querySelector("#sort1").setAttribute("selected", "selected")
    document.querySelector("#sort2").setAttribute("selected", "selected")
    let selectStatus = document.querySelector(".selectStatus")
    let value = selectStatus.options[selectStatus.selectedIndex].value
    let sortUserList = userList
    if (value == 1) {
        sortUserList.sort((a, b) => a.userStatus - b.userStatus)
        document.querySelector(".user-manage .table tbody").innerHTML = ""
        userManage(sortUserList)


    }
    if (value == 2) {
        sortUserList.sort((a, b) => b.userStatus - a.userStatus)
        document.querySelector(".user-manage .table tbody").innerHTML = ""
        userManage(sortUserList)

    }
    printPageList(sortUserList)

}

//sort id √
function sortId() {
    document.querySelector("#sort2").setAttribute("selected", "selected")
    document.querySelector("#sort3").setAttribute("selected", "selected")
    let selectId = document.querySelector(".selectId")
    let value = selectId.options[selectId.selectedIndex].value
    let sortUserList = userList
    if (value == 1) {
        sortUserList.sort((a, b) => b.id - a.id)
        document.querySelector(".user-manage .table tbody").innerHTML = ""
        userManage(sortUserList)



    }
    if (value == 2) {
        sortUserList.sort((a, b) => a.id - b.id)
        document.querySelector(".user-manage .table tbody").innerHTML = ""
        userManage(sortUserList)
    }

    printPageList(sortUserList)
}

//search ---> lỗi 1 so chuc nang
function search() {

    let users = userList
    let keyword = document.querySelector(".searchInput").value
    console.log("kw", keyword);
    let result = []
    for (let i in users) {
        if (keyword == "") {
            userManage(JSON.parse(localStorage.getItem("userList")))
            printPageList(JSON.parse(localStorage.getItem("userList")))

        }
        if ((users[i].userName).includes(keyword) == true) {
            result.push(users[i])
            userManage(result)
            printPageList(result)
        }
    }


}
//------------------------------------------------------------


//--------------PAGINATION -----------------------
let limit = 6
let nowPage = 0

function printPageList(target) {
    let pageCount = Math.ceil(target.length / limit);
    console.log(pageCount);

    let pageBtnList = ``;
    for (let i = 0; i < pageCount; i++) {
        pageBtnList += `
            <button onclick="changePage(${i})" style="background-color: ${nowPage == i ? "gold" : ""}">${i + 1}</button>
        `
    }
    document.querySelector(".listPage").innerHTML = pageBtnList;
    pageLoad(target)
}

printPageList(userList)

function pageLoad(target) {
    console.log("pageload", target);
    let beginGet = nowPage * limit
    let endGet = beginGet + limit
    let emptyArr = []
    for (let i = beginGet; i < endGet; i++) {
        if (target[i]) {
            emptyArr.push(target[i])
        } else {
            break
        }
    }
    userManage(emptyArr)
}


function changePage(page) {
    nowPage = page;
    printPageList(userList)
    pageLoad(userList)
}