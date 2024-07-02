
/*==========================Login user==========================*/

let user = JSON.parse(localStorage.getItem("userLogin"))
document.querySelector(".userNameLogin").innerText = user.userName;

/*=================================================================*/



let userList = JSON.parse(localStorage.getItem("userList"))


/*========================Catalog manage========================*/
// let categoryList = [
//     {
//         id: 1,
//         name: "Điện thoại",
//         quantity: 3,
//         value: 1000,
//     }, {
//         id: 2,
//         name: "Máy tính bảng",
//         quantity: 5,
//         value: 2000,
//     }, {
//         id: 3,
//         name: "Laptop",
//         quantity: 2,
//         value: 5000,
//     }, {
//         id: 4,
//         name: "Máy ảnh",
//         quantity: 6,
//         value: 3000,
//     }, {
//         id: 5,
//         name: "Phụ kiện",
//         quantity: 10,
//         value: 50,
//     }
// ]
// localStorage.setItem("categoryList", JSON.stringify(categoryList));
//let categoryList = JSON.parse(localStorage.getItem("categoryList"));


//-----------------------------Category Render ---------------------------
function renderData(target) {

    let category = `
                    <li>
                     <input type="radio" id="all" name="category" checked>
                     <label for="all" >Tất cả</label>
                    </li>
                    `
    for (let i in target) {
        category += `
                    <li>
                    <input type="radio" id="${target[i].id}" name="category">
                     <label for="${target[i].id}" onclick="renderCategory(${target[i].id}) ">${target[i].name}</label>
                    </li >

            `
    }
    document.querySelector(".line").innerHTML = category
}
renderData(JSON.parse(localStorage.getItem("categoryList")))

//----------------------------Category Data Render-----------------------
function renderCategory(target) {
    //console.log(target);
    // let allCatalogy = document.querySelector("#all").value
    // if (allCatalogy == 0) { console.log("hi"); }
    let categoryList = JSON.parse(localStorage.getItem("categoryList"));
    let categoryData = ""
    for (let i in categoryList) {
        if (target == categoryList[i].id)

            categoryData += `
                    <tr>
                        <th>${categoryList[i].id}</th>
                        <th>${categoryList[i].quantity}</th>
                        <th>${categoryList[i].value}</th>
                        <th>${categoryList[i].name}</th>
                        
                        <th>
                            <button>Sửa</button>
                            <button>Xoá</button>
                        </th>
                    </tr>

            `
        checkedTarget = categoryList[i]

    }
    //onchange -> getElement ->id can in 
    document.querySelector(".table tbody").innerHTML = categoryData
}



