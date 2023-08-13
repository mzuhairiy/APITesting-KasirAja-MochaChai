const config = require("../data/config.json");
const request = require("supertest");
const fs = require("fs");
const jsonPath = 'D:/zuhair-sanbercode/js-automation/data/user.data.json' //menggunakan absolut path
const { expect } = require("chai");
const { getToken } = require("../test/spec/get.token.spec");
const { createUser } = require("../test/spec/user/create.user.spec");
const { updateUser } = require("../test/spec/user/update.user.spec");

describe('User feature', () => {
    it('should create a new user', async () => {
        const token = await getToken() //get token
        const payload = {
            "name": "kisir-sirbigini",
            "email": "user@example.com",
            "password": "jiasda2321@"
        }
        const response = await createUser(payload,token)
        const userId = await response.body.data.userId; //mengambil value dari userId di response body
        const userName = await response.body.data.name;
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); //read file JSON dari folder data
        jsonData.data.userId = userId; //mengirim value userId ke dalam file JSON
        jsonData.data.name = userName;
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2)) //menyimpan value unitId ke dalam file JSON
        //console.log((await response).body);
        
        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal("User berhasil ditambahkan");
        /* --Data Driven Testing-- */
        expect((await response).body.data.name).to.equal(payload.name); 
    })

    it('should get a user', async () => {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) //mengambil file JSON dari folder data
        const userId = jsonData.data.userId //mengambil value userId dari file JSON
        const token = await getToken()
        const response = await request(config.baseUrlKA)

        .get(`/users/` + `${userId}`)
        .set("Authorization", `Bearer ${token}`)
        expect((await response).status).to.equal(200);
        expect((await response).body.data.user.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty")
        //console.log((await response).body);
    })

    it('should update a user', async() => {
        const token = await getToken()
        const payload = {
            "name": "kasir cabang 1",
            "email": "next@ex.com"
        }
        const response = await updateUser(payload,token)
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
        const userName = await response.body.data.name; //mengambil value dari name di response body
        jsonData.data.name = userName; //mengirim value name ke dalam file JSON
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2)) //menyimpan value name ke dalam file JSON

        expect((await response).status).to.equal(200);
        expect((await response).body.message).to.eql("User berhasil diupdate")
        expect((await response).body.data.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty")
        // console.log((await response).body);
    })

    it('should delete a user', async() => {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) //mengambil file JSON dari folder data
        const userId = jsonData.data.userId
        const token = await getToken()
        const response = await request(config.baseUrlKA)
        .del(`/users/` + `${userId}`)
        .set("Authorization", `Bearer ${token}`)
        expect((await response).status).equal(200);
        expect((await response).body).to.be.an('object');
        //console.log((await response).body)
    })
})