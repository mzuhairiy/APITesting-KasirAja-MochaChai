const config = require("../data/config.json");
const request = require("supertest");
const fs = require("fs");
const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/unit.data.json'
const { expect } = require("chai");
const { getToken } = require("../test/spec/get.token.spec");
const { createUnit } = require("../test/spec/units/create.unit.spec");


describe('Unit feature', () => {
    it('should create a new unit', async () => {
        const token = await getToken()
        const payload = {
            "name": "KG",
            "description": "weight measurement"
        }
        const response = await createUnit(payload,token)
        const unitId = await response.body.data.unitId;
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        jsonData.data.unitId = unitId;
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2))
        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal("Unit berhasil ditambahkan");
        console.log((await response).body);
        
    })
    it('should get a unit', async () => {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
        const unitId = jsonData.data.unitId
        const token = await getToken()
        const response = await request(config.baseUrlKA)
        .get(`/units/` + `${unitId}`)
        .set("Authorization", `Bearer ${token}`)
        expect((await response).status).to.equal(200);
        expect((await response).body.data.unit.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty")
        console.log((await response).body);
    })
})