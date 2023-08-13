const request = require("supertest");
const config = require("../../../data/config.json");
const fs = require("fs");
const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/product.data.json' //menggunakan absolut path

async function updateProduct(payload, token){
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) //mengambil file JSON dari folder data
    const productId = jsonData.data.productId //mengambil value productId dari file JSON
    const response = await request(config.baseUrlKA)
    .put(`/products/` + `${productId}`)
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { updateProduct }