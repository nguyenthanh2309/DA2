import gateWayURL from '../global.js';

const productsTableBody = document.querySelector("#products-table > tbody")

const getAllSanPham = async() => {
    const response = await fetch(`${gateWayURL}/admin/sanpham/getall`)
    const products = response.json();
    return products
}

const renderAllSanPham = () => {
    getAllSanPham().then(products => {
        let productsLength = products.length;
        for (let i = 0; i < productsLength; i++) {
            const tableRow = document.createElement("tr");
            const tableCellOrderNumber = document.createElement("td");
            tableCellOrderNumber.innerText = `${i + 1}`
            const product = products[i];
            for (let key in product) {
                const tableCell = document.createElement("td");
                tableCell.innerText = product[key];
                tableCell.append(tableCellOrderNumber)
                tableRow.append(tableCell)
            }
            tableRow.prepend(tableCellOrderNumber)
            productsTableBody.append(tableRow)
        }
    }).catch((err) => console.log(err))
}

renderAllSanPham();