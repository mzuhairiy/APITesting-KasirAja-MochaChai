const request = require("supertest");
const config = require("../../../data/config.json");

async function createUnit(payload, token){
    const response = await request(config.baseUrlKA)
    .post('/units')
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { createUnit }