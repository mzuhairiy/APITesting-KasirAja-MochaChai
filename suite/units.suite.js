const config = require("../data/config.json");
const request = require("supertest");
const fs = require("fs");
const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/unit.data.json' //menggunakan absolut path
const { expect } = require("chai");
const { getToken } = require("../test/spec/get.token.spec");
const { createUnit } = require("../test/spec/units/create.unit.spec");
const { updateUnit } = require("../test/spec/units/update.unit.spec");


describe('Unit feature', () => {
    it('should create a new unit', async () => {
        const token = await getToken()
        const payload = {
            "name": "KG",
            "description": "weight measurement"
        }
        const response = await createUnit(payload,token)
        const unitId = await response.body.data.unitId; //mengambil value dari unitId di response body
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); //mengambil file JSON dari folder data
        jsonData.data.unitId = unitId; //menyimpan value unitId ke dalam file JSON
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2)) //menyimpan value unitId ke dalam file JSON
        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal("Unit berhasil ditambahkan");
        //console.log((await response).body);
    })
    it('should get a unit', async () => {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) //mengambil file JSON dari folder data
        const unitId = jsonData.data.unitId //mengambil value unitId dari file JSON
        const token = await getToken()
        const response = await request(config.baseUrlKA)
        .get(`/units/` + `${unitId}`)
        .set("Authorization", `Bearer ${token}`)
        expect((await response).status).to.equal(200);
        expect((await response).body.data.unit.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty")
        //console.log((await response).body);
    })
    it('should update the unit', async() => {
        const token = await getToken()
        const payload = {
            "name": "Kilos",
            "description": "satuan berat kilo"
        }
        const response = await updateUnit(payload,token)
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
        const name = await response.body.data.name; //mengambil value dari name di response body
        jsonData.data.name = name; //menyimpan value name ke dalam file JSON
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2)) //menyimpan value name ke dalam file JSON
        expect((await response).status).to.equal(200);
        //expect((await response).body.message).to.equal("Unit berhasil ditambahkan");
        console.log((await response).body);
    })
})