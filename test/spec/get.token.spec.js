const request = require("supertest");
const userData = require('../../data/user.data.json');
const config = require('../../data/config.json')

async function getToken(){
    const response = await request(config.baseUrlKA)
    .post("/authentications")
    .send(userData)
    const token = await response.body.data.accessToken
    return token
}

module.exports = { getToken }