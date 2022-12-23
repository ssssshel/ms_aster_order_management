import { DataTypes } from 'sequelize'
import { sequelize } from '../db/dbConnection'

export const ProductCategoryModel = sequelize.define(
  "product_categories", {
    id_product_category:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_category_name:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)