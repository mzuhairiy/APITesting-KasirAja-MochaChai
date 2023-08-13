const request = require("supertest");
const config = require("../../../data/config.json");

async function createProduct(payload, token){
    const response = await request(config.baseUrlKA)
    .post('/products')
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { createProduct }