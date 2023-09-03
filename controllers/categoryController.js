const db = require('../models');
// image Upload

// create main Model
const Category = db.categorys;
const SubCategory = db.subCategorys;

// main work

// 1. create Category

const createCategory = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status ? req.body.status : false,
    };

    const category = await Category.create(info);
    res.status(200).send(category);
    console.log(category);
  } catch (error) {
    console.log(error);
  }
};

// 2. get all Category
const getAllCategory = async (req, res) => {
  try {
    let categorys = await Category.findAll({
      include: [
        {
          model: SubCategory,
          as: 'subCategories',
        },
      ],
    });
    res.status(200).send(categorys);
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    let category = await Category.findOne({
      where: { id: req.params.categoryID },
    });
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    let category = await Category.update(req.body, {
      where: { id: req.params.categoryID },
    });
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
  }
};

// 7. connect one to many relation

const getCategoryWithSubCategory = async (req, res) => {
  const data = await Category.findOne({
    include: [
      {
        model: SubCategory,
        as: 'subCategories',
      },
    ],
    where: { id: req.params.categoryID },
  });

  res.status(200).send(data);
};

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategory,
  updateCategory,
  getCategoryWithSubCategory,
};
