const request = require("supertest");
const config = require('../../../data/config.json');

async function createUser(payload,token){
    const response = await request(config.baseUrlKA)
    .post('/users')
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { createUser }