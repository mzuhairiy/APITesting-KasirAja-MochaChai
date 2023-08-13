const request = require("supertest");
const config = require("../../../data/config.json");
const productData = require("../../../data/product.data.json");

async function getProductId(){
    const response = await request(config.baseUrlKA) 
    .post('/products')
    .send(productData)
    .set("Authorization", `Bearer ${token}`)
    const productId = await response.body.data.productData
    return productId
}

module.exports = { productId } 