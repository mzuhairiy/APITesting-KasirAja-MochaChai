const config = require("../data/config.json");
const request = require("supertest");
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
        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal("Unit berhasil ditambahkan");
        console.log((await response).body);
        
    })
    it('should get a unit', async () => { 
        const unitId = '6976f9b7-b866-423b-8de7-36f66a8aa3a4'
        const token = await getToken()
        const response = await request(config.baseUrlKA)
        .get(`/units/` + `${unitId}`)
        .set("Authorization", `Bearer ${token}`)
        expect((await response).status).to.equal(200);
        expect((await response).body.data.unit.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty")
        console.log((await response).body);
    })
})