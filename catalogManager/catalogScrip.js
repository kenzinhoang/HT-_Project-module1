
/*==========================Login user==========================*/

let user = JSON.parse(localStorage.getItem("userLogin"))
document.querySelector(".userNameLogin").innerText = user.userName;

/*=================================================================*/




/*========================Catalog manage========================*/

// let categoryList = [
//     {
//         id: 1,
//         name: "Điện thoại"
//     }, {
//         id: 2,
//         name: "Máy tính bảng"
//     }, {
//         id: 3,
//         name: "Laptop",
//     }, {
//         id: 4,
//         name: "Máy ảnh"
//     }, {
//         id: 5,
//         name: "Phụ kiện"
//     }
// ]
// localStorage.setItem("categoryList", JSON.stringify(categoryList));
let categoryList = JSON.parse(localStorage.getItem("categoryList"));


//-----------------------------Category Render ---------------------------
function renderData(target) {
    let cataData = ""
    for (let i in target) {
        cataData +=
            `
                <tr>
                    <td>
                    <input type="text" id="${target[i].id}" value="${target[i].name}"readonly>
                    </td>
                    <td>
                        <button class="btn${target[i].id}" onclick="editCatalog(${target[i].id}) ">Edit</button>
                        <button onclick="deleteCatalog(${target[i].id})">Delete</button>
                    </td>
                </tr>
            `

    }

    document.querySelector(".table tbody").innerHTML = cataData
}
//renderData(JSON.parse(localStorage.getItem("categoryList")))
renderData(categoryList)

//--------------PAGINATION -----------------------
let limit = 3
let nowPage = 0

function printPageList(target) {
    let pageCount = Math.ceil(target.length / limit);

    let pageBtnList = ``;
    for (let i = 0; i < pageCount; i++) {
        pageBtnList += `
            <button onclick="changePage(${i})" style="background-color: ${nowPage == i ? "gold" : ""}">${i + 1}</button>
        `
    }
    document.querySelector(".listPage").innerHTML = pageBtnList;
    pageLoad(target)
}

printPageList(categoryList)

function pageLoad(target) {
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
    renderData(emptyArr)
}


function changePage(page) {
    nowPage = page;
    printPageList(categoryList)
    pageLoad(categoryList)
}

//-----------------Add catalog--------------------
function addData() {
    let inputData = document.querySelector(".addCatalog").value
    let newCatalog = {
        id: Date.now(),
        name: inputData
    }

    if (inputData != "") {
        for (let i in categoryList) {
            if (inputData.trim() == categoryList[i].name && inputData.toLowerCase() == categoryList[i].name.toLowerCase()) {
                alert("Tên đã tồn tại")
                return false
            } else {
                //outPut
                categoryList.push(newCatalog)
                localStorage.setItem("categoryList", JSON.stringify(categoryList))
                printPageList(categoryList)
                document.querySelector(".addCatalog").value = ""
                return true
            }
        }
    } else {
        alert("Tên không được để trống")
        return false
    }
}

//------------Delete catalog----------------------
function deleteCatalog(target) {
    console.log("delete", target)
    for (let i in categoryList) {
        if (target == categoryList[i].id) {
            categoryList.splice(i, 1)
            localStorage.setItem("categoryList", JSON.stringify(categoryList))
            break
        }
    }

    printPageList(categoryList)
}

//------------Edit catalog----------------------
let checkEdit = false
function editCatalog(target) {

    if (checkEdit == false) {
        document.querySelector(`#${CSS.escape(target)}`).removeAttribute("readonly")
        document.querySelector(`.btn${CSS.escape(target)}`).textContent = "Apply"
        checkEdit = true

    } else if (checkEdit == true) {
        document.querySelector(`#${CSS.escape(target)}`).setAttribute("readonly", "readonly")
        document.querySelector(`.btn${CSS.escape(target)}`).textContent = "Edit"
        let edited = document.querySelector(`#${CSS.escape(target)}`).value
        for (let i in categoryList) {
            if (categoryList[i].id == target) {
                categoryList[i].name = edited
                localStorage.setItem("categoryList", JSON.stringify(categoryList))
                checkEdit = false
                break
            }
        }

    }


}

//-------------Search catalog----------------
function search() {
    let inputData = document.querySelector(".searchData").value
    let output = categoryList
    let searchResult = []
    for (let i in categoryList) {
        if (inputData == "") {
            renderData(JSON.parse(localStorage.getItem("categoryList")))
            printPageList(JSON.parse(localStorage.getItem("categoryList")))

        }
        if ((output[i].name).includes(inputData) == true) {
            searchResult.push(output[i])
            renderData(searchResult)
            printPageList(searchResult)
        }
    }
}