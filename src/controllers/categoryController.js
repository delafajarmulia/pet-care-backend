const express = require("express")
const { getCategoryByName, createCategory, getAllCategory, getCategoryById, deleteCategory, updateCategory } = require("../repository/categoryRepository")
const response = require("../response")
const authenticatedToken = require("../middleware/authenticatedToken")
const { isAdmin } = require("../middleware/checkedRole")
const { validationResult } = require("express-validator")
const { postCategoryValidation } = require("../validator/categoryValidation")

const router = express.Router()

router.get("/", authenticatedToken, async(req, res) => {
    const categories = await getAllCategory()
    
    // karena findmany, jadi yg dikembalikan berupa array kosong
    if(categories.length < 1){  
        return res.status(404).json({
            status:'not found',
            message:'category not available'
        })
    }
    return response(200, categories, "get all category", res)
})

router.get("/:id", authenticatedToken, async(req, res) => {
    const id = parseInt(req.params.id)
    if(typeof id !== 'number') return response(400, id, "id must be a number", res)

    const category = await getCategoryById(id)
    if(!category){
        return res.status(404).json({
            status:'not found',
            message:'category not available'
        })
    }
    return response(200, category, `get category by id ${id}`, res)
})

router.post("/", authenticatedToken, isAdmin, postCategoryValidation, async(req, res) => {
    try {
        const newCategory = req.body

        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                success: false,
                status: 'validation errors',
                errors: errorCheckValidation.array()
            })
        }
        // if(newCategory.name.trim().length === 0) response(400, newCategory, "some fields are missing", res)

        const categoryAvailabled = await getCategoryByName(newCategory.name)
        if(categoryAvailabled) return response(400, categoryAvailabled, "category name must be unique", res)

        const category = await createCategory(newCategory)
        response(200, category, "successfully add category", res)
    } catch (err) {
        response(400, err.message, 'internal server error', res)
    }
})

router.delete("/:id", authenticatedToken, isAdmin, async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(typeof id !== 'number') response(400, id, 'id must be a number', res)

        const category = await getCategoryById(id)
        if(!category) return response(404, id, `category with id ${id} not found`, res)

        await deleteCategory(id)
        response(200, 'ok', `successfully delete category with id ${id}`, res)
    } catch (e) {
        response(400, e.message, 'internal server error', res)
    }
})

router.put("/:id", authenticatedToken, isAdmin, postCategoryValidation, async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const updateCategoryData = req.body

        const errorCheckValidation = validationResult(req)
        if(!errorCheckValidation.isEmpty()){
            return res.status(422).json({
                success: false,
                message: 'error validation',
                errors: errorCheckValidation.array()
            })
        }

        const categoryAvailabled = await getCategoryById(id)
        if(!categoryAvailabled){
            return res.status(404).json({
                status:'not found',
                message: `cant find category with id ${id}`
            })
        }

        await updateCategory(id, updateCategoryData)
        response(200, updateCategoryData, `success update category with id ${id}`, res)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router