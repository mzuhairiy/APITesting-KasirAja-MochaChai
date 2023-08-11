const { expect } = require("chai");
const { getToken } = require("../test/spec/get.token.spec");
const { createUnit } = require("../test/spec/units/create.unit.spec");

describe('Create Unit', () => {
    it('Success create a new unit', async () => {
        const token = await getToken()
        const payload = {
            "name": "KG",
            "description": "weight measurement"
        }
        const response = await createUnit(payload,token)
        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal("Unit berhasil ditambahkan");
    })
})