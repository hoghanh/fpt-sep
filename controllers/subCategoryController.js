const db = require("../models");
// image Upload

// create main Model
const SubCategory = db.subCategorys;
const Category = db.categorys;
// main work

// 1. create SubCategory

const createSubCategory = async (req, res) => {
   try {
      let info = {
         name: req.body.name,
         description: req.body.description,
         category_id: req.body.category_id ? req.body.category_id : null,
         status: req.body.status ? req.body.status : false,
      };

      const subCategory = await SubCategory.create(info);
      res.status(200).send(subCategory);
      console.log(subCategory);
   } catch (error) {
      console.log(error);
   }
};

// 2. get all SubCategory
const getAllSubCategory = async (req, res) => {
   try {
      let subCategorys = await SubCategory.findAll({});
      res.status(200).send(subCategorys);
   } catch (error) {
      console.log(error);
   }
};

const getSubCategoryById = async (req, res) => {
   try {
      let subCategory = await SubCategory.findOne({
         where: { id: req.params.subCategoryID },
      });
      res.status(200).send(subCategory);
   } catch (error) {
      console.log(error);
   }
};

const updateSubCategory = async (req, res) => {
   try {
      let subCategory = await SubCategory.update(req.body, {
         where: { id: req.params.subCategoryID },
      });
      res.status(200).send(subCategory);
   } catch (error) {
      console.log(error);
   }
};

const getSubCategoryWithCategory = async (req, res) => {
   const data = await SubCategory.findOne({
      include: [
         {
            model: Category,
            as: "categorys",
         },
      ],
      where: { id: req.params.subCategoryID },
   });

   res.status(200).send(data);
};

module.exports = {
   createSubCategory,
   getSubCategoryById,
   getAllSubCategory,
   updateSubCategory,
   getSubCategoryWithCategory,
};
