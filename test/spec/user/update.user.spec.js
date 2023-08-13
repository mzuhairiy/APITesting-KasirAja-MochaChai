const request = require("supertest");
const config = require("../../../data/config.json");
const fs = require("fs");
const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/user.data.json' //menggunakan absolut path

async function updateUser(payload, token){
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) //mengambil file JSON dari folder data
    const userId = jsonData.data.userId //mengambil value userId dari file JSON
    const response = await request(config.baseUrlKA)
    .put(`/users/` + `${userId}`)
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { updateUser }