const request = require("supertest");
const config = require("../../../data/config.json");
const unitData = require("../../../data/unit.data.json");

async function getUnitId(){
    const response = await request(config.baseUrlKA) 
    .post('/units')
    .send(unitData)
    .set("Authorization", `Bearer ${token}`)
    const unitId = await response.body.data.unitId
    return unitId
}

module.exports = { getUnitId } 