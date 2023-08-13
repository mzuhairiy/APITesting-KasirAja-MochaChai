const config = require("../data/config.json");
const request = require("supertest");
const fs = require("fs");
const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/product.data.json' //menggunakan absolut path
const jsonPathCategory = 'D:/zuhair-sanbercode/js-automation/data/category.data.json'
const { expect } = require("chai");
const { getToken } = require("../test/spec/get.token.spec");
const { createProduct } = require("../test/spec/products/create.product.spec");
const { updateProduct } = require("../test/spec/products/update.product.spec");
const { afterEach, after } = require("mocha");

async function createCat(payload,token){
    const response = await request(config.baseUrlKA)
    .post('/categories')
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}
describe('Add category', () => {
    it('should create a new category first', async () => {
        const token = await getToken()
        const payload = 
        {
            "name": "Snack Ringan"
        }
        const response = await createCat(payload,token)
        // console.log((await response).body)
        const categoryId = await response.body.data.categoryId;
        const categoryName = await response.body.data.name;
        const jsonData = JSON.parse(fs.readFileSync(jsonPathCategory, 'utf8')); //read file JSON dari folder data
        jsonData.data.name = categoryName; //mengirim value categoryName ke dalam file JSON
        jsonData.data.categoryId = categoryId;
        fs.writeFileSync(jsonPathCategory, JSON.stringify(jsonData, null, 2))
        expect((await response).status).to.equal(201);
    })
})

describe('Products feature', () => {
    it('should create a new product', async () => {
        const token = await getToken()
        const jsonDataCategory = JSON.parse(fs.readFileSync(jsonPathCategory, 'utf8'));
        const payload = {
            "category_id": jsonDataCategory.data.categoryId, 
            "code": "A314ASDDFIER3432",
            "name": "Good Time Cookies",
            "price": "3500",
            "cost": "3000",
            "stock": "5"
        }
        const response = await createProduct(payload,token)
        // console.log((await response).body)
        const productId = await response.body.data.productId; //mengambil value dari unitId di response body
        const unitName = await response.body.data.name;
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); //read file JSON dari folder data
        jsonData.data.productId = productId; //mengirim value unitId ke dalam file JSON
        jsonData.data.name = unitName;
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2)) //menyimpan value unitId ke dalam file JSON

        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal("Product berhasil ditambahkan");
        // console.log((await response).body);
    })

    it('should get a product', async () => {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
        const productId = jsonData.data.productId 
        const token = await getToken()
        const response = await request(config.baseUrlKA)

        .get(`/products/` + `${productId}`)
        .set("Authorization", `Bearer ${token}`)
        expect((await response).status).to.equal(200);
        console.log((await response).body);
        expect((await response).body.data.product.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty")
        expect((await response).body.data.product.price).to.be.a('number')
        expect((await response).body.data.product.price).to.be.at.least(0, "Price should be a non-negative number")
        //console.log((await response).body);
    })

    it('should update a product', async() => {
        const token = await getToken()
        const jsonDataCategory = JSON.parse(fs.readFileSync(jsonPathCategory, 'utf8'));
        const payload = {
            "category_id": jsonDataCategory.data.categoryId, 
            "code": "A314ASDDFIER3432",
            "name": "Good Time Cookies",
            "price": "5000",
            "cost": "3000",
            "stock": "100"
        }
        const response = await updateProduct(payload,token)
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
        const name = await response.body.data.name; //mengambil value dari name di response body
        const price = await response.body.data.price;
        const stock = await response.body.data.stock;
        jsonData.data.name = name; //mengirim value name ke dalam file JSON
        jsonData.data.price = price;
        jsonData.data.stock = stock;
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2)) //menyimpan value name ke dalam file JSON

        expect((await response).status).to.equal(200);
        expect((await response).body.data.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty")
        //console.log((await response).body);

        await runGetProductTest();
    });

    async function runGetProductTest() {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
        const productId = jsonData.data.productId 
        const token = await getToken()
        const response = await request(config.baseUrlKA)

        .get(`/products/` + `${productId}`)
        .set("Authorization", `Bearer ${token}`)
        expect((await response).status).to.equal(200);
        console.log((await response).body);
    };

    it('should delete a product', async() => {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) //mengambil file JSON dari folder data
        const productId = jsonData.data.productId
        const token = await getToken()
        const response = await request(config.baseUrlKA)
        .del(`/products/` + `${productId}`)
        .set("Authorization", `Bearer ${token}`)
        expect((await response).status).equal(200);
        expect((await response).body.message).to.equal("Product berhasil dihapus");
        //console.log((await response).body)
    });
});