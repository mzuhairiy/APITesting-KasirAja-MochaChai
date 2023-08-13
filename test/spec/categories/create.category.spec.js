const request = require("supertest");
const config = require("../../../data/config.json");

async function createCat(payload,token){
    const response = await request(config.baseUrlKA)
    .post('/categories')
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { createCat }