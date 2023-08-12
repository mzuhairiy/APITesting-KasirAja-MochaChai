const config = require("../data/config.json");
const request = require("supertest");
const fs = require("fs");
const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/category.data.json'
const { expect } = require("chai");
const { getToken } = require("../test/spec/get.token.spec");
const { createCat } = require("../test/spec/categories/create.category");

describe('Create Category', () => {
    it('should create a new category', async () => {
        const token = await getToken()
        const payload = {
            "name": "Makanan Berat",
            "description": "Nasi Padang Porsi 10kg"
        }
        const response = await createCat(payload,token)
        const categoryId = await response.body.data.categoryId; 
        const categoryName = await response.body.data.name;
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); 
        jsonData.data.categoryId = categoryId; 
        jsonData.data.name = categoryName;
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2))

        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal("Category berhasil ditambahkan");
        //console.log((await response).body);
    })
    it('should get a category', async () => {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
        const categoryId = jsonData.data.categoryId 
        const token = await getToken()
        const response = await request(config.baseUrlKA)

        .get(`/categories/` + `${categoryId}`)
        .set("Authorization", `Bearer ${token}`)
        expect((await response).status).to.equal(200);
        expect((await response).body.data.category.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty")
        //console.log((await response).body);

    })
})