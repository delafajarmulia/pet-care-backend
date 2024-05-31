const express = require("express")
const { getCategoryByName, createCategory, getAllCategory, getCategoryById, deleteCategory } = require("../repository/category")
const response = require("../response")

const router = express.Router()

router.get("/", async(req, res) => {
    const categories = await getAllCategory()

    response(200, categories, "get all category", res)
})

router.get("/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    if(typeof id !== 'number') response(400, id, "id must be a number", res)

    const category = await getCategoryById(id)
    response(200, category, `get category by id ${id}`, res)
})

router.post("/", async(req, res) => {
    try {
        const newCategory = req.body

        if(newCategory.name.trim().length === 0) response(400, newCategory, "some fields are missing", res)

        const categoryAvailabled = await getCategoryByName(newCategory.name)
        if(categoryAvailabled.length > 1) response(400, categoryAvailabled, "category name must be unique", res)

        const category = await createCategory(newCategory)
        response(200, category, "successfully add category", res)
    } catch (err) {
        response(400, err.message, 'internal server error', res)
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(typeof id !== 'number') response(400, id, 'id must be a number', res)

        const category = await getCategoryById(id)
        if(category.length < 1) response(404, id, `category with id ${id} not found`, res)

        await deleteCategory(id)
        response(200, 'ok', `successfully delete category with id ${id}`, res)
    } catch (e) {
        response(400, e.message, 'internal server error', res)
    }
})

module.exports = router