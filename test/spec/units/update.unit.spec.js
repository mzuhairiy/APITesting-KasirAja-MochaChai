const request = require("supertest");
const config = require("../../../data/config.json");
const fs = require("fs");
const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/unit.data.json' //menggunakan absolut path

async function updateUnit(payload, token){
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) //mengambil file JSON dari folder data
    const unitId = jsonData.data.unitId //mengambil value unitId dari file JSON
    const response = await request(config.baseUrlKA)
    .put(`/units/` + `${unitId}`)
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { updateUnit }