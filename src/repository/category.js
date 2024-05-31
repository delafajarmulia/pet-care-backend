const prisma = require("../db/index")

const getAllCategory = async() => {
    const categories = await prisma.category.findMany({
        include:{
            pets: true,
        },
    })
    return categories
}

const getCategoryById = async(id) => {
    const category = await prisma.category.findFirst({
        where:{
            id: id,
        },
        include:{
            pets: true,
        },
    })
    return category
}

const getCategoryByName = async(name) => {
    const categories = await prisma.category.findMany({
        where:{
            name:name,
        },
    })
    return categories
}

const createCategory = async(newCategory) => {
    const category = await prisma.category.create({
        data:{
            name:newCategory.name,
        }
    })
    return category
}

const deleteCategory = async(id) => {
    const category = await prisma.category.delete({
        where:{
            id: id
        }
    })
    return 
}

const updateCategory = async(id, categoryData) => {
    const category = await prisma.category.update({
        where:{
            id: id
        },
        data:{
            name: categoryData.name,
        },
    })
    return category
}

module.exports = {
    getAllCategory, 
    getCategoryById,
    getCategoryByName,
    createCategory,
    deleteCategory,
    updateCategory
}