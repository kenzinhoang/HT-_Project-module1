
/*==========================Login user==========================*/

let user = JSON.parse(localStorage.getItem("userLogin"))
document.querySelector(".userNameLogin").innerText = user.userName;

/*=================================================================*/



let userList = JSON.parse(localStorage.getItem("userList"))


/*========================Catalog manage========================*/
// let productList = [
//     {
//         id: 171994296581,
//         name: "Điện thoại",
//         quality: 200,
//         value: 1000,
//         category: "",
//     },
//     {
//         id: 171994296580,
//         name: "Điện",
//         quality: 200,
//         value: 1000,
//         category: "",
//     }
// ]
// localStorage.setItem("productList", JSON.stringify(productList));
let productList = JSON.parse(localStorage.getItem("productList"));
let limit = 6
let nowPage = 0

//-----------------------------Category Render ---------------------------
// function renderData(target) {

//     let category = ``
//     for (let i in target) {
//         category += `
//                     <li>
//                     <input type="radio" id="${target[i].id}" name="category">
//                      <label for="${target[i].id}" onclick="renderCategory(${target[i].id}) ">${target[i].name}</label>
//                     </li >

//                      `
//     }
//     document.querySelector(".line").innerHTML = category
// }
// renderData(JSON.parse(localStorage.getItem("categoryList")))

//----------------------------Category Data Render-----------------------
function renderData(target) {
    let productData = ""
    for (let i in target) {
        productData += `
                            <tr>
                            <th>
                                <input type="text"  value="${target[i].id}"readonly>
                            </th>
                            <th>
                                <input type="text"  id="name${target[i].id}" value="${target[i].name}"readonly>
                            </th>
                            <th>
                                <input type="text"  id="quality${target[i].id}" value="${target[i].quality}"readonly>
                            </th>
                            <th>
                                <input type="text"  id="value${target[i].id}" value="${target[i].value}"readonly>
                            </th>
                            <th>
                                <input type="text"  value="${target[i].category}"readonly>
                            </th>
                            <th>
                                <button class="btn${target[i].id}" onclick="editData(${target[i].id}) ">Edit</button>
                                <button onclick="deleteData(${target[i].id})">Xoá</button>
                            </th>
                            </tr>

                    `
        document.querySelector(".table tbody").innerHTML = productData
    }
}
renderData(JSON.parse(localStorage.getItem("productList")))

//------------delete-----------
function deleteData(target) {
    console.log("delete", target)
    for (let i in productList) {
        if (target == productList[i].id) {
            productList.splice(i, 1)
            localStorage.setItem("productList", JSON.stringify(productList))
            break
        }
    }

    printPageList(productList)
}


//-------------Edit--------------------
let checkEdit = false
function editData(target) {

    if (checkEdit == false) {
        document.querySelector(`#name${CSS.escape(target)}`).removeAttribute("readonly")
        document.querySelector(`#quality${CSS.escape(target)}`).removeAttribute("readonly")
        document.querySelector(`#value${CSS.escape(target)}`).removeAttribute("readonly")
        document.querySelector(`.btn${CSS.escape(target)}`).textContent = "Apply"
        checkEdit = true

    } else if (checkEdit == true) {
        document.querySelector(`#name${CSS.escape(target)}`).setAttribute("readonly", "readonly") //.readonly =true
        document.querySelector(`#quality${CSS.escape(target)}`).setAttribute("readonly", "readonly")
        document.querySelector(`#value${CSS.escape(target)}`).setAttribute("readonly", "readonly")
        document.querySelector(`.btn${CSS.escape(target)}`).textContent = "Edit"
        let editedName = document.querySelector(`#name${CSS.escape(target)}`).value
        let editedQuality = document.querySelector(`#quality${CSS.escape(target)}`).value
        let editedValue = document.querySelector(`#value${CSS.escape(target)}`).value
        for (let i in productList) {
            if (productList[i].id == target) {
                productList[i].name = editedName
                productList[i].quality = editedQuality
                productList[i].value = editedValue
                localStorage.setItem("productList", JSON.stringify(productList))
                checkEdit = false
                break
            }
        }

    }


}


//-----------add new product-----------------
function addProduct(event) {
    event.preventDefault();
    let productName = document.querySelector(".productName").value.trim();
    let productQuality = document.querySelector(".productQuality").value;
    let productValue = document.querySelector(".productValue").value;
    let newProduct = {
        id: Date.now().toString(),
        name: productName,
        quality: productQuality,
        value: productValue,

    }

    productList.push(newProduct)
    renderData(productList)

    // if (productCategory < 0) {
    //     alert("Chưa có loại sản phẩm")
    //     return false
    // } else {
    //     let newProduct = {
    //         id: Date.now().toString(),
    //         name: productName,
    //         quality: productQuality,
    //         value: productValue,
    //         category: productCategory,
    //     }
    //     productList.push(newProduct)
    //     renderCategory(productList)
    // }
}

//--------------PAGINATION-----------------------


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
printPageList(productList)


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
    printPageList(productList)
    pageLoad(productList)
}


//-----------search----------------
function search() {
    let inputData = document.querySelector(".searchData").value
    let output = productList
    let searchResult = []
    for (let i in productList) {
        if (inputData == "") {
            renderData(JSON.parse(localStorage.getItem("productList")))
            printPageList(JSON.parse(localStorage.getItem("productList")))

        }
        if ((output[i].name).includes(inputData) == true) {
            searchResult.push(output[i])
            renderData(searchResult)
            printPageList(searchResult)
        }
    }
}