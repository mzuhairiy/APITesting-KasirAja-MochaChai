const { expect } = require("chai");
const { getToken } = require("../test/spec/get.token.spec");
const { createUser } = require("../test/spec/create.user.spec");

describe('Create User', () => {
    it('Success create a new user', async () => {
        /* --Get Token-- */
        const token = await getToken()
        /* --Create User-- */
        const payload = {
            "name": "kasir-serbaguna",
            "email": "user@example.com",
            "password": "jiasda2321@"
        }
        const response = await createUser(payload,token)
        // console.log((await response));
        /* --Assertion-- */
        expect((await response).status).to.equal(201);
        expect((await response).body.message).to.equal("User berhasil ditambahkan");
        /* --Data Driven Testing-- */
        expect((await response).body.data.name).to.equal(payload.name); 
    })
})