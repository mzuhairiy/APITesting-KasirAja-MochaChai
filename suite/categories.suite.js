const { expect } = require("chai");
const { getToken } = require("../test/spec/get.token.spec");
const { createCat } = require("../test/spec/categories/create.category");

describe('Create Category', () => {
    it('Success create a new category', async () => {
        const token = await getToken()
        const payload = {
            "name": "Makanan Berat",
            "description": "Nasi Padang Porsi 4kg"
        }
        const response = await createCat(payload,token)
        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal("Category berhasil ditambahkan");
    })
})