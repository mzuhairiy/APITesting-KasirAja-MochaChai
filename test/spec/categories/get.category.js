const request = require("supertest");
const config = require("../../../data/config.json");
const catData = require("../../../data/category.data.json");

async function getCatId(){
    const response = await request(config.baseUrlKA) 
    .post('/categories')
    .send(catData)
    .set("Authorization", `Bearer ${token}`)
    const categoryId = await response.body.data.categoryId
    return categoryId
}

module.exports = { categoryId } 