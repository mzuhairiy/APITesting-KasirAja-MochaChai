const request = require("supertest");
const config = require("../../../data/config.json");
const unitId = "1f35b35d-4138-440e-b11e-8244de9e4435" 

async function getUnit(){
    const response = await request(config.baseUrlKA)
    .post("/units/"+unitId)
    .send()
}